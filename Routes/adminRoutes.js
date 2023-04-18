var Controller = require("../Controller");
var UniversalFunctions = require("../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../Config");
const winston = require('winston');
var SUCCESS = Config.responseMessages.SUCCESS;
var ERROR = Config.responseMessages.ERROR;


module.exports = [

  {
    method: "POST",
    path: "/Admin/signIn",
    options: {
      description: "Admin signIn Api",
      auth: false,
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.adminSignIn(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          name: Joi.string().required(),
          email: Joi.string().email().required().description("Enter your Email"),
          password: Joi.string().required().description("Enter your Password")
        },
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/Login",
    options: {
      description: "Admin Login Api",
      auth: false,
      // auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.adminLogIn(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          email: Joi.string().email().required().description("Enter your Email Address"),
          password: Joi.string().required().description("Enter your Password")
        },
        // headers: UniversalFunctions.authorizationHeaderObj ,
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "POST",
    path: "/Admin/addEdit/Highlights",
    options: {
      description: "Admin Add add-Edit Highlights Data",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.addEditHighlights(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          // icon: Joi.any().meta({swaggerType:'file',enctype:"multipart/form-data"}),   //not define .max(1),
          heading: Joi.string().required(),
          description: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/addEdit/Categories",
    options: {
      description: "Add Edit Categories Admin",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.addEditCategory(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          image: Joi.any().meta({swaggerType:'file',enctype:"multipart/form-data"}),   //not define .max(1),
          heading: Joi.string().optional(),
          description: Joi.string().optional(),
          points: Joi.string().optional(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/addEdit/catgeoryTopics",
    options: {
      description: "Admin Add Visual Data of SubCategories",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.addEditVisuals(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          categoryId: Joi.string().required(),
          image: Joi.any().meta({swaggerType:'file',enctype:"multipart/form-data"}),   //.max(1),
          heading: Joi.string().required(),
          description: Joi.string().optional(),
          price: Joi.number().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  // --------------------------------

  {
    method: "POST",
    path: "/Admin/addEdit/catgeoryHighlights",
    options: {
      description: " CatgeoryHighlights Data of SubCategories",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.catgeoryHighlights(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          // icon: Joi.string().optional,   //.max(1),
          heading: Joi.string().required(),
          description: Joi.string().optional(),
          categoryTopicsId: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },



  {
    method: "POST",
    path: "/Admin/addEdit/WhatsInsideIt",
    options: {
      description: " What's Inside It  of SubCategories",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.WhatsInsideIt(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          heading: Joi.string().required(),
          description: Joi.string().optional(),
          categoryTopicsId: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  

  
  {
    method: "POST",
    path: "/Admin/addEdit/testimonialReview",
    options: {
      description: "testimonial Reviews api here",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.review(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          star: Joi.number().required().min(1).max(5),
          review: Joi.string().required(),
          name: Joi.string().required(),
          universityName: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  
  {
    method: "POST",
    path: "/Admin/addEdit/AboutUs",
    options: {
      description: "all About us add-edit api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.addEditAboutUs(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          // icon: Joi.any().meta({swaggerType:'file',enctype:"multipart/form-data"}),   //not define .max(1),
          question: Joi.string().required(),
          answer: Joi.string().optional(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/addEdit/Blogs",
    options: {
      description: "add Blogs add-edit api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.addEditBlogs(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().required(),
          image: Joi.any().meta({swaggerType:'file',enctype:"multipart/form-data"}),   //not define .max(1),
          heading: Joi.string().required(),
          description: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/addEdit/fewTopics",
    options: {
      description: "add Blog's sub Blogs add-edit api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.addEditBlogsVisual(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          image: Joi.any().meta({swaggerType:'file',enctype:"multipart/form-data"}),   //not define .max(1),
          heading: Joi.string().required(),
          description: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "POST",
    path: "/Admin/ContactUs",
    options: {
      description: "Contact us from here! Fill your Details...here",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.contactUs(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          fullname: Joi.string().required(),
          email: Joi.string().email().required(),
          message: Joi.string().required(),
          questionType: Joi.string().valid("job","work"),
          number: Joi.number().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  

  {
    method: "POST",
    path: "/Admin/addEdit/Services",
    options: {
      description: "Admin gives some Services, Services's Api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.Services(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          service1: Joi.string().required(),
          service2: Joi.string().required(),
          service3: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/addEdit/Address",
    options: {
      description: "Our all Contacts/Address are here, Contact us anytime...",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.Address(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          address: Joi.string().required(),
          number: Joi.number().required(),
          email: Joi.string().email().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/addEdit/SocialMedia",
    options: {
      description: "Admin's SocialMedia api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.SocialMedia(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          _id: Joi.string().optional(),
          facebookIcon: Joi.string().optional(),
          instagram: Joi.string().optional(),
          linkedIn: Joi.string().optional(),
          twitter: Joi.string().optional(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "POST",
    path: "/Admin/addEdit/TermsConditions",
    options: {
      description: "add Terms & Conditions api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.TermsConditions(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          termsConditions: Joi.string().required(),
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },
  
  {
    method: "POST",
    path: "/Admin/addEdit/PrivacyPolicy",
    options: {
      description: "add Privacy and Policy api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.PrivacyPolicy(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          privacyPolicy: Joi.string().required(),

        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "POST",
    path: "/Admin/addEdit/ReturnPolicy",
    options: {
      description: "post edit Return Policy api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.ReturnPolicy(request.payload)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        payload: {
          returnPolicy: Joi.string().required(),

        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


// ---------------   GET METHODS    --------------

  {
    method: "GET",
    path: "/Admin/gethighlights",
    options: {
      description: "GET  highlights Policy api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(req, reply) => {
        return await Controller.adminController.getHighlights(req.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getCategories",
    options: {
      description: "GET Categories api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(req, reply) => {
        return await Controller.adminController.getCategories(req.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getCatgeoryVisual",
    options: {
      description: "GET Categories Visual api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(req, reply) => {
        return await Controller.adminController.getCatgeoryVisual(req.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getReview",
    options: {
      description: "Review api here",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getReview(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "GET",
    path: "/Admin/getAboutUs",
    options: {
      description: "get data of AboutUs api, is here",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getAboutUs(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getBlogs",
    options: {
      description: "get data of blog's api, is here",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getBlogs(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  {
    method: "GET",
    path: "/Admin/getBlogsVisual",
    options: {
      description: "get data of blog's api, is here",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getBlogsVisual(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getContactUs",
    options: {
      description: "Check, how many have Contacted Us, api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getContactUs(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  
  {
    method: "GET",
    path: "/Admin/getServices",
    options: {
      description: "Services given by Admin, getServices Api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getServices(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  
  {
    method: "GET",
    path: "/Admin/getAddress",
    options: {
      description: "Check Admin's Address is, getAddress's Api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getAddress(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getSocialMedia",
    options: {
      description: "Admin is on few SocialMedia, api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getSocialMedia(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getTermsConditions",
    options: {
      description: "Admin have some Terms And Conditions, Read Well, api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getTermsConditions(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


  {
    method: "GET",
    path: "/Admin/getPrivacyPolicy",
    options: {
      description: "Admin have some Privacy Policies, look here",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getPrivacyPolicy(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },

  
  {
    method: "GET",
    path: "/Admin/getReturnPolicy",
    options: {
      description: "get data of Return Policy, api",
      auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
      tags: ["api"],
      handler: async(request, reply) => {
        return await Controller.adminController.getReturnPolicy(request.auth.credentials)
          .then(response => {
            return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
          })
          .catch(error => {
            winston.error("=====error=============", error);
            return UniversalFunctions.sendError("en", error, reply);
          });
      },
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  },


// ---------- DELETE METHODS API--------------

{
  method: "PUT",
  path: "/Admin/deleteHighlights",
  options: {
    description: "Admin Add add-Edit Highlights Data",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteHighlights(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},

{
  method: "PUT",
  path: "/Admin/deleteCategories",
  options: {
    description: "Add Edit Categories Admin",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteCategories(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/deleteCatgeoryVisual",
  options: {
    description: "delete Catgeory's Visual sub visual ",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteCatgeoryVisual(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required()
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/deleteReview",
  options: {
    description: "delete Review api here",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteReview(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/deleteAboutUs",
  options: {
    description: "Review api, delete from here",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteAboutUs(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/deleteBlogs",
  options: {
    description: "Blogs api, delete from here",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteBlogs(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/deleteBlogsVisual",
  options: {
    description: "Blogs api, delete blogs's sub Blogs from here",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteBlogsVisual(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},

{
  method: "PUT",
  path: "/Admin/querySolved",
  options: {
    description: "solved Contact Us, Solved from here",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.querySolved(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/deleteServices",
  options: {
    description: "deleteServices form here, Services's Api",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteServices(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


//  -------   Delete Address ?   ----------
//  -------   Delete Social Media ?   ----------


{
  method: "PUT",
  path: "/Admin/deleteTermsConditions",
  options: {
    description: "delete Terms & Conditions form here, Services's Api",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteTermsConditions(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/addEdit/deletePrivacyPolicy",
  options: {
    description: "delete Privacy and Policy from here, api",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deletePrivacyPolicy(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},


{
  method: "PUT",
  path: "/Admin/addEdit/deleteReturnPolicy",
  options: {
    description: "delete Privacy and Policy from here, api",
    auth: {strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]},
    tags: ["api"],
    handler: async(request, reply) => {
      return await Controller.adminController.deleteReturnPolicy(request.payload)
        .then(response => {
          return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
        })
        .catch(error => {
          winston.error("=====error=============", error);
          return UniversalFunctions.sendError("en", error, reply);
        });
    },
    validate: {
      payload: {
        _id: Joi.string().required(),
      },
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
    },
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
        responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
},









];

