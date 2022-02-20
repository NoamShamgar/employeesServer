const axios = require("axios");
const path = "http://localhost:8001/subscriptions";

const getAllSubscriptions_DAL = async () => {
    return await axios.get(path);
}

const getSubscriptionById_DAL = async (id) => {
    return await axios.get(`${path}/${id}`);
}

const getMemberSubscription_DAL = async (id) => {
    return await axios.get(`${path}/${id}`);
}

const addSubscription_DAL = async (obj) => {
    return await axios.post(path,obj);
}

const updateSubscription_DAL = async (id,obj) => {
    return await axios.put(`${path}/${id}`,obj);
}

const deleteSubscription_DAL = async (id) => {
    return await axios.podst(`${path}/${id}`);
}

const addMovieToSubscription_DAL = async (id,obj) => {
    return await axios.post(`${path}/${id}/movies`,obj);
}

module.exports = {  getAllSubscriptions_DAL,
                    getSubscriptionById_DAL,
                    addSubscription_DAL,
                    updateSubscription_DAL,
                    deleteSubscription_DAL,
                    addMovieToSubscription_DAL
                }
