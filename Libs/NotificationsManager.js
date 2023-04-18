
const Jwt = require('jsonwebtoken'),
        Config = require('../Config'),
        DAO = require('../DAOManager').queries,
        Models = require('../Models/'),
        UniversalFunctions = require('../Utils/UniversalFunctions'),
       
        _ = require('lodash')
       ERROR = Config.responseMessages.ERROR;

var FCM = require('fcm-push');
const mailgun = require('mailgun-js');
const DOMAIN = 'mail.debican.com';

const mg = mailgun({apiKey: "41dd0969b751f1dc981493cf65edf9b4-fe066263-6620b90a", domain: DOMAIN});

let nodemailer = require('nodemailer');
let sesTransport = require('nodemailer-ses-transport');



const get_email = async() =>{
    try{ 
    let query = { };
    let projection = { __v : 0};
    let options = {lean : true};
    let getMails = await DAO.getData(Models.emailCredentials,query,projection,options);

     if(getMails.length != 0){
     let transporter = nodemailer.createTransport(sesTransport({ 
       
            accessKeyId : getMails[0].accessKeyId ,  
            secretAccessKey : getMails[0].secretAccessKey, 
            region : getMails[0].region  

     }));

     
     return  {
       transporter : transporter,
       getMails : getMails
     } 
   }
   return [];
}catch(err){
    throw err;
  }
}



const sendMail = async(data) => {
   
    // var get =await get_email();
    // if(get){
        
        let obj = {
            from: "info@borman.ca",
            to: data.email,
            subject: data.subject,
            html : data.content
        };
        mg.messages().send(obj, function (error, body) {
            console.log("send mail ", body);
        })


}

const sendMails = async(data) => {

    // var get =await get_email();
    // let data1 = get.getMails
 
    let obj ={
        from: "info@borman.ca", //"info@stackgeeks.com"
        to: data.to,
        bcc: data.bcc,
        cc : data.cc,
        subject: data.subject,
        html: data.content,
    };
    mg.messages().send(obj, function (error, body) {
        console.log(body);
    })
    
    return null

}

const sendNotification = async (data,deviceToken) => {

    var fcm = new FCM(Config.APP_CONSTANTS.SERVER.NOTIFICATION_KEY);

    let message = {
        to : deviceToken,
        notification : {
            title : data.title,
            message : data.message,
            pushType : data.type,
            body : data.message,
            sound : "default",
            badge : 0,
        },
        data : data,
        priority : 'high'
    };

    console.log("--------------------push_data",message)

    fcm.send(message, function (err, result) {
        if(err) {
            console.log("----------------err",err)
        }
        else {
            console.log("----------------result",result)
        }
    });
};

module.exports={
    sendNotification : sendNotification,
    sendMail : sendMail,
    sendMails : sendMails,
    get_email : get_email,
};

