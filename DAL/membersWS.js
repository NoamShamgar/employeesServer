const axios = require("axios");
const path = "https://cinema-subscriptions-server.herokuapp.com/members";

const getAllMembers_DAL = async () => {
    return await axios.get(path);
}

const getMemberById_DAL = async (id) => {
    return await axios.get(`${path}/${id}`);
}

const addMember_DAL = async (obj) => {
    return await axios.post(path,obj);
}

const updateMember_DAL = async (id,obj) => {
    return await axios.put(`${path}/${id}`,obj);
}

const deleteMember_DAL = async (id) => {
    return await axios.delete(`${path}/${id}`);
}

const getMemberSubscription_DAL = async (memberId) => {
    return await axios.get(`${path}/${memberId}/Subscription`);
}

module.exports = {  getAllMembers_DAL,
                    getMemberById_DAL,
                    getMemberSubscription_DAL,
                    addMember_DAL,
                    updateMember_DAL,
                    deleteMember_DAL
                }
