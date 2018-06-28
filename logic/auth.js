var express = require("express");
var db = require("./dbmanager")


module.exports = async function(req, res, resolve, reject) {


    console.log(req.headers["x-access-token"]);
    
    var token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token) {
        res.status(403).send({
            "message": "There is no token. you need login at first."
        });
        if(!!reject) reject();
        return;
    }
    console.log(token);

    // 検索
    var user = await db.userDb.findOne({"_id": token}).exec((err, user) => {
        console.log("loaded>>>" + user);
        if(!user) {
            res.status(403).send({
                "message": "There is invalidated token."
            });
            if(!!reject) reject();
            return;

        }else {
            resolve(user);
        }
    });
}
