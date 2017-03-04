var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  username: String,
  vistorname: String,
  note: String,
  createTime: {type:Date, default: Date.now}
})

module.exports = mongoose.model('Note', NoteSchema);