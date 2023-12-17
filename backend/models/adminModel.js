const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {type:String,require: true},
  password:{type:String,required:true},
});

module.exports = mongoose.model('admin', adminSchema);