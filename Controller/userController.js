const DAO = require("../DAOManager").queries,
  Config = require("../Config"),
  TokenManager = require("../Libs/tokenManager"),
  NotificationsManager = require("../Libs/NotificationsManager"),
  ERROR = Config.responseMessages.ERROR,
  aws3 = Config.awsS3Config.s3BucketCredentials,
  Models = require("../Models"),
  bcrypt = require("bcryptjs"),
  request = require("request"),
  moment = require("moment"),
  UniversalFunctions = require("../Utils/UniversalFunctions"),
  winston = require("winston"),
  mongoose = require("mongoose");
var fs = require("fs");
notificationController = require("./notificationController");
var randomNum = require("random-numbers-generators");
var randomstring = require("randomstring");
//var  SendOtpManager = require('../Libs/SendOtpManager');
const DAOManager = require("../DAOManager");
//const stripe = require("stripe")("sk_test_51Igy2MEghh85rRAuw7X7QqNcGr2ZFangstYqBHwAjfbJXMUKkYCjYJQmXMxHPLa1PG06wNk0aGkFgWe2RM1Oya6c00tms4y8gg");
const stripe = require("stripe")(
  "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"
  );
  const jwt = require("jsonwebtoken");
  const AWS = require("aws-sdk");
  const commonController = require("./commonController");
  let libsImage = require('../Libs/saveImage');
  var OTP = 1234;
  
let csvtojson = require('csvtojson');

let path = require('path');
let csvToJson = require('convert-csv-to-json');
const { PayloadInstance } = require("twilio/lib/rest/api/v2010/account/recording/addOnResult/payload");





const signIn = async (payloadData) => {
  try {
  // console.log("----payLoadDAta -------", payloadData);

  let email = payloadData.email.toLowerCase();
  // console.log("--------- Email -------- ", email);

  let check_email = await commonController.checkUser_Email(Models.users,email);
  // console.log("------ check_email  -----", check_email);

  console.log("---- check_email length= ", check_email.length);

  if (!check_email.length) {
    let hashPassword = await DAO.securePassword(bcrypt , payloadData.password);
    let data = {
      name: payloadData.name,
      email: email,
      password: hashPassword,
    };

    let saveUser = await DAO.saveUserData(Models.users, data);
    // console.log("--- saveUSer ---", saveUser);

    let scopeToken = {
      _id: saveUser._id,
      collection: Models.users,
      scope: Config.APP_CONSTANTS.SCOPE.USER
    }

    let token = await commonController.generateToken(scopeToken);
    console.log("---  from userController ----", token);

    let saveToken = await commonController.saveToken(Models.users, {_id:saveUser._id} ,token);
    console.log("---login saveToken---",saveToken);

    return saveToken;
  } else {
    console.log("Email already exist");
    throw ERROR.EMAIL_ALREADY_EXIST;
  }
    
  } catch (err) {
    console.log('--tryerr--',err);
    throw err
  }
};



let login = async (payload) => {
  try {
    let email = { email: payload.email.toLowerCase() };
    let password = payload.password;

    let result = await DAO.get_Data(Models.users, email);
    console.log("--result from login ---", result);

    if (result.length) {
      console.log("email found");

      // let match =  await DAO.compPassword(bcrypt, password,result.password);

      console.log("db password-----", result[0].password);

      let match = await bcrypt.compare(password, result[0].password);

      console.log("---match---", match);

      if (match) {
        let resultP = result[0];
        console.log("result --", resultP);

        let scopeToken = {
          _id: result[0]._id,
          scope: Config.APP_CONSTANTS.SCOPE.USER,
          collection: Models.users
        }
        let token = await commonController.generateToken(scopeToken);

        let saveToken = await commonController.saveToken(Models.users, {_id:resultP._id} ,token);
        console.log("---login saveToken---",saveToken);

        console.log("password Match, Welcome You are logged In");
        return saveToken;
      } else {
        console.log("password doesn't match");
        throw ERROR.WRONG_PASSWORD;
      }
    } else {
      console.log("email not found");
      throw ERROR.EMAIL_NOT_FOUND;
    }
  } catch (err) {
    throw err;
  }
};


let subscribe = async(payloadData)=>{
  try {
  let email = payloadData.email.toLowerCase();

  let check = await DAO.get_OneData(Models.subscribe, {email:email}, {__v:0},{lean:true});
  let data = {
    email: payloadData.email,
  }

  if(check){
    console.log('--you have already subscribed----', check);
    throw "you have already subscribed"
  }else{
    let save = await DAO.saveUserData(Models.subscribe,data);
    console.log('--new subscription--',save);
    return save;
  }
    
  } catch (err) {
    console.log('--try err--',err);
    throw err;
  }
}



let Sample = async(payloadData)=>{
  try {
  let email = payloadData.email.toLowerCase();

  let check = await DAO.get_OneData(Models.subscribe, {email:email}, {__v:0},{lean:true});
  let data = {
    email: payloadData.email,
  }

  if(check){
    console.log('--you have already Raised a Query ----', check);
    throw "you have already Raised a Query"
  }else{
    let save = await DAO.saveUserData(Models.subscribe,data);
    console.log('--new for Sample--',save);
    return save;
  }
    
  } catch (err) {
    console.log('--try err--',err);
    throw err;
  }
}


// ------------------------------  Multer --------------------------------


const multer = require('multer');
// const path = require('path');
const uploadPath = path.join(__dirname,'../upload');



const uploadMulter = multer({
  storage: multer.diskStorage({
    destination: function(req,file,cb){
      console.log('---req.file---',req.file);
      console.log('--file--',file);
      cb(null, uploadPath)
    },
    filename:function(req,file,cb){
      console.log('----filename------',file);
      cb(null, file.fieldname + "-"+ Date.now()+ file.originalname);
    }  
  })
}).single('file');


let upload = async(payloadData)=>{
  try {
    let videoPath = payloadData.file.path;
    let videoSize = payloadData.file.bytes;

    console.log('----req.payloadData------',payloadData);
    // console.log('-----videoPath------',videoPath);
    console.log('-----videoSize------',videoSize);

    let readableStream = fs.createReadStream(videoPath);
    
    let chunkSize;

    readableStream.on("data",(chunks)=>{
      console.log('---chunks.length-----',chunks.length);
      console.log('---chunks-----',chunks);
      chunkSize = chunks /10;

      console.log("----chunkSize-----", chunkSize);
    })
    
    uploadMulter()
    
    return chunkSize;
  } catch (err) {
    console.log("err",err);
  }
}





module.exports = {
  signIn : signIn,
  login : login,
  subscribe : subscribe,
  Sample : Sample,
  upload : upload,


};



