# chatroom
毕设作品，一个node端的聊天室(如果聊天室名称有涉及到重名，实属无心之举，请告知)

ejs模板渲染，mongodb存储用户基本信息，socket.io通信模块

### 目前功能
- 登录
- 注册
- 图文消息
- 消息删除、撤销
- 留言

### 还处于功能不断中......
- 2017.4.21 添加图片弹出层，点击图片弹出图片浮层
- 2017.4.24 用户注册添加上传头像（方法有点菜，想通过调接口使用返回的图片链接方式显示，没成，图片服务器已经完好）
- 2017.4.25 增加用户添加好友功能，成为好友的会显示在侧边栏，点击会进入对应的留言页。
并修改在线用户位置

### 2017.4.29学习nginx借此试水  (http://localhost:8989/upload_example（示例页）)，
	水水的博客链接（nginx 配置文件）http://blog.csdn.net/konglei1996/article/details/70983869
### 使用
 clone后，npm install装包，npm start启动项目（需要本地启动好数据库哦!）

### 预览一下
 ![注册](https://github.com/dannisi/chatroom/blob/fe-1.0-2/screenshots/register.png)

 ![聊天室](https://github.com/dannisi/chatroom/blob/fe-1.0/screenshots/chat.png)

 ![加好友](https://github.com/dannisi/chatroom/blob/fe-1.0-2/screenshots/add.png)

