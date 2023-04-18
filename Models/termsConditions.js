const mongoose = require('mongoose');

const termsConditions = new mongoose.Schema({
  termsConditions: {
    type: String,
    default: null
  },
  createdAt:{
    type: Number,
    default: new Date(),
  },
  isDeleted:{type: Boolean, default: false},
  
})


module.exports = mongoose.model('TermsConditions',termsConditions);

