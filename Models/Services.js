const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Services = new Schema({
        service1: {type: String, default: null},
        service2: {type: String, default: null},
        service3:{type: String, default: null},
        service4: {type: String, default: null},
        createdAt:{type: String, default: +new Date()},
        isDeleted: {type: Boolean, default: false},

})

module.exports = mongoose.model('Services', Services);

