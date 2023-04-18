
exports.ERROR = {
    

    NO_ANY_CARD_AVIALBLE : {
        statusCode: 400,
        customMessage: {
            en : 'you don not have any debican card please aplly ',
        },
        type: 'NO_ANY_CARD_AVIALBLE'
    }, 

    NOT_SUFFICIENT_BALANCE : {
        statusCode: 400,
        customMessage: {
            en : 'you balance is sufficient please check again ',
        },
        type: 'NOT_SUFFICIENT_BALANCE'
    },  

    CARD_LIMIT_LOWER : {
        statusCode: 400,
        customMessage: {
            en : 'your card limit is lesser',
        },
        type: 'CARD_LIMIT_LOWER'
    },
    NO_STOCK_AVILABLE : {
        statusCode: 400,
        customMessage: {
            en : 'This product is not in stock now check ur quentity ',
        },
        type: 'NO_STOCK_AVILABLE'
    },
    
    THIS_TASK_ALREADY_STARTED : {
        statusCode: 400,
        customMessage: {
            en : 'This task already started by other child ',
        },
        type: 'THIS_TASK_ALREADY_STARTED'
    },
    
    SOCIAL_KEY_NOT_EXSIST : {
        statusCode: 400,
        customMessage: {
            en : 'social key not exsist ',
            sp : 'transactio faild por favor intente nuevamente'
        },
        type: 'SOCIAL_KEY_NOT_EXSIST'
    },

  
    TRANSATION_FAILD : {
        statusCode: 400,
        customMessage: {
            en : 'transactio faild please try again',
            sp : 'transactio faild por favor intente nuevamente'
        },
        type: 'TRANSATION_FAILD'
    },


    SHOULD_MINIMUM_PRICE : {
        statusCode: 400,
        customMessage: {
            en : 'purchased minimum price 2000 then this promocode work',
            sp : 'comprado precio mínimo 2000, entonces este código promocional funciona'
        },
        type: 'SHOULD_MINIMUM_PRICE'
    },

    
    TIME_OUT_PROMOCODE : {
        statusCode: 400,
        customMessage: {
            en : 'time out of promocode',
            sp : 'tiempo fuera del código promocional'
        },
        type: 'TIME_OUT_PROMOCODE'
    },
    
    PLESE_SELECT_SINGLE_CATEGORY : {
        statusCode: 400,
        customMessage: {
            en : 'please select only single category check again',
            sp : 'código de promoción no válido'
        },
        type: 'PLESE_SELECT_SINGLE_CATEGORY'
    },
    
    SNO_DUPLICATE : {
        statusCode: 400,
        customMessage: {
            en : 'serial no is duplicate please check again',
            sp : 'código de promoción no válido'
        },
        type: 'SNO_DUPLICATE'
    },

    INVALID_PROMOCODE : {
        statusCode: 400,
        customMessage: {
            en : 'invalid promocode',
            sp : 'código de promoción no válido'
        },
        type: 'INVALID_PROMOCODE'
    },
    
    ALREADY_EXSIST_CATEGORY : {
        statusCode: 400,
        customMessage: {
            en : 'aleady exsist category in this product ',
            sp : 'Ya existe una categoría en este producto.'
        },
        type: 'ALREADY_EXSIST_CATEGORY'
    },

    ALREADY_EXSIST_CHILD : {
        statusCode: 400,
        customMessage: {
            en : 'Already added this child ',
            sp : 'Ya existe una categoría en este producto.'
        },
        type: 'ALREADY_EXSIST_CHILD'
    },

    ALREADY_ADDED_PARENT : {
        statusCode: 400,
        customMessage: {
            en : 'Already added your parent ',
            sp : 'Ya existe una categoría en este producto.'
        },
        type: 'ALREADY_ADDED_PARENT'
    },

    DUPLICATE_PRODUCT_NAME : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! Duplicate product name.',
            sp : '¡UPS! Nombre de producto duplicado.'
        },
        type: 'DUPLICATE_PRODUCT_NAME'
    },
    
    INVALID_PRODUCT_ID : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! this product id not exsist.',
            sp : '¡UPS! este ID de producto no existe'
        },
        type: 'INVALID_PRODUCT_ID'
    },
    INVALID_CATEGORY_ID : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! this category id not exsist.',
            sp : '¡UPS! esta identificación de categoría no existe'
        },
        type: 'INVALID_CATEGORY_ID'
    },
    INVALID_SUBCATEGORY_ID : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! this  subcategory id not exsist.',
            sp : '¡UPS! este id de subcategoría no existe'
        },
        type: 'INVALID_SUBCATEGORY_ID'
    },
    DUPLICATE_CATEGORY_NAME : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! Duplicate category name.',
        },
        type: 'DUPLICATE_CATEGORY_NAME'
    },
    
    DUPLICATE_SUBCATEGORY_NAME : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! Duplicate subcategory name.',
        },
        type: 'DUPLICATE_SUBCATEGORY_NAME'
    },
    
    TOKEN_INVALID : {
        statusCode:400,
        customMessage : {
            en : "token is not valid please check again ",
            sp : "el token no es válido no es válido"
            
        },
        type : "TOKEN_INVALID"
    },

    
    PHONENO_ALREADY_EXIST_USER : {
        statusCode:400,
        customMessage : {
            en : "this phone number aleady exsist plese try another",
            sp : "Este número de teléfono ya existe por favor prueba otra",
        },
        type : "PHONENO_ALREADY_EXIST_USER"
    },
    

    INVALID_ID : {
        statusCode:400,
        customMessage : {
            en : " invalid id ",
            sp : "identificación invalida"
        },
        type : "INVALID_ID"
    },

    INVALID_TUNE_ID : {
        statusCode:400,
        customMessage : {
            en : "tune id is not valid",
            sp : 'tune id no es válido'
        },
        type : "INVALID_TUNE_ID"
    },

    INVALID_TUTORIAL_ID : {
        statusCode:400,
        customMessage : {
            en : "turorial id is not valid",
            sp : "la identificación turorial no es válida"
        },
        type : "INVALID_TUTORIAL_ID"
    },
    
    NO_DATA_FOUND : {
        statusCode:400,
        customMessage : {
            en : "no data found",
            sp : 'datos no encontrados'
        },
        type : "NO_DATA_FOUND"
    },
    
    INVALID_OTP : {
        statusCode:400,
        customMessage : {
            en : "invalid otp please check utfgvjh again",
            sp : 'otp inválido por favor revise de nuevo'
        },
        type : "INVALID_OTP"
    },

    PHONENO_ALREADY_EXIST : {
        statusCode:400,
        customMessage : {
            en : "This mobileNumber already exsist",
            sp : 'Esta número móvil ya existe'
        },
        type : "PHONENO_ALREADY_EXIST"
    },

    CONFIRM_PASSWORD_INVALID : {
        statusCode:400,
        customMessage : {
            en : "password Mismatch ",
            sp : 'contraseña no coincide'
        },
        type : "CONFIRM_PASSWORD_INVALID"
    },
   

    BLOCKED : {
        statusCode:400,
        customMessage : {
            en : "admin blocked your profile",
            sp : "el administrador bloqueó su perfil"
        },
        type : "BLOCKED"
    },


    MULTIPLE_USE_LIMIT_REACHED : {
        statusCode:400,
        customMessage : {
            en : "multiple use limit reached"
        },
        type : "MULTIPLE_USE_LIMIT_REACHED"
    },

    MIN_ORDER_AMOUNT : {
        statusCode:400,
        customMessage : {
            en : "your total order amount must be greater than minimum amount",
            sp : 'el monto total de su pedido debe ser mayor que el monto mínimo'
        },
        type : "MIN_ORDER_AMOUNT"
    },

    
    NOT_FOUND: {
        statusCode: 400,
        customMessage: {
            en : 'Your Account Is temporary Blocked Please contact Admin',
            sp : 'Su cuenta está bloqueada temporalmente. Póngase en contacto con el administrador.'
        },
        type: 'NOT_FOUND'
    },


    WRONG_ACCESS_TOKEN: {
        statusCode: 400,
        customMessage: {
            en : 'Wrong access token',
            sp : 'Token de acceso incorrecto'
        },
        type: 'WRONG_ACCESS_TOKEN'
    },


    INVALID_REQUEST_ID: {
        statusCode: 400,
        customMessage: {
            en : 'Invalid Request Id',
            sp : 'ID de solicitud no válida'
        },
        type: 'INVALID_REQUEST_ID'
    } ,

    INVALID_NOTIFICATION_ID: {
        statusCode: 400,
        customMessage: {
            en : 'Invalid notification Id',
            sp : 'ID de solicitud no válida'
        },
        type: 'INVALID_NOTIFICATION_ID'
    } ,

    INSUFICIANT_BALANCED: {
        statusCode: 400,
        customMessage: {
            en : 'Insuficiant balanced in your pigy bank',
            sp : 'ID de solicitud no válida'
        },
        type: 'INSUFICIANT_BALANCED'
    } ,

    OLD_PASSWORD_MISMATCH: {
        statusCode: 400,
        customMessage: {
            en : 'Old Password Mismatch',
            sp : 'No coincide la contraseña anterior'
        },
        type: 'OLD_PASSWORD_MISMATCH'
    },

    INVALID_OBJECT_ID : {
        statusCode:400,
        customMessage : {
            en : 'Invalid Id provided.',
            sp : 'Id inválida proporcionada'
        },
        type : 'INVALID_OBJECT_ID'
    },
    NAME_ALREADY_EXISTS : {
        statusCode:400,
        customMessage : {
            en : 'Name Already Exists Please Change Name',
        },
        type : 'NAME_ALREADY_EXISTS'
    },

    WRONG_EMAIL_ADDRESS : {
        statusCode:400,
        customMessage : {
            en : 'The email you entered does not match any accounts.Please check your email.',
            sp : 'El correo electrónico que ingresó no coincide con ninguna cuenta. Por favor revise su correo electrónico.'
        },
        type : 'WRONG_EMAIL_ADDRESS'
    },
    
    INVALID_USER_ID : {
        statusCode:400,
        customMessage : {
            en : 'Invalid UserId provided.',
            sp : 'UserId proporcionado no válido.'
        },
        type : 'INVALID_USER_ID'
    },

    INVALID_OPERATION : {
        statusCode:400,
        customMessage : {
            en : 'Invalid operation.',
            sp : 'Operación inválida.'
        },
        type : 'INVALID_OPERATION'
    },
    DB_ERROR: {
        statusCode: 400,
        customMessage: {
            en : 'DB Error : ',
            sp : 'Error de base de datos',
        },
        type: 'DB_ERROR'
    },
    APP_ERROR: {
        statusCode: 400,
        customMessage: {
            en : 'Application Error ',
            sp : 'Error de la aplicación'
        },
        type: 'APP_ERROR'
    },
    DUPLICATE: {
        statusCode: 400,
        customMessage: {
            en : 'Duplicate Entry',
            sp : 'Entrada duplicada'
        },
        type: 'DUPLICATE'
    },
    DEFAULT: {
        statusCode: 400,
        customMessage: {
            en : 'Something went wrong.',
            sp : 'Algo salió mal.'
        },
        type: 'DEFAULT'
    },
    UNAUTHORIZED: {
        statusCode:401,
        customMessage : {
            en : 'You are not authorized to perform this action',
            sp : 'No estás autorizado para realizar esta acción.'
        },
        type : 'UNAUTHORIZED'
    },

    INVALID_CREDENTIALS : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! The Phone Number or Password is incorrect.',
            sp : '¡UPS! El número de teléfono o la contraseña son incorrectos.'
        },
        type: 'INVALID_CREDENTIALS'
    },

    INVALID_DATA : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! data is not valid.',
            sp : '¡UPS! El número de teléfono o la contraseña son incorrectos.'
        },
        type: 'INVALID_DATA'
    },
   
    WRONG_PASSWORD: {
        statusCode: 400,
        customMessage: {
            en : 'Password is Incorrect.',
            sp : 'La contraseña es incorrecta',
        },
        type: 'WRONG_PASSWORD'
    } ,

    WRONG_OTP: {
        statusCode: 400,
        customMessage: {
            en : 'OTP is Incorrect.',
            sp : 'OTP es incorrecta'
        },
        type: 'WRONG_OTP'
    } ,
    USER_BLOCKED: {
        statusCode: 401,
        customMessage: {
            en : 'User Is Blocked By Admin.',
            sp : 'El usuario está bloqueado por el administrador.'
        },
        type: 'USER_BLOCKED'
    } ,
    OTP_NOT_VERIFIED: {
        statusCode: 400,
        customMessage: {
            en : 'OTP Not Verified',
            sp : 'OTP no verificada'
        },
        type: 'OTP_NOT_VERIFIED'
    } ,
     
    WRONG_ACCESS_TOKEN: {
        statusCode: 400,
        customMessage: {
            en : 'Access Token is Incorrect',
            sp : "El token de acceso es incorrecto",
        },
        type: 'WRONG_ACCESS_TOKEN'
    } ,

    OLD_WRONG_PASSWORD: {
        statusCode: 400,
        customMessage: {
            en : 'Old Password is Incorrect.',
            sp : "Antigua contraseña es incorrecta.",
        },
        type: 'OLD_WRONG_PASSWORD'
    } ,

    MOBILE_NO_NOT_FOUND: {
        statusCode:400,
        customMessage : {
            en : 'Mobile Number not found please check again ',
            sp : 'Número de teléfono no encontrado'
        },
        type : 'MOBILE_NO_NOT_FOUND'
    },
    EMAIL_ALREADY_EXIST: {
        statusCode:400,
        customMessage : {
            en : 'The email address already  used. Please provide another email address',
            sp :'La dirección de correo electrónico ya utilizada. Proporcione otra dirección de correo electrónico',
        },
        type : 'EMAIL_ALREADY_EXIST'
    },

    
    SOCIAL_KEY_ALREADY_EXIST: {
        statusCode:400,
        customMessage : {
            en : 'This social key already used',
        },
        type : 'SOCIAL_KEY_ALREADY_EXIST'
    },

    NAME_ALREADY_EXIST: {
        statusCode:400,
        customMessage : {
            en : 'The Name you entered has already been used. Please provide another Name',
            sp : 'El nombre que ingresó ya se ha utilizado. Proporcione otro nombre'
        },
        type : 'NAME_ALREADY_EXIST'
    },

    MOBILE_ALREADY_EXIST: {
        statusCode:400,
        customMessage : {
            en : 'The Mobile Number already used. Please provide another ',
            sp : 'El número de móvil ya utilizado. Por favor proporcione otro'
        },
        type : 'MOBILE_ALREADY_EXIST'
    },


    USER_NOT_FOUND: {
        statusCode: 404,
        customMessage: {
            en:  'Customer not found',
            sp : 'Cliente no encontrada'
        },
        type : 'CUSTOMER_NOT_FOUND'
    },
    

    EMAIL_NOT_FOUND: {
        statusCode: 400,
        customMessage: {
            en:  'Email not found',
            sp : 'EL CORREO ELECTRÓNICO NO ENCONTRADO'
        },
        type : 'EMAIL_NOT_FOUND'
    },

 PRODUCT_ALREADY_EXSIST : {
        statusCode: 400,    
        en : 'This product already exsist in wish list ',
        type: 'PRODUCT_ALREADY_EXSIST'
    },


PRODUCT_ALREADY_EXSIST_CART : {
    statusCode: 400,    
    en : 'This products already exsist in cart ',
    type: 'PRODUCT_ALREADY_EXSIST_CART'
},

INVALID_CARD_ID : {
    statusCode: 400,    
    en : 'This card id is not exsist please check again',
    type: 'INVALID_CARD_ID'
},

CARD_ID_REQUIRED : {
    statusCode: 400,    
    en : 'Card Id is required please check again',
    type: 'CARD_ID_REQUIRED'
},


INVALID_TASK_ID : {
    statusCode: 400,    
    en : 'This task id is not exsist please check again',
    type: 'INVALID_TASK_ID'
},


//  ----- New ERRORs ------


COUNTRY_ALREADY_EXSIST : {
    statusCode: 400,
    customMessage: {
        en : 'this Countruy already exists! ',
        sp : 'Ya existe una categoría en este producto.'
    },
    type: 'COUNTRY_ALREADY_EXSIST'
},

STATE_ALREADY_EXSIST : {
    statusCode: 400,
    customMessage: {
        en : 'State already exists! ',
        sp : 'Ya existe una categoría en este producto.'
    },
    type: 'STATE_ALREADY_EXSIST'
},


};

exports.SUCCESS = {

    RETURN_ORDER_TIME_OUT : {
        statusCode: 400,    
        en : 'you cannot return product because return time out',
        type: 'RETURN_ORDER_TIME_OUT'
    },



    DEFAULT: {
        statusCode: 200,
        customMessage: {
            en : 'Success',
            sp : 'Éxito',
        },
        type: 'DEFAULT'
    },
    ADDED : {
        statusCode: 200,
        customMessage: {
            en : 'Added successfully.',
            sp : 'Agregado exitosamente'
        },
        type: 'ADDED'
    },
    FORGOT_PASSWORD: {
        statusCode: 200,
        customMessage: {
            en: "A reset password link is sent to your registered email address.",
            sp : 'Se envía un enlace para restablecer la contraseña a su dirección de correo electrónico registrada'
        },
        type: 'FORGOT_PASSWORD'
    },
    PASSWORD_RESET_SUCCESSFULL:{
        statusCode:200,
        customMessage:{
            en:"Your Password has been Successfully Changed",
            sp : 'Su contraseña ha sido cambiada exitosamente'
        },
        type:'PASSWORD_RESET_SUCCESSFULL'
    },
    RESET_PASSWORD:{
        statusCode:200,
        customMessage:{
            en:"A reset password OTP has been sent to your registered Phone Number",
            sp : 'Se ha enviado una contraseña de restablecimiento OTP a su número de teléfono registrado'
        },
        type: 'RESET_PASSWORD'
    }
    
};