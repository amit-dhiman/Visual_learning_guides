const mongoose= require('mongoose');

const Front =  new mongoose.Schema({
  heading: {type: String, default: null},
  description: {type: String, default: null},
  image:{
    type: String,
  },
  createdAt:{type: Number, default: new Date()},
  isDeleted: {type: Boolean, default: false},
  // button
})

module.exports = mongoose.model('Front',Front)

