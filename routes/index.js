var express = require('express');
var router = express.Router();

var manager = require("../logic/dbmanager")
let db = manager.userDb;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/create", (req, res, next) => {

  // create user if needed.
  db.find({id: "sample"}, (err, docs) => {
    console.log(docs);
    if((docs || []).length == 0) {
      console.log("insert.......")
      db.insert({
        id: "sample",
        password: "password",
        fullname: "佐藤太郎",
        department: "1001"
      }, (err) => {
        console.log("insert completed.");
        db.find({}, (err, docs) => {
          res.send(docs);
        });
      });    
    }else {
      console.log("Found");
      res.send(docs);
      return;
    }
  })

  console.log("flag1")

  // create publisher if needed.
  manager.publisherDb.find({}, (err, docs) => {
    if((docs || []).length == 0) {
      manager.publisherDb.insert([{
        id: "101",
        label: "第一出版",
        fullname: "第一出版株式会社"
      },{
        id: "102",
        label: "デルタ社",
        fullname: "デルタ社"
      },{
        id: "103",
        label: "HFクリエイティブ",
        fullname: "ハードフラットクリエイティブ"
      },{
        id: "104",
        label: "MARUYAMA",
        fullname: "MARUYAMA出版"
      },{
        id: "105",
        label: "遅咲書房",
        fullname: "遅咲書房"
      },])
    }
  });

  console.log("flag2")


  // create department if needed.
  manager.dptDb.find({}, (err, docs) => {
    if((docs || []).length == 0) {
      manager.dptDb.insert([
        {
          id:"1001",
          label: "A部署"
        },
        {
          id:"1002",
          label: "B部署"
        },
        {
          id:"1003",
          label: "C部署"
        }
      ])
    }
  })

});

module.exports = router;
