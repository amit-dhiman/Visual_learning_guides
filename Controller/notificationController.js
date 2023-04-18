
const DAO = require("../DAOManager").queries;
const moment = require('moment');
const Config = require("../Config");
const Models = require("../Models");
const NotificationsManager = require("../Libs/NotificationsManager");
// 
// GET USER TOKEN
// 
const get_user_token = async(userId) => {
      try {

            let device_token = null
            let query = { _id : userId ,deviceToken : {$ne : null}}
            let get_user_token = await DAO.getData(Models.users, query, {deviceToken :1}, {lean : true})
            if(get_user_token.length) {  device_token = get_user_token[0].deviceToken }
            return device_token

      }
      catch(err) {
            throw err;
      }
}

// 
// BOOKING NOTIFICATIONS -- CHILD BOOKED PRODUCT  --> PARENTS  GETS NOTIFIED
// 
const book_order_product = async(function_data) => {
      try {

            let date = new Date(Date.now()).getTime()
           
            console.log("---------------------------function_data---",function_data)

            // get hospital device token
            let user_token = await get_user_token(function_data.userId)

            let default_title = "New Order Notification"

            if(user_token != null && user_token != undefined) {

                  let saveData = {
                        title : default_title,
                        senderId : function_data.senderId,
                        recieverId : function_data.recieverId,
                        charityId : function_data.charityId,
                        message : function_data.message,
                        orderId : function_data.orderId,
                        type : "ORDER_STATUS",
                        time : date
                  }

                  let saveNotifications = await DAO.saveData(Models.notifications, saveData)
                  let sendNotification = await NotificationsManager.sendNotification(Data, user_token)
            }
      }
      catch(err) {
            throw err;
      }
}


// TASK NOTIFICATIONS --PARENT ADD TASK  --> SEND NOTIFICATION TO CHILDS
// 
const task_added = async(function_data) => {
      try {
            let date = new Date(Date.now()).getTime()


            console.log("---------------------------function_data---",function_data)
            // get child device  token
            let user_token = await get_user_token(function_data.recieverId)

            let default_title = "New Task Added Notification"

            if(user_token != null && user_token != undefined) {

                  let saveData = {
                        title : default_title,
                        message : function_data.message,
                        taskId : function_data.taskId,
                        senderId : function_data.senderId,
                        recieverId : function_data.recieverId,
                        type :function_data.type,
                        isRead : false,
                        time : date
                  }

                  let saveNotifications = await DAO.saveData(Models.notifications, saveData)
                  let sendNotification = await NotificationsManager.sendNotification(saveData, user_token)
            }
      }
      catch(err) {
            throw err;
      }
}
// 
// TASK NOTIFICATIONS --PARENT DELETE TASK  --> SEND NOTIFICATION TO CHILDS
// 
const task_delete = async(function_data) => {
      try {
            let date = new Date(Date.now()).getTime()

            console.log("---------------------------function_data---",function_data)

            // get child device  token
            let user_token = await get_user_token(function_data.recieverId)

            let default_title = " Task Delete Notification"

            if(user_token != null && user_token != undefined) {

                  let saveData = {
                        title : default_title,
                        message : function_data.message,
                        taskId : function_data.taskId,
                        senderId : function_data.senderId,
                        charityId : function_data.charityId,
                        recieverId : function_data.recieverId,
                        type :function_data.type,
                        isRead : false,
                        time : date
                  }

                  let saveNotifications = await DAO.saveData(Models.notifications, saveData)
                  let sendNotification = await NotificationsManager.sendNotification(saveData, user_token)
            }
      }
      catch(err) {
            throw err;
      }
}
// 
// TASK NOTIFICATIONS --CHILD CHANGE  TASK STATUS  --> SEND NOTIFICATION TO PARENT
// 
const change_task_status = async(function_data) => {
      try {

            let date = new Date(Date.now()).getTime()

            console.log("---------------------------function_data---",function_data)

            // get child device  token
            let user_token = await get_user_token(function_data.recieverId)

            let default_title = "Task Status Notification"

            console.log("......user_token....",user_token)
            if(user_token != null && user_token != undefined) {

                  let saveData = {
                        title : default_title,
                        message : function_data.message,
                        taskId : function_data.taskId,
                        senderId : function_data.senderId,
                        recieverId : function_data.recieverId,
                        type :function_data.type,
                        isRead : false,
                        time : date
                  }

                  let saveNotifications = await DAO.saveData(Models.notifications, saveData)
                  let sendNotification = await NotificationsManager.sendNotification(saveData, user_token)
            }
      }
      catch(err) {
            throw err;
      }
}

const send_reward_request = async(function_data) => {
      try {
            let date = new Date(Date.now()).getTime()


            console.log("---------------------------function_data---",function_data)

            // get child device  token
            let user_token = await get_user_token(function_data.recieverId)

            let default_title = "Ask for Reward"

            console.log("....Ask for Reward..user_token....",user_token)
            if(user_token != null && user_token != undefined) {

                  let saveData = {
                        title : default_title,
                        message : function_data.message,
                        taskId : function_data.taskId,
                        senderId : function_data.senderId,
                        recieverId : function_data.recieverId,
                        type :function_data.type,
                        isRead : false,
                        time : date
                  }

                  let saveNotifications = await DAO.saveData(Models.notifications, saveData)
                  let sendNotification = await NotificationsManager.sendNotification(saveData, user_token)
            }
      }
      catch(err) {
            throw err;
      }
}

// 
// ORDER DELIVERDED OR ACCEPTED OR CANCELED BY  PUSH TO PARENT 
// 
const order_status_to_parent = async(function_data) => {
      try {

            let date = new Date(Date.now()).getTime()

            // get user device token
            let user_token = await get_user_token(function_data.userId)
            console.log("----------------------------user_token--",user_token)

            let message = "new notification received"
            let notificationType = " "

            if(function_data.order_status == "Confirmed" ) {
                  console.log("-------------------------------case1")
                  message = "Your child order " + function_data.userName + " has been confirmed at " + function_data.time ;
                  notificationType = "Order Confirmed"
            }
            if(function_data.order_status == "Canceled") {
                  console.log("-------------------------------case2")
                  message = "Your child order " + function_data.userName + " has been canceled at " + function_data.time 
                  notificationType = "Order Canceled"
            }
            if(function_data.order_status == "Delivered") {
                  console.log("-------------------------------case3")
                  message = "Your child order " + function_data.userName + " has been delivered at " + function_data.time 
                  notificationType = "Order Delivered"
            }

            console.log("------------------------------------message",message)

            let default_title = "New Order Notification"

            if(user_token != null && user_token != undefined) {

                  let saveData = {
                        title : default_title,
                        message : message,
                        senderId : function_data.senderId,
                        charityId : function_data.charityId,
                        recieverId : function_data.recieverId,
                        type : notificationType,
                        isRead : false,
                        time : date
                  }

                  let saveNotifications = await DAO.saveData(Models.notifications, saveData)
    
                  let Data = {};
                  Data.title = default_title;
                  Data.message = message;
                  Data.pushType = notificationType;
                  Data.senderId = function_data.senderId;
                  Data.recieverId = function_data.recieverId;
                  Data.createdAt =  date
    
                  let sendNotification = await NotificationsManager.sendNotification(Data, user_token)
            }
      }
      catch(err) {
            throw err;
      }
}

// 
// CHANGE STATUS  TASK  START  OR CANCELED OR COMPLETED BY  PUSH TO USER
// 
const task_status_push = async(function_data) => {
      try {

            let date = new Date(Date.now()).getTime()
        

            // get user device token
            let user_token = await get_user_token(function_data.recieverId)
            console.log("----------------------------user_token--",user_token)

            let message = "New notification Received"

            if(function_data.status == "Confirmed" ) {
                  console.log("-------------------------------case1")
                  message = "Your child order has been confirmed at " + function_data.time ;
                
            }
            if(function_data.status == "Transit" ) {
                  console.log("-------------------------------case1")
                  message = "Your child order has been Transit at " + function_data.time ;
                
            }
            if(function_data.status == "Canceled") {
                  console.log("-------------------------------case2")
                  message = "Your child order has been canceled at " + function_data.time 
                 
            }
            if(function_data.status == "Delivered") {
                  console.log("-------------------------------case3")
                  message = "Your child order has been delivered at " + function_data.time 
                 
            }

            console.log("------------------------------------message",message)

            let default_title = "New Order Notification"

            if(user_token != null && user_token != undefined) {

                  let Data = {
                        title : default_title,
                        senderId : function_data.senderId,
                        recieverId : function_data.recieverId,
                        charityId : function_data.charityId,
                        message : message,
                        orderId : function_data.orderId,
                        type : "ORDER_STATUS",
                        time : date
                  }
                  await DAO.saveData(Models.notifications, Data)
                  await NotificationsManager.sendNotification(Data, user_token)

            }

      }
      catch(err) {
            throw err;
      }
}

// 
// CHANGE STATUS  TASK  START  OR CANCELED OR COMPLETED BY  PUSH TO USER
// 
const order_product_request_to_partent  = async(function_data) => {
      try {
            let date = new Date(Date.now()).getTime()
            
            // get user device token
            let user_token = await get_user_token(function_data.recieverId)
            console.log("----------------------------user_token--",user_token)

            let message = function_data.name + " Set you a payment request " ;
            let title = "New Order Payment Notification"

            if(user_token != null && user_token != undefined) {

                  let Data = {
                        title : title,
                        message : message,
                        senderId : function_data.senderId,
                        recieverId : function_data.recieverId,
                        charityId : function_data.charityId,
                        orderId : function_data.orderId,
                        type : "PAYMENT_REQUEST",
                        status : "PAYMENT_ORDER",
                        time : date
                  }

                  await DAO.saveData(Models.notifications, Data)
                  await NotificationsManager.sendNotification(Data, user_token)

            }
      }
      catch(err) {
            throw err;
      }
}
// 
// CHANGE STATUS  TASK  START  OR CANCELED OR COMPLETED BY  PUSH TO USER
// 
const order_charitiy_request_to_partent  = async(function_data) => {
      try {
            let date = new Date(Date.now()).getTime()

            // get user device token
            let user_token = await get_user_token(function_data.recieverId)
            console.log("user_token si here -",user_token)

            let message = function_data.name + " Set you a payment request " ;
            let title = "New Charity To Donate Payment Notification"


            if(user_token != null && user_token != undefined) {

                  let Data = {
                        title : title,
                        message : message,
                        senderId : function_data.senderId,
                        recieverId : function_data.recieverId,
                        orderId : function_data.orderId,
                        charityId : function_data.charityId,
                        donate_price : function_data.donate_price,
                        type : "PAYMENT_REQUEST",
                        status : "PAYMENT_CHARITY",
                        time : date
                  }
                  let saveNotifications = await DAO.saveData(Models.notifications,Data) ;
                  console.log('saveNotifications is here',saveNotifications) ;
                  let sendNotifications = await NotificationsManager.sendNotification(Data,user_token);
                  console.log('sendNotifications is here',sendNotifications) ;
            }
      }
      catch(err) {
            throw err;
      }
}

module.exports = {
      ////////////////////////////////////
      book_order_product : book_order_product,
      order_status_to_parent : order_status_to_parent,
      task_status_push : task_status_push,  
      task_added : task_added,
      change_task_status :change_task_status,
      task_delete :task_delete,
      order_charitiy_request_to_partent : order_charitiy_request_to_partent,
      order_product_request_to_partent : order_product_request_to_partent,
      send_reward_request : send_reward_request

}