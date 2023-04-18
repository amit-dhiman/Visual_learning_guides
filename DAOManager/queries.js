
function saveData(model,data) {
    return new Promise((resolve, reject) => {
        try {
            let saveData = model.create(data);
            return resolve(saveData);
        } catch (err) {
            return reject(err);
        }
    });
}

function getDataUser(model, query, projection, options, pagenumber) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options).skip(pagenumber).limit(10).sort({createdAt:-1});
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}

function getDataLimit(model, query, projection, options, limit) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options).limit(limit).sort({createdAt:-1});
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}

function getDataAll(model, query, projection, options, pagenumber) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options).skip(pagenumber).limit(10).sort({createdAt:-1});
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}

function updateMany(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.updateMany(conditions, update, options);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function getPopulate(model, query, projection, options,collectionOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.find(query, projection, options).populate(collectionOptions).exec();
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}


function populateDataAdmin(model, query, projection, options, pageNumber,collectionOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.find(query, projection, options).limit(10).skip(pageNumber).populate(collectionOptions).exec();
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function populateDataUser1(model, query, projection, options,limit, pageNumber,collectionOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.find(query, projection, options).limit(limit).skip(pageNumber).populate(collectionOptions).exec();
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function populateDataUser(model, query, projection, options, pageNumber,collectionOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.find(query, projection, options).limit(10).skip(pageNumber).populate(collectionOptions).exec();
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}


function getDataPages(model,query,projection,option,pageNumber,limit) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query,projection,option).limit(limit).skip(pageNumber);
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}


function getCarts(model, query, projection, options) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options).sort({createdAt:-1});
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}


function get_count(model, query, projection, options) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options).estimatedDocumentCount().sort({createdAt:-1});
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}


function getData(model, query, projection, options) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options);
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}

function getDataNotification(model, query, projection, options, pagenumber) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options).skip(pagenumber).limit(10).sort({createdAt:-1});
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}

function populateDataNotification(model, query, projection, options, pagenumber,collectionOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.find(query, projection, options).skip(pagenumber).limit(10).sort({createdAt:-1}).populate(collectionOptions).exec();
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}



function getDataOne(model, query, projection, options) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.findOne(query, projection, options);
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}

function getUniqueData(model,keyName,query, options) {
    return new Promise((resolve, reject) => {
        try {
            let getUniqueData = model.distinct(keyName, query, options);
            return resolve(getUniqueData);
        } catch (err) {
            return reject(err);
        }
    });
}




function findAndUpdate(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.findOneAndUpdate(conditions, update, options);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function update(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.update(conditions, update, options);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function remove(model, condition) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.deleteMany(condition);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function remove1(model, condition) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.deleteOne(condition);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function populateData(model, query, projection, options, collectionOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.find(query, projection, options).sort({createdAt:-1}).populate(collectionOptions).exec();
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}




async function deepPopulateData(model, query, projection, options, collectionOptions,populateOptions) {

        try {
            let data = await model.find(query, projection, options).populate(collectionOptions).exec();
            // console.log("=======data===========",data[0].favourites)
            let populateData = await model.populate(data,populateOptions);
            return (populateData);
        }
        catch (err) {
            return err;
        }
}

function count(model, condition) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.estimatedDocumentCount(condition);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function  aggregatedata(model,group){
    return new Promise((resolve, reject) => {
        try {
            let getdata = model.aggregate(group);
            
            return resolve( getdata);
        } catch (err) {
            return reject(err);
        }
    });
}

function aggregateData(model, group,options) {
    return new Promise((resolve, reject) => {
        try {
            let data;

            if(options !==undefined){
                data = model.aggregate(group).option(options);
            }
            else{
                data = model.aggregate(group);
            }

            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function insert(model, data, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.collection.insert(data,options);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function insertMany(model, insert, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.collection.insertMany(insert,options);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

let bulkFindAndUpdate= (bulk,query,update,options)=> {
    bulk.find(query).upsert().update(update,options);
};

let bulkFindAndUpdateOne= (bulk,query,update,options)=> {
    bulk.find(query).upsert().updateOne(update,options);
};

async function aggregateDataWithPopulate(model, group, populateOptions,options) {
    try {
        let fetch_data 
        if(options !== undefined) {
            fetch_data = await model.aggregate(group).option(options);
        }else {
            fetch_data = await model.aggregate(group);
        }

        let populate_data = await model.populate(fetch_data, populateOptions);
        return (populate_data);
    } catch (err) {
        return err;
    }
}


function getDataProduct(model, query, projection, options) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options).sort({createdAt:-1});
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}



//          ------------- new functions  -----------


function securePassword(bcrypt,password ){
    return bcrypt.hash(password, 10);
}

async function compPassword(bcrypt, password ,dbPassword){
    try {
        // console.log("from compPassword queries");
        let result = await bcrypt.compare(password, dbPassword);
        console.log("---result ------",result);
        return result;
    } catch (err) {
        throw err
    }
}

function saveUserData(model, data){
    try {
        let result = model.create(data);
        return result;
    } catch (err) {
        throw err
    }
}

async function get_Data(model, query,projection,option) {
    try {
        let findData = await model.find(query,projection,option);
        return findData;
    } catch (err) {
        throw err;
    }
}

async function get_limit_Data(model, query,srt,lim,skp) {
    try {
        let findData = await model.find(query).sort(srt).limit(lim).skip(skp);
        return findData;
    } catch (err) {
        throw err;
    }
}

async function get_sorted_Data(model, query,srt) {
    try {
        let findData = await model.find(query).sort(srt);
        return findData;
    } catch (err) {
        return err;
    }
}

// async function get_lastMsg(model,query,srt,skp){
//     try {
//         let findData = await model.find(query).sort(srt).skip(skp);
//         console.log('--findData---',findData);
//         return findData
//     } catch (err) {
//         console.log('--err',err);
//         throw err
//     }
// }

async function get_OneData(model, query,projection,option) {
    try {
        console.log("--query--",query);
        let findData = await model.findOne(query,projection,option);
        console.log("---findData---",findData);
        return findData;
    } catch (err) {
        console.log("get_oneData err",err);
        return err;
    }
}


async function verifyOtp(model, query){
    try {
        console.log("----query ---",query);
        let update = await model.findOneAndUpdate(query, {isVerified: true}, {new: true});
        console.log("--- update ---", update);
        return update;
    } catch (err) {
        console.log("err",err);
        return err
    }
}
 
async function findOneUpdate(model, query,condition,options){
    try {
        // console.log("----query ---",query);
        // console.log("----condition ---",condition);
        let update = await model.findOneAndUpdate(query, condition, options);
        console.log("---quries update ---", update);
        return update;
    } catch (err) {
        console.log("err",err);
        return err
    }
}

async function update_Many(model,query,condition,option){
    try {
        let update = await model.updateMany(query,condition,option);
        console.log("--updated Docs---",update);
        return update;

    } catch (err) {
        console.log('--try err--',err);
        throw err
    }
}

async function aggregateWithlookup(model,lookup){
    try {
        let lookupD = await model.aggregate(lookup);
        // console.log("--lookup qureis--",lookupD);
        return lookupD;
    } catch (err) {
        console.log("try err",err);
        throw err
    }
}

async function deleteMessages(model,query){
    try {
        let deleteMsg = await model.deleteMany(query);
        return deleteMsg;
    } catch (err) {
        console.log("--try err--",err);
    }
}

async function deleteOneUser(model,query,condition,options){
    try {
        let deleteMsg = await model.updateOne(query,condition,options);
        return deleteMsg;
    } catch (err) {
        console.log("--try err--",err);
    }
}



module.exports = {
    saveUserData : saveUserData,
    securePassword : securePassword,
    get_Data : get_Data,
    get_OneData : get_OneData,
    compPassword : compPassword,
    verifyOtp : verifyOtp,
    findOneUpdate : findOneUpdate,
    aggregateWithlookup : aggregateWithlookup,
    get_limit_Data : get_limit_Data,
    // get_lastMsg : get_lastMsg,
    get_sorted_Data : get_sorted_Data,
    updateMany : updateMany,
    update_Many : update_Many,
    deleteMessages : deleteMessages,
    deleteOneUser : deleteOneUser,


    saveData : saveData,
    getData : getData,
    getDataOne : getDataOne,
    update : update,
    remove: remove,
    remove1: remove1,
    insert: insert,
    getDataUser:getDataUser,
    insertMany: insertMany,
    getDataPages : getDataPages,
    getUniqueData : getUniqueData,
    get_count:get_count,
    count: count,
    getDataProduct:getDataProduct,
    getCarts:getCarts,
    findAndUpdate : findAndUpdate,
    populateData : populateData,
    aggregatedata:aggregatedata,
    aggregateData : aggregateData,
    aggregateDataWithPopulate: aggregateDataWithPopulate,
    bulkFindAndUpdate : bulkFindAndUpdate,
    deepPopulateData:deepPopulateData,
    getPopulate :getPopulate,
    populateDataAdmin:populateDataAdmin,
    bulkFindAndUpdateOne : bulkFindAndUpdateOne,
    getDataNotification :getDataNotification,
    updateMany :updateMany,
    populateDataUser : populateDataUser,
    populateDataNotification : populateDataNotification,
    getDataAll : getDataAll,
    populateDataUser1 : populateDataUser1,
    getDataLimit : getDataLimit
 
};