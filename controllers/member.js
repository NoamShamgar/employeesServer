const {  getAllMembers_DAL,getMemberById_DAL,getMemberSubscription_DAL,addMember_DAL,updateMember_DAL,deleteMember_DAL} = require("../DAL/membersWS")
const lookForAuthorization = require("../auth/authorization")

// sending req to the subs api after the auth passed
const getAllMembers = async (permissions) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-sub")) {
                reject("access denied")
            } else {
                resolve((await getAllMembers_DAL()).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const getMemberById = async (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-sub")) {
                reject("access denied")
            } else {
                resolve((await getMemberById_DAL(id)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const getMemberSubscription = async (permissions,memberId) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-sub")) {
                reject("access denied")
            } else {
                resolve((await getMemberSubscription_DAL(memberId)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const addMember = async (permissions,obj) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"add-sub")) {
                reject("access denied")
            } else {
                resolve((await addMember_DAL(obj)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const updateMember = async (permissions,id,obj) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"upt-sub")) {
                reject("access denied")
            } else {
                resolve((await updateMember_DAL(id,obj)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const deleteMember = async (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"del-sub")) {
                reject("access denied")
            } else {
                resolve((await deleteMember_DAL(id)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

module.exports = {  getAllMembers,
    getMemberById,
    getMemberSubscription,
    addMember,
    updateMember,
    deleteMember
}
