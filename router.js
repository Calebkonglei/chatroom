//  hat模块生成不重复ID
const hat = require('hat');
const rack = hat.rack();
const url = require("url");
const queryString  = require("querystring");
const Note = require('./model/leaveMessage');
const User = require('./model/user');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const file_ctrl = require('./controller/file_control');
var flag = false;
module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.render('index',{alerttext : ""})
  });
  
  app.get('/message', function(req, res, next) {
     var queryUrl = url.parse(req.url).query;
      var vistorname =  queryString.parse(queryUrl).vistorname || '';
      var username = queryString.parse(queryUrl).username || '';
      if(vistorname != '' && vistorname != null){
        flag = true;
      };
      Note.find({
          "vistorname" : vistorname
      },function(err,docs){
          var newname = vistorname;
          if(vistorname.length>3){
             newname = vistorname.slice(0,3)+ '...';
          }
          res.render('message', {
            vistorname: vistorname,
            showname:newname,
            username: username,
            message:docs
          })        
      })
  })
//  用户登录
app.get('/login',function(req,res){
  let queryUrl = url.parse(req.url).query;
  let {username, password} = queryString.parse(queryUrl);

  User.find({
    "username" : username
  },function(err,docs){
    if(docs==''||docs==null){
      console.log("用户名不存在!")
      res.json({code: 10001, message:'用户名不存在'})
    }else {
      if(docs[0].password == password){
      res.json({code: 200, data: docs[0]})
      }else {
        console.log("密码错误!")
        res.json({code:10001, message:'密码错误!'})
      }
    }
  })
});
//  注册用户
app.post('/api/inputdata',function(req,res){
  let param = {username, password, avatar} = req.body;
  User.find({
    "username" : username
  },function(err,docs){
    if(docs==''||docs==null){
      var UID = rack()
      User.create({
        "username" : username,
        "password" : password,
        "avatar": avatar,
        "UID" : UID
      })
      res.json({code:'200', message:'register success'})
    } else {
      console.log("用户名已存在", docs)
      res.json({code: '10001', message:'用户名已存在'})
    }
  })
});

app.get('/chatroom', function(req, res, next) {
  var queryUrl = url.parse(req.url).query;
  var username = '', avatar = '';
  var username =  queryString.parse(queryUrl).username;
  if(username != '' && username != null){
    flag = true;
  };
  User.find({
      "username" : username
  },function(err,docs){
    if(docs == '' || docs == null) {
      flag = false
    } 
   else { 
      if(docs[0].avatar == ''){
        docs[0].avatar = 'http://localhost:8080/img_line/kkk.jpg';
      }

      [username, avatar] = [docs[0].username, docs[0].avatar] 
    }
  })
  setTimeout(function(){
    if(flag){
    res.render('chatroom',{ username : username, avatar: avatar })
  }
  else {res.redirect('error')}
  },200)
});

//保存留言信息
app.post('/api/savenote', (req, res, next) => {
  let msg = { username, vistorname, note } = req.body;
  User.find({ 'username': msg.username})
  .exec()
  .then((doc) => {
    if(doc.length !== 0){
      Note.create(msg);
      res.json({code: 200, message: msg});
    } else{
      res.json({code: 10001, message: '不存在该用户'})
    }
  })
});

//获取留言
app.get('/api/getleavemsg', (req, res, next) => {
  var queryUrl = url.parse(req.url).query;
  var vistorname = queryString.parse(queryUrl).vistorname || '';
  Note.find({'vistorname': vistorname})
    .exec()
    .then((doc) => {
      if(doc.length == 0){
        res.json({code: '10001', msg: '还未有人给你留言哦'})
      } else{
        res.render('message', {message:doc});
      }
    })
});

//头像上传

app.post('/api/upload',  file_ctrl.upload);


// app.post('/api/upload',  function(req, res){
//   console.log(res)
// });

}