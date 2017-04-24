var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  UID: String,
  username: String,
  password: String,
  avatar: {type: String, default: 'http://localhost:8080/img_line/kkk.jpg'}
})

module.exports = mongoose.model('User', UserSchema);