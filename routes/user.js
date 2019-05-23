var express = require('express')
var router = express.Router();

var manager = require('../logic/dbmanager')
let db = manager.userDb;

// get user info.
router.get("/:id", (req, res, next) => {

    var target = req.params.id;

    db.findOne({id: target}).exec((err, doc) => {

        if (!!err || !doc) {
            res.status(404).send({
                message: "user is not found."
            });
        } else {
            res.send(doc);
        }
    });
});

// Add or edit user info.
router.post("/", (req, res) => {

    let id = req.params.id || req.body.id;

    let password = req.body.password;
    let fullname = req.body.fullname;
    let department = req.body.department;

    console.log(req.body);
    let obj = req.body

    console.log(obj.fullname);

    db.findOne({id: id}).exec((err, doc) => {
        if (!!err) {
            console.error(err);
            res.status(500).send({
                message: 'encaught error.'
            })
        } else if (!!doc) {
            // 更新
            db.update({_id: doc._id}, obj, {}, (err, num) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({message: "unhandled error."});
                } else if (!num) {
                    res.status(409).send({message: "no data updated."});
                } else {
                    res.send({id: doc._id});
                }
            })
        } else {
            // 新規
            db.insert(obj, (err, doc) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                } else if (!doc) {
                    res.status(409).send({message: "no data inserted."});
                } else {
                    res.send({id: doc._id});
                }
            })
        }
    })

});

// Delete User info
router.delete("/:id", (req, res) => {
    // 対象ID
    let id = req.params.id || req.body.id;

    db.delete({id: id}, (err, num) => {
        if (!!err) {
            res.status(500).send(err);
        } else if (!num) {
            res.status(409).send({message: "no data updated."});
        } else {
            res.send({id: id});
        }
    });
})

module.exports = router;