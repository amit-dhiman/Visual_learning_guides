//CREATED BY ABHISHEK DHADWAL
const DAO = require("../DAOManager").queries,
  Config = require("../Config"),
  TokenManager = require("../Libs/tokenManager"),
  NotificationsManager = require("../Libs/NotificationsManager"),
  ERROR = Config.responseMessages.ERROR,
  Models = require("../Models"),
  bcrypt = require("bcryptjs"),
  UploadMultipart = require("../Libs/UploadMultipart"),
  aws = require("../Config/awsS3Config"),
  AWS = require("aws-sdk"),
  fs = require("fs"),
  moment = require("moment"),
  randomstring = require("randomstring"),
  UniversalFunctions = require("../Utils/UniversalFunctions"),
  winston = require("winston");

let libsMail = require("../Libs/sendMail");

const imageUpload = async (payloadData) => {
  try {
    return new Promise(function (resolve, reject) {
      UploadMultipart.uploadFilesOnS3(payloadData.file, (err, imageUpload) => {
        if (err) {
          console.log("-----------------------err", err);
          reject(err);
        } else {
          resolve(imageUpload);
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

const generate_token = async (token_info) => {
  try {
    let token_data = {
      _id: token_info._id,
      scope: token_info.scope,
    };
    let gen_token = await TokenManager.generateToken(
      token_data,
      token_info.scope
    );

    if (gen_token == null) {
      throw ERROR.SOMETHING_WENT_WRONG;
    } else {
      // update token in db
      let query = { _id: token_info._id };
      let update = {
        accessToken: gen_token,
        isOnline: true,
      };
      if (token_info.deviceToken) {
        update.deviceToken = token_info.deviceToken;
      }
      if (token_info.deviceType) {
        update.deviceType = token_info.deviceType;
      }
      let options = { new: true };
      let data_to_update = await DAO.findAndUpdate(
        token_info.collection,
        query,
        update,
        options
      );
      return data_to_update;
    }
  } catch (err) {
    throw err;
  }
};

const check_productId = async (productId) => {
  try {
    let query = { _id: productId };
    let projection = { _id: 1 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.products,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_productId_carts = async (userId, productId) => {
  try {
    let query = { userId: userId, "products.id": productId, isDeleted: false };
    let projection = { _id: 1 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.carts,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_tutorials_id = async (Id) => {
  try {
    let query = { _id: Id };
    let projection = { __v: 0 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.tutorials,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_user_email = async (email) => {
  try {
    let query = { email: email, isDeleted: false };
    let projection = { __v: 0 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.users,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_social_key = async (socialKey) => {
  try {
    let query = { socialKey: socialKey, isDeleted: false };
    let projection = { __v: 0 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.users,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_stripe_id = async (id) => {
  try {
    let query = { _id: id };
    let projection = { _id: 1 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.stripCredentials,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_email = async (email) => {
  try {
    let query = { email: email, isDeleted: false };
    let projection = { _id: 1 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.artsDetails,
      query,
      projection,
      options
    );

    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_user_name = async (userid) => {
  try {
    let query = { _id: userid, isDeleted: false };
    let projection = { __V: 0 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.users,
      query,
      projection,
      options
    );
    return { name: fetch_data[0].fullName };
  } catch (err) {
    throw err;
  }
};

const policy_terms_condtions = async () => {
  try {
    let query = {
      isDeleted: false,
    };
    let projection = { _id: 0, policy: 1, termsCondition: 1 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.policyTermConditions,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const check_user_phone_no = async (countryCode, mobileNumber) => {
  try {
    let query = {
      countryCode: countryCode,
      mobileNumber: mobileNumber,
      isDeleted: false,
    };
    let projection = { __v: 0 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.users,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const push_notification_status = async (deviceToken, data) => {
  try {
    //###-----push notification -------
    let push_notification = await NotificationsManager.sendNotification(
      deviceToken,
      data
    );
    console.log("push notification ", push_notification);
  } catch (err) {
    throw err;
  }
};

const save_notification = async (ids, data) => {
  try {
    //###----------current time -------
    time = new Date(Date.now()).getTime();
    let setData = {
      time: time,
      recieverId: ids.recieverId,
      senderId: ids.senderId,
      message: data.message,
      title: data.title,
      type: data.type,
    };
    let fetch_data = await DAO.saveData(Models.notifications, setData);
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const send_mail = async () => {
  try {
    let startDate = formatYmd(new Date());
    let endDate = formatYmd(new Date());

    let query = {};
    let projection = { __v: 0 };
    let options = { lean: true };
    let get_mails = await DAO.getData(
      Models.sendMails,
      query,
      projection,
      options
    );

    for (let i = 0; i < get_mails.length; i++) {
      if (get_mails[i].to.length != 0) {
        let id = userData._id;
        let link =
          "http://54.177.127.102:8003/Admin/orderListing?startDate=" +
          startDate +
          "$endDate=" +
          endDate;
        let html = "<h4> please check new order are recieved </h4>";
        html = "If you want to see order, click the following link : <a href=";
        html += link;
        html += "> The Gleek Team  </a>";

        let sendMail = {
          to: get_mails[i].to[i],
          bcc: get_mails[i].bcc[i],
          cc: get_mails[i].cc[i],
          subject: "New Order Recived",
          content: html,
        };
        let sendData = await NotificationsManager.sendMails(sendMail);
      }
    }
  } catch (err) {
    throw err;
  }
};

const send_mail_to_parent = async (mail, name, childName, password) => {
  try {
    let html = "<h4> Dear </h4>" + name;
    html = "<p> You have add " + mail + " this child in DEBICAN ";
    html = "this mail provide you password of your child " + childName;
    html = "do not share " + password + " this password no any one ";
    html =
      "do not reply to this mail this is only to provide you confidentional information </p>";
    html += "<h5> The Debican Team </h5>";

    let sendMail = {
      to: mail,
      subject: "New Child Added",
      content: html,
    };
    let sendData = await NotificationsManager.sendMail(sendMail);
  } catch (err) {
    throw err;
  }
};

const get_user_device_token = async (userId) => {
  try {
    let query = {
      _id: userId,
      isDeleted: false,
      deviceToken: { $ne: null },
      notificationActive: true,
    };
    let projection = { _id: 1, deviceToken: 1, language: 1 };
    let options = { lean: true };
    let fetch_token = await DAO.getData(
      Models.users,
      query,
      projection,
      options
    );
    return (token = fetch_token);
  } catch (err) {
    throw err;
  }
};

const get_product = async (productId) => {
  try {
    let query = { _id: productId };
    let projection = { __v: 0 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(
      Models.products,
      query,
      projection,
      options
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const get_card_info = async (cardId) => {
  try {
    let query = { isDeleted: false, _id: cardId };
    let options = { lean: true };
    let projections = { __V: 0 };
    let listCard = await DAO.getData(Models.cards, query, projections, options);
    return listCard;
  } catch (err) {
    throw err;
  }
};

const get_my_child = async (userId) => {
  try {
    let query = { userId: userId, isDeleted: false };
    let projections = { __V: 0 };
    let options = { lean: true };
    let listChild = await DAO.getData(
      Models.myChilds,
      query,
      projections,
      options
    );
    return listChild;
  } catch (err) {
    throw err;
  }
};

const get_my_tasks = async (taskId, userId, status) => {
  try {
    let query = {
      _id: taskId,
      performedBy: userId,
      status: status,
      isDeleted: false,
    };
    let projections = { __V: 0 };
    let options = { lean: true };
    let populate = [
      {
        path: "userId",
        select: "_id userName profilePicture iso2Code countryCode mobileNumber",
      },
      {
        path: "performedBy",
        select: "_id userName profilePicture iso2Code countryCode mobileNumber",
      },
      {
        path: "childId",
        select: "_id userName profilePicture iso2Code countryCode mobileNumber",
      },
    ];
    let listTask = await DAO.populateData(
      Models.tasks,
      query,
      projections,
      options,
      populate
    );
    return listTask;
  } catch (err) {
    throw err;
  }
};

const update_task_status = async (taskId, userId, status) => {
  try {
    let query = { _id: taskId, isDeleted: false };
    let update = {
      status: status,
      performedBy: userId,
      date: +new Date(),
    };
    let options = { new: true };
    let updateTasks = await DAO.findAndUpdate(
      Models.tasks,
      query,
      update,
      options
    );
    return updateTasks;
  } catch (err) {
    throw err;
  }
};

const get_current_date = async (date) => {
  try {
    let cuurent_date = new Date(date).getTime();

    let today = new Date().setHours(05, 30, 0, 0);
    let newDate = new Date(cuurent_date).setHours(05, 30, 0, 0);
    let todayDate = new Date(today).getTime();

    return {
      taskDate: newDate,
      currentDate: todayDate,
    };
  } catch (err) {
    throw err;
  }
};

const get_parent = async (userId) => {
  try {
    let query = { childId: userId, isDeleted: false };
    let get_data = await DAO.getData(
      Models.myChilds,
      query,
      { __v: 0 },
      { lean: true }
    );
    if (get_data.length != 0) {
      return get_data[0].userId;
    }
  } catch (err) {
    throw err;
  }
};

const get_profile_data = async (uni) => {
  try {
    let query = {
      universities: { $in: uni },
      isDeleted: false,
    };
    let get_data = await DAO.getData(
      Models.appDatas,
      query,
      { __v: 0 },
      { lean: true }
    );
    return get_data;
  } catch (err) {
    throw err;
  }
};

const sutract_pigy_bank_amount = async (user_data, amount) => {
  try {
    let query = {
      _id: user_data._id,
    };
    let update = { pigyBankBalance: amount };
    let option = { new: true };
    let fetch_data = await DAO.findAndUpdate(
      Models.users,
      query,
      update,
      option
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const add_amount_in_wallet = async (user_data, amount) => {
  try {
    let query = {
      _id: user_data._id,
    };
    let update = { balance: amount };
    let option = { new: true };
    let fetch_data = await DAO.findAndUpdate(
      Models.users,
      query,
      update,
      option
    );
    return fetch_data;
  } catch (err) {
    throw err;
  }
};


//      ---------- new Functions ------------

let checkUser_Email = async (model,email) => {
  try {
    console.log("----checkuseremail---", email);
    let query = { email: email };
    console.log("---query---", query);
    let fetch = await DAO.get_Data(model, query);
    console.log(" -------fetch-------", fetch);
    return fetch;
  } catch (err) {
    return err;
  }
};

let checkOneUser_Email = async (model, email) => {
  try {
    console.log("----checkuseremail---", email);
    let fetch = await DAO.get_OneData(model, email);
    console.log(" -------fetch-------", fetch);
    return fetch;
  } catch (err) {
    return err;
  }
};

let generateToken = async (payload) => {
  try {
    let token_info = {
      _id: payload._id,
      scope: payload.scope,
    };
    console.log('--tokeninfo scope---',token_info.scope);

    let token = await TokenManager.generateAuthToken(token_info, token_info.scope);
    return token;
  } catch (err) {
    return err;
  }
};

let compPassword = async (password, dbPassword) => {
  try {
    return bcrypt.compare(password, dbPassword);
  } catch (err) {
    return err;
  }
};

let generateOtp = async (email) => {
  try {
    let randomOtp = Math.round(Math.random() * 100000);
    let a = libsMail.sendOtpMail(randomOtp, email);
    return randomOtp;
  } catch (err) {
    return err;
  }
};

let verifyOtp = async (model, query) => {
  try {
    console.log("----query ---", query);
    let update = await model.findOneAndUpdate(
      query,
      { isVerified: true },
      { new: true }
    );
    console.log("--- update ---", update);
    return update;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

async function resendOtp(model, query, otp) {
  try {
    console.log("----query ---", query);
    let update = await model.findOneAndUpdate(query,{ otp: otp },{ new: true });
    console.log("--- update ---", update);
    return update;
  } catch (err) {
    console.log("err", err);
    return err;
  }
}

async function saveToken(model, query,token){
  let condition = {accessToken: token};
  let inSaveToken = await DAO.findOneUpdate(model,query,condition);
  console.log("---inSaveToken---",inSaveToken); 
  return inSaveToken;
}

async function updateData(model,query,payloadData){
  let condition = {
    firstName: payloadData.firstName,
    lastName: payloadData.lastName,
    mobileNumber: payloadData.mobileNumber,
    userType: payloadData.userType,
    image: payloadData.image
};

  let update = await DAO.findOneUpdate(model,query,condition);
  // console.log('---common ctrl update---',update);
  return update;
}

async function updateCountryData(model,payloadData){
  let query= {_id:payloadData._id};
  let condition = {country: payloadData.country};
  let updateC = await DAO.findOneUpdate(model,query,condition);
  // console.log('---updateCommonCtrl---',updateC);
  return updateC;
}

async function updateStateData(model,payloadData){
  let query= {_id:payloadData._id};
  let condition = {state: payloadData.state};
  let updateC = await DAO.findOneUpdate(model,query,condition);
  // console.log('---updateCommonCtrl---',updateC);
  return updateC;
}

let checkOneUser_Data = async (model, email) => {
  try {
    console.log("----checkuseremail---", email);
    let fetch = await DAO.get_OneData(model, email);
    console.log(" -------fetch-------", fetch);
    return fetch;
  } catch (err) {
    return err;
  }
};

let findComp = async(model,query,lim,skp)=>{
  try {
    let findcomp = await DAO.get_limit_Data(model,query,lim,skp)
    return findcomp;
  } catch (err) {
    console.log("--err--",err);
  }
}

// const adminLogin = async (paylaodData) => {
//   try {
//     let checkAdmin = await DAO.getData(Models.admins,{email: paylaodData.email},
//       {},{ lean: true }
//     );

//     if (!checkAdmin.length) {
//       throw ERROR.INVALID_OBJECT_ID;
//     }

//     if (!(checkAdmin[0].password == paylaodData.password)) {
//       throw ERROR.WRONG_PASSWORD;
//     }
//     //    console.log("=========== checkAdmin[0] =======",checkAdmin)

//     checkAdmin = checkAdmin[0];

//     console.log("----------- checkAdminid ------", checkAdmin._id);

//     if (checkAdmin._id) {
//       let tokenData = {
//         scope: Config.APP_CONSTANTS.SCOPE.ADMIN,
//         _id: checkAdmin._id,
//         time: +new Date(),
//       };

//       let accessToken = await TokenManager.generateToken(
//         tokenData,
//         Config.APP_CONSTANTS.SCOPE.ADMIN
//       );

//       if (accessToken == null) {
//         throw ERROR.DEFAULT;
//       }
//       let tokenResult = await DAO.findAndUpdate(
//         Models.admins,{ _id: checkAdmin._id },
//         {accessToken: accessToken,
//         time: tokenData.time,},{ new: true });

//       return tokenResult;
//     } else {
//       throw ERROR.DB_ERROR;
//     }
//   } catch (err) {
//     throw err;
//   }
// };

let findOrgvalues = async( allValues)=>{
  try {
      return allValues.reduce((finalVal, curr)=>{
      let obj = finalVal.find((item) => item.email == curr.email )
      console.log('--obj-- ',obj);
      if(obj){
        return finalVal
      }
      console.log('--final Val---',finalVal);
      return finalVal.concat([curr])
    },[]);

  } catch (err) {
    console.log("--err--",err);
    return err;
  }
}

let compSort = async(a,b)=>{
  return a-b;
}


let getMessages = async(payloadData,decoded_token)=>{
  try {
    let query = {$or:[{senderId: decoded_token._id, receiverId: payloadData.receiverId},{senderId: payloadData.receiverId, receiverId: decoded_token._id}]}
    let sort = {time: 1};
    let option = {new: true};
    
    let updateQuery = {senderId:payloadData.receiverId, receiverId:decoded_token._id};

    let condition = { isDelivered:true, isSeen: true}

    let updateDelSeen = await DAO.update_Many(Models.chat,updateQuery,condition,option);
    console.log('--updateDelSeen---',updateDelSeen);

    let lastMsg = await DAO.update_Many(Models.Lastchat,updateQuery,condition,option);
    console.log('--lastMsg---',lastMsg);

    
    let data = await DAO.get_sorted_Data(Models.chat,query,sort);
    console.log('--data---',data);

    return data;
  } catch (err) {
    console.log('--err--',err);
  }
}



let getLastMessage = async(payloadData,decoded_token)=>{
  try {
    let query = {$or:[{senderId: decoded_token._id, receiverId: payloadData.receiverId},{senderId: payloadData.receiverId, receiverId: decoded_token._id}]}
    let sort = {time: 1};
    let findLastmsg = await DAO.get_OneData(Models.Lastchat,query,{_v:0},{lean:true},sort);
    console.log("---findLastMsg---",findLastmsg);
    return findLastmsg
  } catch (error) {
    console.log('--try last msg err',error);
    throw error
  }
}

let updateLastMsg = async(payloadData,decoded_token,data)=>{
  try {
    let query = {$or:[{senderId: decoded_token._id, receiverId: payloadData.receiverId},{senderId: payloadData.receiverId, receiverId: decoded_token._id}]}

    let updateLastMsg =await DAO.findOneUpdate(Models.Lastchat,query,data);

    console.log('---updateLastMsg---',updateLastMsg);
    return updateLastMsg;
  } catch (err) {
    console.log('--try-err---',err);
    throw err
  }
}







module.exports = {
  checkUser_Email: checkUser_Email,
  generateToken: generateToken,
  generateOtp: generateOtp,
  checkOneUser_Email: checkOneUser_Email,
  compPassword: compPassword,
  saveToken : saveToken,
  updateData : updateData,
  updateCountryData : updateCountryData,
  updateStateData : updateStateData,
  checkOneUser_Data : checkOneUser_Data,
  findComp : findComp,
  findOrgvalues : findOrgvalues,
  getMessages : getMessages,
  compSort : compSort,
  getLastMessage : getLastMessage,
  updateLastMsg : updateLastMsg,

  imageUpload: imageUpload,
  check_email: check_email,
  check_user_phone_no: check_user_phone_no,
  check_user_email: check_user_email,
  generate_token: generate_token,
  check_tutorials_id: check_tutorials_id,
  check_stripe_id: check_stripe_id,
  get_user_device_token: get_user_device_token,
  policy_terms_condtions: policy_terms_condtions,
  save_notification: save_notification,
  check_productId: check_productId,
  get_product: get_product,
  push_notification_status: push_notification_status,
  check_productId_carts: check_productId_carts,
  get_card_info: get_card_info,
  check_user_name: check_user_name,
  send_mail: send_mail,
  check_social_key: check_social_key,
  get_my_child: get_my_child,
  update_task_status: update_task_status,
  get_my_tasks: get_my_tasks,
  get_current_date: get_current_date,
  send_mail_to_parent: send_mail_to_parent,
  get_parent: get_parent,
  get_profile_data: get_profile_data,
  sutract_pigy_bank_amount: sutract_pigy_bank_amount,
  add_amount_in_wallet: add_amount_in_wallet,
};

