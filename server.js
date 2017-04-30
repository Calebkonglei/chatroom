var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var dbConnection = 'mongodb://localhost/user';
mongoose.connect(dbConnection);
var port = process.env.PORT || 8080;
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
global.config = require('./config');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
require('./router')(app);
app.use('/register', function (req, res, next) {
    res.render('register', {alerttext: ''})
});

server.listen(config.port, function () {
    console.log(`Express
    server
    listening
    on
    port
    ${config.port}
    `)
    ;
});

var online_people = {
    number: 0,
    people: [],
    avatar: []
};

var timeoutFlag = {};

io.sockets.on('connection', function (socket) {
    var message = ''
    var name = ''
    //监听用户发布聊天内容
    socket.on('message', function (obj) {
        //向所有客户端广播发布的消息
        io.emit('message', obj)
        console.log(obj.username + '说：' + obj.message)
    })
    //  添加新用户并发布出去
    socket.on('update', function (obj) {
        if (!online_people.people.some(function (item, index, array) {
                return online_people.people[index] == obj.username
            })
        ) {
            name = obj.username;
            online_people.people.push(obj.username);
            online_people.avatar.push(obj.avatar);
            online_people.number += 1
        }
        io.emit('update', online_people)
        console.log('总人数为:' + online_people.number + '     人员名单为' + online_people.people)
    })

    //消息撤回
    socket.on('reset', function (obj) {
        io.emit('reset', obj);
        console.log(obj.username + '撤回了一条消息:' + obj.message)
    })

    //添加好友请求
    socket.on('addFriend', function (obj) {
        console.log(obj.username + '请求添加', obj.friend + '好友')
        io.emit('addFriend', obj);
    })
    //同意好友

    socket.on('receive', function (obj) {
        console.log(obj.username + '同意添加', obj.friend + '为好友')
        io.emit('receive', obj)
    });

    //拒绝
    socket.on('reject', function (obj) {
        io.emit('reject', obj);
    })

    // 接收图片
    socket.on('img', function (obj) {
        console.log(obj.username + '发送了一张图片:')
        socket.broadcast.emit('img', obj)
    })

    // 用户退出聊天室时
    socket.on('disconnect', function () {
        if (online_people.people.some(function (item, index, array) {
                return online_people.people[index] == name
            })
        ) {
            online_people.number = online_people.number - 1
            var index = online_people.people.indexOf(name)
            online_people.people.splice(index, 1)

            console.log(name + "退出了聊天室")

            io.emit('update', online_people)
        }
    });
});