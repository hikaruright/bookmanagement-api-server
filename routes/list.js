var express = require("express")
var router = express.Router();

var DbManager = require("../logic/dbmanager")
let manager = DbManager

var auth = require("../logic/auth")

router.get("/publisher", (req, res) => {

    auth(req, res, (user) => {
        console.log("Login is ok,");
        manager.publisherDb.find({}).sort({id: 1}).exec((err, docs) => {
            console.log("Fineded");
            if(!!err) {
                res.send({
                    result: false,
                    message: "Database error has occoured."
                });
                return;
            }
    
            return res.send(docs);
        });
        console.log("flag1");
    }).catch(()=>{/*何もしない*/});

    //res.send({});
});

router.get("/department", (req, res) => {

    auth(req, res, () => {
        manager.dptDb.find({}).sort({id: 1}).exec((err, docs) => {
            if(!!err) {
                res.send({
                    result: false,
                    message: "Database error has occured."
                });
                return;
            }
    
            res.send(docs);
        });
    }).catch(()=>{/*何もしない*/});
});

module.exports = router;