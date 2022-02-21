const axios = require("axios");
const path = "https://cinema-subscriptions-server.herokuapp.com/movies";

const getAllMovies_DAL = async () => {
    return await axios.get(path);
}

const getAllMoviesWithMembersWatched_DAL = async () => {
    return await axios.get(`${path}/membersWatched`);
}

const getMovieById_DAL = async (id) => {
    return await axios.get(`${path}/${id}`);
}

const addMovie_DAL = async (obj) => {
    return await axios.post(path,obj);
}

const updateMovie_DAL = async (id,obj) => {
    return await axios.put(`${path}/${id}`,obj);
}

const deleteMovie_DAL = async (id) => {
    return await axios.delete(`${path}/${id}`);
}

module.exports = {  getAllMovies_DAL,
                    getAllMoviesWithMembersWatched_DAL,
                    getMovieById_DAL,
                    addMovie_DAL,
                    updateMovie_DAL,
                    deleteMovie_DAL
                }
