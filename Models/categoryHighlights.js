const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Highlights = new Schema({
  heading: {type: String, default: null},
  heading: {type: String, default: null},
  description: {type: Schema.Types.ObjectId},

  createdAt: {type: String, default: +new Date()},
  isDeleted: {type: Boolean, default: false},

})


module.exports = mongoose.model('CategoryHighlights', Highlights);
