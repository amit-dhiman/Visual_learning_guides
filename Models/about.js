const mongoose = require('mongoose');
const aboutUs = new mongoose.Schema({

  question: {
    type: String,
    default: null
  },
  answer: {
    type: String,
    default: null
  },
  createdAt:{
    type: Number,
    default: new Date(),
  },
  isDeleted:{type: Boolean, default: false},
  
})


module.exports = mongoose.model('Aboutus',aboutUs);

