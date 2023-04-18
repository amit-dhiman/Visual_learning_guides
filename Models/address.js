const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact = new Schema({
  address: {type: String, default: null},
  number: {type: Number, default: null},
  email: {type: String, default: null},
  createdAt: {type: Number, default: new Date()},
  isDeleted: {type: Boolean, default: false},

})

module.exports = mongoose.model('Address', contact);

