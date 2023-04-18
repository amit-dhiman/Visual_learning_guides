
const Jwt = require('jsonwebtoken'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models/'),
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    _ = require('lodash')
    ERROR = Config.responseMessages.ERROR;


let generateAuthToken = async(payload,userType)=>{
    // console.log("------ generateauthtoken's Payload ------", payload);
    // console.log("------ userType ------", userType);

    let secretKey ;
    switch(userType){
        case Config.APP_CONSTANTS.SCOPE.USER: 
        secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER; 
        break;
        case Config.APP_CONSTANTS.SCOPE.NEWUSER:
        secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_NEWUSER;
        break;
        case Config.APP_CONSTANTS.SCOPE.ADMIN:
        secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_ADMIN;
        break;
    }
    console.log("secretKey ---",secretKey);

    let token = await Jwt.sign(payload, secretKey);
    // console.log("---- token --jwt--", token);
    return token;
}


//    --------- VERIFY AUTH TOKEN  ----------

let verify_Auth_Token = async function verify_Auth_Token(decoded_token,secret_header){
    // console.log('---token---',token);
    // console.log('-----decodedToken-----',decoded_token);
    // console.log('-----secret_header-----',secret_header);

    let token = secret_header.headers.authorization; 

    let user;

    if(decoded_token.scope === Config.APP_CONSTANTS.SCOPE.NEWUSER){
        user = await DAO.get_Data(Models.users,{_id: decoded_token._id,accessToken:token});
        
    }else if(decoded_token.scope === Config.APP_CONSTANTS.SCOPE.USER){
        user = await DAO.get_Data(Models.users,{_id: decoded_token._id,accessToken:token});
        
    }else if(decoded_token.scope === Config.APP_CONSTANTS.SCOPE.ADMIN){
        user = await DAO.get_Data(Models.admins,{_id: decoded_token._id,accessToken: token});

    }

    if(user.length == 0 || user == null){
        throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
    }
    return {isValid:true, credentials: user[0]}
}


var generateToken = function(tokenData,userType) {
    return new Promise((resolve, reject) => {
        try {
           let secretKey;
            switch(userType){
                case Config.APP_CONSTANTS.SCOPE.ADMIN:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_ADMIN;
                    break;
                case Config.APP_CONSTANTS.SCOPE.USER:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER;
                    break;
                case Config.APP_CONSTANTS.SCOPE.VENDOR:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_VENDOR;
                    break;   

            }

         //   console.log("........tokenData...........",tokenData);
            let token = Jwt.sign(tokenData, secretKey);
         //    console.log("=======secretKey==========",token,secretKey)

            return resolve(token);
        } catch (err) {
            return reject(err);
        }
    });
};


var verifyToken = async function verifyToken(tokenData,secretKey) {

    var token = secretKey.headers.authorization.substr(7,300);
    var token1 = secretKey.headers.authorization;
    console.log("......token .....",token)
    console.log("......token1 .....",token1)
    
    console.log("============tokenData================",tokenData);

    var user;

        let query = {_id : tokenData._id,accessToken : {$ne:null},}

        if(tokenData.scope === Config.APP_CONSTANTS.SCOPE.ADMIN){
           // console.log("..+++++++++++++++++++.user..******************............",query);
             
            user = await DAO.getData(Models.admins,query,{__v : 0},{lean : true});
         //   console.log("..+++++++++++++++++++.user..******************............",user);
            if(!(user.length)){
                throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
            }
         }

        else if(tokenData.scope === Config.APP_CONSTANTS.SCOPE.USER){
            user = await DAO.getData(Models.users,{_id: tokenData._id,accessToken : token1},{__v : 0},{lean : true});
            if(!(user.length)){
                throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
            }
        }
        else if(tokenData.scope === Config.APP_CONSTANTS.SCOPE.VENDOR){
            user = await DAO.getData(Models.vendors,{_id: tokenData._id},{__v : 0},{lean : true});
            if(!(user.length)){
                throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
            }   
        }

        if(user.length === 0){
            throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
        } else{
            user[0].scope = tokenData.scope;
            return {
                isValid: true,
                credentials : user[0]
            }
        }
        
};

module.exports={
    generateAuthToken : generateAuthToken,
    verify_Auth_Token : verify_Auth_Token,


    generateToken:generateToken,
    verifyToken : verifyToken,
};

