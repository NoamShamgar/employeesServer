const {  getAllSubscriptions_DAL,getSubscriptionById_DAL,addSubscription_DAL,updateSubscription_DAL,deleteSubscription_DAL,addMovieToSubscription_DAL} = require("../DAL/SubscriptionsWS")
const lookForAuthorization = require("../auth/authorization")

// sending req to the subs api after the auth passed
const getAllSubscriptions = async (permissions) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-sub")) {
                reject("access denied")
            } else {
                resolve((await getAllSubscriptions_DAL()).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const getSubscriptionById = async (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-sub")) {
                reject("access denied")
            } else {
                resolve((await getSubscriptionById_DAL(id)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const addSubscription = async (permissions,obj) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"add-sub")) {
                reject("access denied")
            } else {
                resolve((await addSubscription_DAL(obj)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const updateSubscription = async (permissions,id,obj) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"upt-sub")) {
                reject("access denied")
            } else {
                resolve((await updateSubscription_DAL(id,obj)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const deleteSubscription = async (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"del-sub")) {
                reject("access denied")
            } else {
                resolve((await deleteSubscription_DAL(id)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const addMovieToSubscription = async (permissions,id,obj) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"add-sub")) {
                reject("access denied")
            } else {
                resolve((await addMovieToSubscription_DAL(id,obj)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

module.exports = {  getAllSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    addMovieToSubscription
}
