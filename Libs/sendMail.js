let nodeMailer = require('nodemailer');

let sendOtpMail = (otp,email)=>{
    console.log("--- email ---",email);

    let transport = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user:"amitdhiman212001@gmail.com",
        pass: "agbgvwuoetonakyx"
    }  
})

let options ={
    from: email,
    to:"amitnota211@gmail.com",
    subject:"form nodemailer",
    text: `your otp is: ${otp}`
}

transport.sendMail(options, function(err, info){
    console.log("---otp ---",otp);
    if(err){
        console.log(err)
    }else{
        console.log("email has been sent" + info.response)
    }
})
}

module.exports ={
    sendOtpMail : sendOtpMail
}
