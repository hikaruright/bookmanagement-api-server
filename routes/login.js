var express= require("express")

var db = require("../logic/dbmanager")

var router = express.Router()

router.post("/", (req, res) => {
    
    console.log("login.start");

    let id = req.body.userid
    let passwd = req.body.passwd

    // 検索処理を行う。
    db.userDb.find({
        id: id,
        password: passwd
    }).exec((err, docs) => {
        console.log(docs);
        if(!!err || (docs || []).length == 0) {
            res.send({
                "message": "ログインに失敗しました。"
            });
            return;
        }

        res.send({
            token: docs[0]._id
        });
    })
})

module.exports = router;