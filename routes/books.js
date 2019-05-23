var express = require("express")
var router = express.Router()

var db = require("../logic/dbmanager")

var auth = require("../logic/auth")

/**
 * 全権の書籍一覧を取得。
 */
router.get("/", (req, res, next) => {

    auth(req, res, () => {
        // 検索処理
        db.bookDb.find({}).sort({inserted:-1}).exec((err, docs) => {
            
            let ret = [];

            docs.forEach((val, idx) => {
                ret.push({
                    id: val._id,
                    title: val.title,
                    author: val.author,
                    publisher: val.publisherName
                });
            });

            res.send(ret);
        });
    });
});

/**
 * 書籍情報の検索
 */
router.post("/", (req, res, next) => {
    // 検索処理
    auth(req, res, (user) => {
        let title = req.body.title;
        let author = req.body.author;
        let publisher = req.body.publisher;
        let depFlag = req.body.depFlag;

        console.log(depFlag);
    
        var condition = {};
    
        if(!!title) {
            condition["title"] = new RegExp(title, 'i');
        }
        if(!!author) {
            condition["author"] = new RegExp(author, 'i');
        }
        if(!!publisher) {
            condition["publisherName"] = new RegExp(publisher, 'i');
        }
        if(depFlag) {
            condition["managedDpt"] = new RegExp(user.department, 'i');
        }
    
        db.bookDb.find(condition).sort({inserted: -1}).exec((err, docs) => {
            let ret = [];
    
            docs.forEach((val, idx) => {
                ret.push({
                    id: val._id,
                    title: val.title,
                    author: val.author,
                    publisher: val.publisherName
                });
            });
    
            res.send(ret);
        });
    })
});

module.exports = router;