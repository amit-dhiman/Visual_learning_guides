const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
  // category: {type: String, default: null},
  // categoryDesc: {type: String, default: null}, 
  image: {type: String, default: null},
  heading:{type: String, default: null},
  description:{type: String, default: null},
  points: {type: String, default: null},
  createdAt:{type: String, default: +new Date()},
  isDeleted: {type: Boolean, default: false},
  
  // button Browse Guides
})



module.exports = mongoose.model('Category', Category);
