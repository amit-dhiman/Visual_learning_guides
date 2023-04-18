const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact = new Schema({
  facebookIcon: {type: String, default: null},
  instagram: {type: String, default: null},
  wahtsApp: {type: String, default: false},
  linkedIn: {type: String, default: new Date()},
  twitter: {type: String, default: null},
  createdAt: {type: Number, default: new Date()},
  isDeleted: {type: Boolean, default: false},
})

module.exports = mongoose.model('SocialMedia', contact);

