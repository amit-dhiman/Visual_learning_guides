const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsVisual = new Schema({
  blogsId: {type: Schema.Types.ObjectId},
  image: {type: String, default: null},
  heading:{type: String, default: null},
  description:{type: String, default: null},

  createdAt:{type: String, default: +new Date()},
  isDeleted: {type: Boolean, default: false},

  // Get it Now
})



module.exports = mongoose.model('BlogsVisual', blogsVisual);
