const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admins = new Schema({
        email: {type: String, default: null},
        subscribed : {type: Boolean, default: true},
        createdAt:{type: String, default: +new Date()},
        isDeleted: {type: Boolean, default: false},

})

module.exports = mongoose.model('Subscribe', admins);

