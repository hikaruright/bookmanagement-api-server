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
        var id = req.params.id || req.body.id;

        console.log("register started.");

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

        var updator = (!id) ? user.fullname : req.body.updator;
        // user data
//        console.log(user.fullname);
//        console.log(user.department);

        db.publisherDb.find({id: publisher}).exec(
            (err, pub) => {
                db.dptDb.find({id: user.dpt}).exec(
                    (err2, dpt) => {
                        console.log(dpt);

                        let dt = new Date();
                
                        var nowStr = dt.getFullYear()
                            + "/" + ("00"+(dt.getMonth()+1)).slice(-2)
                            + "/" + ("00"+dt.getDate()).slice(-2);
                
                        if(!id) {
                            console.log("insert.start.");
                            db.bookDb.insert({
                                title: title,
                                author: author,
                                publisher: publisher,
                                publisherName: pub.label,
                                purchased: purchased,
                                price: price,
                                updator: updator,
                                updatorDpt: dpt.id,
                                updaterDptName: dpt.label,
                                updated: nowStr,
                                updatedTime: dt.getTime()
                            }, (err, doc) => {
                                console.log("result....");
                                res.send({
                                    result:true,
                                    id: doc._id
                                });
                            });
                            console.log("flag2");
                        }else{

                            console.log("update start.");
                            db.bookDb.update({_id:id},{
                                title: title,
                                author: author,
                                publisher: publisher,
                                publisherName: pub.label,
                                purchased: purchased,
                                price: price,
                                updator: updator,
                                updatorDpt: dpt.id,
                                updaterDptName: dpt.label,
                                updated: nowStr,
                                updatedTime: dt.getTime()
                            },{}, (err, num, upserted) => {
                                if(!err) {
                                    res.send({
                                        result: true,
                                        id: id
                                    });
                                }
                            })

                        }
                    }
                );
            }
        );
    })
    
});

module.exports = router;