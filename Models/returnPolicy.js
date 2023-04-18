const mongoose = require('mongoose');

const ReturnPolicy = new mongoose.Schema({

  returnPolicy: {
    type: String,
    default: null
  },
  createdAt:{
    type: Number,
    default: new Date(),
  },
  isDeleted:{type: Boolean, default: false},
  
})


module.exports = mongoose.model('ReturnPolicy',ReturnPolicy);

