
'use strict';

let mongoose = require('mongoose'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models'),
    bcrypt = require('bcryptjs');
    const winston = require('winston');

    mongoose.Promise = Promise;
console.log("====process.env.NODE_ENV======",process.env.NODE_ENV)

//Connect to MongoDB
let options = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify : true

}

//  mongoose.connect(Config[process.env.NODE_ENV].mongoDb.URI,options).then(success => {
    mongoose.connect("mongodb://localhost:27017/testimonial",options).then(success => {
    // mongoose.connect("mongodb://localhost:27017/debicandb",options).then(success => {
        // mongoose.connect("mongodb://localhost:27017/graphi",options).then(success => {
    winston.info('MongoDB Connected');
}).catch(err => {
    console.log("====================",err)
    winston.info({ERROR: err});
    process.exit(1);
});


// connect to firebase
