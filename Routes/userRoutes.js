var Controller = require("../Controller");
var UniversalFunctions = require("../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../Config");
const winston = require("winston");
var SUCCESS = Config.responseMessages.SUCCESS;
var ERROR = Config.responseMessages.ERROR;

module.exports = [
  {
    method: "POST",
    path: "/User/signIn",
    config:{
    auth:false,
    tags:['api'],
    // summary:"logIN Api's",
    description:"User Sign In Api",
    handler: (req,rep)=>{
       return Controller.userController.signIn(req.payload).then(response => {
        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, rep);
      })
      .catch(error => {
        winston.error("=====error=============", error);
        return UniversalFunctions.sendError("en", error, rep);
      });
    },
    validate:{
      payload: Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).unknown(),
      failAction: UniversalFunctions.failActionFunction
    },
    plugins:{
      "hapi-swagger": {
        payloadType: "form"
      }
    }
    },
  },
  {
    method: "POST",
    path: "/User/login",
    config:{
      auth: false,
      // auth:{strategies:[Config.APP_CONSTANTS.SCOPE.USER]},
    tags:['api'],
    description:"login method",
    handler:(req,rep)=>{
       return Controller.userController.login(req.payload).then(response => {
        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, rep);
      })
      .catch(error => {
        winston.error("=====error=============", error);
        return UniversalFunctions.sendError("en", error, rep);
      });
    },
    validate:{
      payload: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }),
      // headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction
    },
    plugins:{
      "hapi-swagger": {
        payloadType: "form"
      }
    }
    }
  },
  {
    method: "POST",
    path: "/User/Subcribe",
    config:{
    auth:false,
    // auth:{strategy: Config.APP_CONSTANTS.SCOPE.USER},
    tags:['api'],
    description:"user subscription is here",
    handler:(req,rep)=>{
       return Controller.userController.subscribe(req.payload).then(response => {
        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, rep);
      })
      .catch(error => {
        winston.error("=====error=============", error);
        return UniversalFunctions.sendError("en", error, rep);
      });
    },
    validate:{
      payload: Joi.object().keys({
        email: Joi.string().email().required(),
      }),
      // headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction
    },
    plugins:{
      "hapi-swagger": {
        payloadType: "form"
      }
    }
    }
  },

  {
    method: "POST",
    path: "/User/Sample",
    config:{
      auth:false,
      // auth:{strategy: Config.APP_CONSTANTS.SCOPE.USER},
      tags:['api'],
      description:"fill your Gmail For Sample, Sample Api",
      handler:(req,rep)=>{
          return Controller.userController.Sample(req.payload).then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, rep);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, rep);
        });
      },
      validate:{
        payload: Joi.object().keys({
          email: Joi.string().email().required(),
        }),
        // headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction
      },
      plugins:{
        "hapi-swagger": {
          payloadType: "form"
        }
      }
    }
  },


  {
    method: "POST",
    path: "/upload",
    config:{
      auth:false,
      // auth:{strategy: Config.APP_CONSTANTS.SCOPE.USER},
      tags:['api'],
      description:"immage uploasd api.....",
      handler:(req,rep)=>{
          return Controller.userController.upload(req.payload).then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, rep);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, rep);
        });
      },

      payload: {
        // multipart: {
          output: 'file',
          parse: true,
          allow: 'multipart/form-data'
          // }
        },
        validate:{
          payload: Joi.object().keys({
            file: Joi.any().meta({ swaggerType: 'file' }).description('file')
        }),
        // headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction
      },
      plugins:{
        "hapi-swagger": {
          payloadType: "form"
        }
      }
    }
  },

// ----------------

  // {
  //   method: "POST",
  //   path: "/User/adddData",
  //   config:{
  //   auth:false,
  //   tags:['api'],
  //   description:"User Sign In Api",
  //   handler: (req,rep)=>{
  //      return Controller.userController.addCategory(req.payload).then(response => {
  //       return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, rep);
  //     })
  //     .catch(error => {
  //       winston.error("=====error=============", error);
  //       return UniversalFunctions.sendError("en", error, rep);
  //     });
  //   },
  //   validate:{
  //     payload: Joi.object().keys({
  //       categoryId: Joi.string().optional(),
  //       name: Joi.string().required(),
  //       age: Joi.string().required(),
  //     })
  //   },
  //   plugins:{
  //     "hapi-swagger": {
  //       payloadType: "form"
  //     }
  //   }
  //   },
  // },
  
  // {
  //   method: "GET",
  //   path: "/User/list",
  //   config:{
  //   auth:false,
  //   tags:['api'],
  //   // summary:"logIN Api's",
  //   description:"User Sign In Api",
  //   handler: (req,rep)=>{
  //      return Controller.userController.addCategory(req.payload).then(response => {
  //       return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, rep);
  //     })
  //     .catch(error => {
  //       winston.error("=====error=============", error);
  //       return UniversalFunctions.sendError("en", error, rep);
  //     });
  //   },
  //   validate:{
  //     payload: Joi.object().keys({
  //       categoryId: Joi.string().optional(),
  //       name: Joi.string().required(),
  //       age: Joi.string().required(),
  //     })
  //   },
  //   plugins:{
  //     "hapi-swagger": {
  //       payloadType: "form"
  //     }
  //   }
  //   },
  // },
  

 






];

  



