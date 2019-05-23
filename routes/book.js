var express = require("express");
var router = express.Router();

var auth = require("../logic/auth");

const {check, validationResult} = require("express-validator/check");
const {matchedData, sanitize} = require("express-validator/filter");

var db = require("../logic/dbmanager");

router.get("/:id", (req, res) => {

    // 処理対象
    var target = req.params.id;
    console.log(target);

    db.bookDb.findOne({_id: target}).exec((err, doc) => {
        console.log(doc);
        if(doc==null) {
            // データなし。
            res.send({
                "message": "該当のデータがありません。"
            });
            return;
        }

        //1行目のデータを返却
        res.send(doc);

    });
})

router.post("/",[
    // Validators.
    check("title", "タイトルを入力してください。")
        .isLength({min:1}),
    check("title", "タイトルは20文字以内で入力してください。")
        .isLength({max:20}),
    check("author", "著者を入力してください。")
        .isLength({min:1}),
    check("author", "著者は1~20文字で入力してください。")
        .isLength({max:20}),
    check("purchased", "購入日を入力してください。")
        .isLength({min:1}),
    check("purchased", "購入日はyyyy/MM/ddの形式で入力してください。")
        .isLength({max:10})
        .matches(/^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/)
], (req, res) => {

    auth(req, res, (user) => {
        // 対象ID
        let id = req.params.id || req.body.id;

        console.log("register started. > "+id);

        console.log("---- Request ----");
        console.log(req.body);

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(422).send({
                result: false,
                validated: errors.mapped()
            })
        }

        // Loading data
        var title = req.body.title;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var price = req.body.price;
        var purchased = req.body.purchased;
        var managedDpt = req.body.managedDpt;

        var updator = (!id) ? user.fullname : req.body.updator;
        // user data
//        console.log(user.fullname);
//        console.log(user.department);

        db.publisherDb.findOne({id: publisher}).exec(
            (err, pub) => {
                console.log("pub>>"+pub);
                db.dptDb.findOne({id: user.department}).exec(
                    (err2, dpt) => {
                        db.dptDb.findOne({id: managedDpt}).exec((err3, mDpt) => {
                            console.log(dpt);

                            let dt = new Date();
                    
                            var nowStr = dt.getFullYear()
                                + "/" + ("00"+(dt.getMonth()+1)).slice(-2)
                                + "/" + ("00"+dt.getDate()).slice(-2);
                            
                            let obj = {
                                title: title,
                                author: author,
                                publisher: publisher,
                                publisherName: pub.label,
                                purchased: purchased,
                                price: price,
                                managedDpt: mDpt.id,
                                managedDptName: mDpt.label,
                                updator: updator,
                                updatorDpt: dpt.id,
                                updaterDptName: dpt.label,
                                updated: nowStr,
                                updatedTime: dt.getTime()
                            };
                            console.log("---- Registering ----");
                            console.log(obj);

                            if(!id) {
                                console.log("insert.start.");
                                db.bookDb.insert(obj, (err, doc) => {
                                    console.log("result....");
                                    res.send({
                                        result:true,
                                        id: doc._id
                                    });
                                });
                                console.log("flag2");
                            }else{
    
                                console.log("update start.");
                                db.bookDb.update(
                                    {_id:id},
                                    obj,
                                    {}, (err, num, upserted) => {
                                    if(!err) {
                                        res.send({
                                            result: true,
                                            id: id
                                        });
                                    }
                                })
    
                            }
                        })
                    }
                );
            }
        );
    })
    
});

// Delete
router.delete("/:id", (req, res) => {
    // 対象ID
    let id = req.params.id || req.body.id;

    console.log('delete start to ' + id);

    db.bookDb.remove({_id: id}, (err, numRemoved) => {
        if (!!err) {
            console.error(err);

            res.status(422).send({
                message: 'unexpected error has occoured.'
            });
        } else if (!numRemoved) {
            res.status(422).send({
                message: 'there is no data id of ' + id + ' .'
            });
        } else {
            res.send({
                id: id
            });
        }
    });
});

module.exports = router;