const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisualTopic = new Schema({
  image: {type: String, default: null},
  heading:{type: String, default: null},
  description:{type: String, default: null},
  price: {type: String, default: 0},
  discountPrice: {type: String, default: 0},
  categoryId: {type: Schema.Types.ObjectId},

  createdAt:{type: String, default: +new Date()},
  isDeleted: {type: Boolean, default: false},

  // Get it Now
})



module.exports = mongoose.model('VisualTopic', VisualTopic);
