const mongoose = require('mongoose');

const KeywordSchema = new mongoose.Schema({
    keyword: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports= mongoose.model('Keyword', KeywordSchema);



