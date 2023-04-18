const mongoose = require('mongoose');

const blog = new mongoose.Schema({

  image: {
    type: String,
    default: null
  },
  heading: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  createdAt:{type: Number, default: new Date()},
  isDeleted:{type: Boolean, default: false},
  // button read more
})


module.exports = mongoose.model('Blog',blog);

