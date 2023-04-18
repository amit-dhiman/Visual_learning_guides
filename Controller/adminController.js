const DAO = require("../DAOManager").queries,
  Config = require("../Config"),
  TokenManager = require("../Libs/tokenManager"),
  NotificationsManager = require("../Libs/NotificationsManager"),
  ERROR = Config.responseMessages.ERROR,
  Models = require("../Models"),
  commonController = require("./commonController"),
  moment = require("moment"),
  UniversalFunctions = require("../Utils/UniversalFunctions");
var lodash = require("lodash");
let bcrypt = require('bcryptjs');
const notificationController = require("./notificationController");
let aggregateList = require("../Aggregation/list_buyer");


const adminSignIn = async (payloadData) => {
  // console.log("----payLoadDAta -------", payloadData);

  let email = payloadData.email.toLowerCase();
  // console.log("--------- Email -------- ", email);

  let check_email = await commonController.checkUser_Email(Models.admins, email);
  // console.log("------ check_email  -----", check_email);

  console.log("---- check_email length= ", check_email.length);

  if (!check_email.length) {
    let hashPassword = await DAO.securePassword(bcrypt, payloadData.password);
    let data = {
      name: payloadData.name,
      email: email,
      password: hashPassword,
    };

    // Save new Data if user doesn't exist
    let saveUser = await DAO.saveUserData(Models.admins, data);
    // console.log("--- saveUSer ---", saveUser);

    let scopeToken = {
      _id: saveUser._id,
      collection: Models.admins,
      scope: Config.APP_CONSTANTS.SCOPE.ADMIN
    }

    let token = await commonController.generateToken(scopeToken);
    console.log("---  from adminController ----", token);

    let saveToken = await commonController.saveToken(Models.admins, { _id: saveUser._id }, token);
    console.log("---login saveToken---", saveToken);

    return saveToken;
  } else {
    console.log("Email already exist");
    throw ERROR.EMAIL_ALREADY_EXIST;
  }
};


const adminLogIn = async (payloadData) => {
  try {
    let email = payloadData.email.toLowerCase();
    let checkAdmin = await DAO.get_Data(Models.admins, { email: email },
      { __v: 0 }, { lean: true }
    );

    if (!checkAdmin.length) {
      throw ERROR.EMAIL_NOT_FOUND;
    }
    let compPassword = await DAO.compPassword(bcrypt, payloadData.password, checkAdmin[0].password);

    if (compPassword == false) {
      throw ERROR.WRONG_PASSWORD;
    }
    //    console.log("=========== checkAdmin[0] =======",checkAdmin)

    checkAdmin = checkAdmin[0];

    console.log("----------- checkAdminid ------", checkAdmin._id);

    if (checkAdmin._id) {
      let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.ADMIN,
        _id: checkAdmin._id,
        time: +new Date(),
        collection: Models.admins,
      };

      let accessToken = await TokenManager.generateToken(
        tokenData,
        Config.APP_CONSTANTS.SCOPE.ADMIN
      );

      if (accessToken == null) {
        throw ERROR.DEFAULT;
      }
      let tokenResult = await commonController.saveToken(Models.admins,
        { _id: checkAdmin._id }, accessToken)
      return tokenResult;
    } else {
      throw ERROR.DB_ERROR;
    }
  } catch (err) {
    throw err;
  }
};



let addEditHighlights = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      // icon: payloadData.icon,
      heading: payloadData.heading,
      description: payloadData.description,
    };

    if (payloadData._id) {
      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.highlights, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.highlights, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
}



let addEditCategory = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      image: payloadData.image,
      heading: payloadData.heading,
      description: payloadData.description,
      points: payloadData.points,
    };

    if (payloadData._id) {
      let query = { _id: payloadData._id };

      let updatedResult = await DAO.findOneUpdate(Models.category, query, data, { new: true });
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.category, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditCategory--", err);
    throw err;
  }
}


let addEditVisuals = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      categoryId: payloadData.categoryId,
      image: payloadData.image,
      heading: payloadData.heading,
      description: payloadData.description,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.catgeoryTopics, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.catgeoryTopics, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
};



let catgeoryHighlights = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      categoryTopicsId: payloadData.categoryTopicsId,
      // icon: payloadData.icon,
      heading: payloadData.heading,
      description: payloadData.description,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.CategoryHighlights, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.CategoryHighlights, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("-try err addEditVisuals--", err);
    throw err;
  }
};


// ---------------


let WhatsInsideIt = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      categoryTopicsId: payloadData.categoryTopicsId,
      heading: payloadData.heading,
      description: payloadData.description,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.WhatsInsideIt, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.WhatsInsideIt, data);
      console.log("--reuslt--", result);
      return result;
    }
    return "whats inside it"
  } catch (err) {
    console.log("-try err addEditVisuals--", err);
    throw err;
  }
};




let review = async (payloadData) => {
  try {

    let data = {
      _id: payloadData._id,
      star: payloadData.star,
      review: payloadData.review,
      name: payloadData.name,
      universityName: payloadData.universityName,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.review, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.review, data);
      console.log("--reuslt--", result);
      return result;
    }

  } catch (err) {
    console.log('--try er--', err);
  }
}



let addEditAboutUs = async (payloadData) => {
  try {

    let data = {
      _id: payloadData._id,
      // icon: payloadData.icon,
      question: payloadData.question,
      answer: payloadData.answer,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.aboutus, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.aboutus, data);
      console.log("--reuslt--", result);
      return result;
    }


  } catch (err) {
    console.log('--try err---', err);
    throw err;
  }
}



let addEditBlogs = async (payloadData) => {
  try {

    let data = {
      _id: payloadData._id,
      image: payloadData.image,
      heading: payloadData.heading,
      description: payloadData.description,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.blog, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.blog, data);
      console.log("--reuslt--", result);
      return result;
    }


  } catch (err) {
    console.log('--try err---', err);
    throw err;
  }
}


let addEditBlogsVisual = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      image: payloadData.image,
      description: payloadData.description,
      heading: payloadData.heading,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.fewTopics, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.fewTopics, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
}


let contactUs = async (payloadData) => {
  try {
    let email = payloadData.email.toLowerCase();
    let data = {
      fullName: payloadData.fullName,
      email: email,
      message: payloadData.message,
      questionType: payloadData.questionType,
      number: payloadData.number
    }

    let result = await DAO.saveUserData(Models.contactus, data);
    console.log('--result--', result);
    return result;

  } catch (err) {
    console.log('--try err', err);
    throw err
  }
}


let Services = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      service1: payloadData.service1,
      service2: payloadData.service2,
      service3: payloadData.service3,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.Services, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.Services, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }

}


let Address = async (payloadData) => {
  try {
    let email = payloadData.email.toLowerCase();
    let data = {
      _id: payloadData._id,
      address: payloadData.address,
      number: payloadData.number,
      email: email,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.Address, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.Address, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
}

// ------ not Sure  --------

let SocialMedia = async (payloadData) => {
  try {
    let data = {
      _id: payloadData._id,
      facebookIcon: payloadData.facebookIcon,
      instagram: payloadData.instagram,
      linkedIn: payloadData.linkedIn,
      twitter: payloadData.twitter,
    };

    if (payloadData._id) {

      let query = { _id: payloadData._id };
      let updatedResult = await DAO.findOneUpdate(Models.SocialMedia, query, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.SocialMedia, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
}



let TermsConditions = async (payloadData) => {
  try {
    let data = {
      termsConditions: payloadData.termsConditions,
    };

    let getData = await DAO.get_OneData(Models.TermsConditions, {}, { __v: 0 }, { lean: true });
    console.log('----getData-----', getData);

    if (getData) {

      let updatedResult = await DAO.findOneUpdate(Models.TermsConditions, {}, data, { new: true })
      // console.log('--updateResult---',updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.TermsConditions, data);
      // console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
}


let PrivacyPolicy = async (payloadData) => {
  try {
    let data = {
      privacyPolicy: payloadData.privacyPolicy,
    };

    let getData = await DAO.get_OneData(Models.PrivacyPolicy, {}, { __v: 0 }, { lean: true });
    console.log('----getData-----', getData);

    if (getData) {

      let updatedResult = await DAO.findOneUpdate(Models.PrivacyPolicy, {}, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.PrivacyPolicy, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
}



let ReturnPolicy = async (payloadData) => {
  try {
    let data = {
      returnPolicy: payloadData.returnPolicy,
    };

    let getData = await DAO.get_OneData(Models.ReturnPolicy, {}, { __v: 0 }, { lean: true });
    console.log('----getData-----', getData);

    if (getData) {

      let updatedResult = await DAO.findOneUpdate(Models.ReturnPolicy, {}, data, { new: true })
      console.log('--updateResult---', updatedResult);
      return updatedResult;
    } else {
      let result = await DAO.saveUserData(Models.ReturnPolicy, data);
      console.log("--reuslt--", result);
      return result;
    }
  } catch (err) {
    console.log("try err addEditVisuals", err);
    throw err;
  }
}


let getHighlights = async () => {
  try {
    let data = await DAO.get_Data(Models.highlights, {}, { __v: 0 }, { lean: true });
    console.log('---getHighlights---', data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getCategories = async () => {
  try {
    let data = await DAO.get_Data(Models.category, {}, { __v: 0 }, { lean: true });
    console.log('--getCategories data---', data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



let getCatgeoryVisual = async () => {
  try {
    let data = await DAO.get_Data(Models.categoryVisual, {}, { __v: 0 }, { lean: true });
    console.log('--getCatgeoryVisual data---', data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



let getReview = async () => {
  try {
    let data = await DAO.get_Data(Models.review, {}, { __v: 0 }, { lean: true });
    // console.log('---getReview data---',data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



let getAboutUs = async () => {
  try {
    let data = await DAO.get_Data(Models.aboutus, {}, { __v: 0 }, { lean: true });
    // console.log('--get AboutUs data---',data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



let getBlogs = async () => {
  try {
    let data = await DAO.get_Data(Models.blog, {}, { __v: 0 }, { lean: true });
    // console.log('--get Blogs data---',data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getBlogsVisual = async () => {
  try {
    let data = await DAO.get_Data(Models.blogsVisual, {}, { __v: 0 }, { lean: true });
    // console.log("--get Blog's Visual data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getContactUs = async () => {
  try {
    let data = await DAO.get_Data(Models.contactus, {}, { __v: 0 }, { lean: true });
    // console.log("--getContactUs data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getServices = async () => {
  try {
    let data = await DAO.get_Data(Models.Services, {}, { __v: 0 }, { lean: true });
    // console.log("-- getServices data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getAddress = async () => {
  try {
    let data = await DAO.get_Data(Models.Address, {}, { __v: 0 }, { lean: true });
    // console.log("--getAddress data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getSocialMedia = async () => {
  try {
    let data = await DAO.get_Data(Models.SocialMedia, {}, { __v: 0 }, { lean: true });
    // console.log("--getSocialMedia data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getTermsConditions = async () => {
  try {
    let data = await DAO.get_Data(Models.TermsConditions, {}, { __v: 0 }, { lean: true });
    // console.log("--getTermsConditions data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getPrivacyPolicy = async () => {
  try {
    let data = await DAO.get_Data(Models.PrivacyPolicy, {}, { __v: 0 }, { lean: true });
    // console.log("--getPrivacyPolicy data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let getReturnPolicy = async () => {
  try {
    let data = await DAO.get_Data(Models.ReturnPolicy, {}, { __v: 0 }, { lean: true });
    // console.log("--getReturn Policy data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


// -------  DELETE METHODS--------


let deleteHighlights = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.highlights, query, condition, options);
    // console.log("--deleteHighlights data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deleteCategories = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.category, query, condition, options);
    // console.log("--deleteCategories data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deleteCatgeoryVisual = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.categoryVisual, query, condition, options);
    // console.log("--deleteCatgeoryVisual data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



let deleteReview = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.review, query, condition, options);
    // console.log("--deleteReview data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



let deleteAboutUs = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.aboutus, query, condition, options);
    // console.log("--deleteAboutUs data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deleteBlogs = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.blog, query, condition, options);
    // console.log("--deleteBlogs data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deleteBlogsVisual = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.fewTopics, query, condition, options);
    // console.log("--deleteBlogsVisual data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



let querySolved = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true, isSolved: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.contactus, query, condition, options);
    // console.log("--deleteBlogsVisual data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deleteServices = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true, isSolved: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.Services, query, condition, options);
    // console.log("--deleteServices data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deleteTermsConditions = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true, isSolved: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.TermsConditions, query, condition, options);
    // console.log("--deleteTermsConditions data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deletePrivacyPolicy = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true, isSolved: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.PrivacyPolicy, query, condition, options);
    // console.log("--deleteTermsConditions data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}


let deleteReturnPolicy = async (payloadData) => {
  try {
    let query = { _id: payloadData._id };
    let condition = { isDeleted: true, isSolved: true };
    let options = { new: true };
    let data = await DAO.deleteOneUser(Models.ReturnPolicy, query, condition, options);
    // console.log("--deleteReturnPolicy data---",data);
    return data;
  } catch (err) {
    console.log('--err--', err);
    throw err;
  }
}



//  --------  deletion over here  ---------








module.exports = {
  adminSignIn: adminSignIn,
  adminLogIn: adminLogIn,
  addEditHighlights: addEditHighlights,
  addEditCategory: addEditCategory,
  addEditVisuals: addEditVisuals,
  review: review,
  addEditAboutUs: addEditAboutUs,
  addEditBlogs: addEditBlogs,
  addEditBlogsVisual: addEditBlogsVisual,
  contactUs: contactUs,
  Services: Services,
  Address: Address,
  SocialMedia: SocialMedia,
  TermsConditions: TermsConditions,
  PrivacyPolicy: PrivacyPolicy,
  ReturnPolicy: ReturnPolicy,
  getHighlights: getHighlights,
  getCategories: getCategories,
  getCatgeoryVisual: getCatgeoryVisual,
  getReview: getReview,
  getAboutUs: getAboutUs,
  getBlogs: getBlogs,
  getBlogsVisual: getBlogsVisual,
  getContactUs: getContactUs,
  getServices: getServices,
  getAddress: getAddress,
  getSocialMedia: getSocialMedia,
  getTermsConditions: getTermsConditions,
  getPrivacyPolicy: getPrivacyPolicy,
  getReturnPolicy: getReturnPolicy,
  deleteHighlights: deleteHighlights,
  deleteCategories: deleteCategories,
  deleteCatgeoryVisual: deleteCatgeoryVisual,
  deleteReview: deleteReview,
  deleteAboutUs: deleteAboutUs,
  deleteBlogs: deleteBlogs,
  deleteBlogsVisual: deleteBlogsVisual,
  querySolved: querySolved,
  deleteServices: deleteServices,
  deleteTermsConditions: deleteTermsConditions,
  deletePrivacyPolicy: deletePrivacyPolicy,
  deleteReturnPolicy: deleteReturnPolicy,
  WhatsInsideIt: WhatsInsideIt,



};

