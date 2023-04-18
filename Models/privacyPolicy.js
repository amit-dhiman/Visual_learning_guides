const mongoose = require('mongoose');

const privacyPolicy = new mongoose.Schema({

  privacyPolicy: {
    type: String,
    default: null
  },
  createdAt:{
    type: Number,
    default: new Date(),
  },
  isDeleted:{type: Boolean, default: false},
  
})


module.exports = mongoose.model('PrivacyPolicy',privacyPolicy);

