const mongoose = require('mongoose');

const review = new mongoose.Schema({
  star:{
    type: Number, 
    default:1
  },
  review:{
    type: String, 
    default:null
  },
  name:{
    type: String, 
    default:null
  },
  universityName:{
    type: String, 
    default:null
  },
  createdAt:{type: Number, default: new Date()},
  isDeleted: {type: Boolean, defaault: false},
  
});

module.exports = mongoose.model('Review',review);


