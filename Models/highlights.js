const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Highlights = new Schema({
  heading:{type: String, default: null},
  description:{type: String, default: null},
  createdAt:{type: Number, default: new Date()},
  isDeleted: {type: Boolean, default: false},

});



module.exports = mongoose.model('Highlights', Highlights);
