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
      db.insert([{
        id: "sample",
        password: "password",
        fullname: "佐藤太郎",
        department: "1001"
      },{
        id: "user1",
        password: "password",
        fullname: "ユーザ1",
        department: "1001"
      },{
        id: "user2",
        password: "password",
        fullname: "ユーザ2",
        department: "1002"
      },{
        id: "user3",
        password: "password",
        fullname: "ユーザ3",
        department: "1003"
      },{
        id: "user4",
        password: "password",
        fullname: "ユーザ4",
        department: "1004"
      },{
        id: "user5",
        password: "password",
        fullname: "ユーザ5",
        department: "1005"
      },{
        id: "user6",
        password: "password",
        fullname: "ユーザ6",
        department: "1006"
      },{
        id: "user7",
        password: "password",
        fullname: "ユーザ7",
        department: "1007"
      },{
        id: "user8",
        password: "password",
        fullname: "ユーザ8",
        department: "1008"
      },{
        id: "user9",
        password: "password",
        fullname: "ユーザ１",
        department: "1009"
      },{
        id: "user10",
        password: "password",
        fullname: "ユーザ10",
        department: "1010"
      },{
        id: "user11",
        password: "password",
        fullname: "ユーザ11",
        department: "1011"
      },{
        id: "user12",
        password: "password",
        fullname: "ユーザ12",
        department: "1012"
      },{
        id: "user13",
        password: "password",
        fullname: "ユーザ13",
        department: "1013"
      },{
        id: "user14",
        password: "password",
        fullname: "ユーザ14",
        department: "1014"
      },{
        id: "user15",
        password: "password",
        fullname: "ユーザ15",
        department: "1015"
      },{
        id: "user16",
        password: "password",
        fullname: "ユーザ16",
        department: "1016"
      },{
        id: "user17",
        password: "password",
        fullname: "ユーザ17",
        department: "1017"
      },{
        id: "user18",
        password: "password",
        fullname: "ユーザ18",
        department: "1018"
      },{
        id: "user19",
        password: "password",
        fullname: "ユーザ19",
        department: "1019"
      },{
        id: "user20",
        password: "password",
        fullname: "ユーザ20",
        department: "1020"
      }], (err) => {
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
        },
        {
          id:"1004",
          label: "D部署"
        },
        {
          id:"1005",
          label: "E部署"
        },
        {
          id:"1006",
          label: "F部署"
        },
        {
          id:"1007",
          label: "G部署"
        },
        {
          id:"1008",
          label: "H部署"
        },
        {
          id:"1009",
          label: "I部署"
        },
        {
          id:"1010",
          label: "J部署"
        },
        {
          id:"1011",
          label: "K部署"
        },
        {
          id:"1012",
          label: "L部署"
        },
        {
          id:"1013",
          label: "M部署"
        },
        {
          id:"1014",
          label: "N部署"
        },
        {
          id:"1015",
          label: "O部署"
        },
        {
          id:"1016",
          label: "P部署"
        },
        {
          id:"1017",
          label: "Q部署"
        },
        {
          id:"1018",
          label: "R部署"
        },
        {
          id:"1019",
          label: "S部署"
        },
        {
          id:"1020",
          label: "T部署"
        }
      ])
    }
  })

});

module.exports = router;
