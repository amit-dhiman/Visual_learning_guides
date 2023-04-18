const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact = new Schema({
        fullName: {type: String, default: null},
        email: {type: String, default: null},
        message:{type: String, default: null},
        questionType: {type: String, default: "job", enum:["job","work"]},
        number:{type: String, default:null},
        createdAt:{type: String, default: +new Date()},
        isDeleted: {type: Boolean, default: false},
        isSolved: {type: Boolean, default: false},

});

module.exports = mongoose.model('Contact', contact);

