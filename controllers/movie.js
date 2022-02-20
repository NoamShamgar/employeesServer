const {  getAllMovies_DAL,getAllMoviesWithMembersWatched_DAL,getMovieById_DAL,addMovie_DAL,updateMovie_DAL,deleteMovie_DAL} = require("../DAL/moviesWS")
const lookForAuthorization = require("../auth/authorization")

// sending req to the subs api after the auth passed
const getAllMovies = async (permissions) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-mov")) {
                reject("access denied")
            } else {
                resolve((await getAllMovies_DAL()).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const getAllMoviesWithMembersWatched = async (permissions) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-mov")) {
                reject("access denied")
            } else {
                resolve((await getAllMoviesWithMembersWatched_DAL()).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const getMovieById = async (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"view-mov")) {
                reject("access denied")
            } else {
                resolve((await getMovieById_DAL(id)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const addMovie = async (permissions,obj) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"add-mov")) {
                reject("access denied")
            } else {
                resolve((await addMovie_DAL(obj)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const updateMovie = async (permissions,id,obj) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"upt-mov")) {
                reject("access denied")
            } else {
                resolve((await updateMovie_DAL(id,obj)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

// sending req to the subs api after the auth passed
const deleteMovie = async (permissions,id) => {
    return new Promise(async (resolve,reject) => {
        try {  
            if(!lookForAuthorization(permissions,"del-mov")) {
                reject("access denied")
            } else {
                resolve((await deleteMovie_DAL(id)).data);
            }
        } catch (err) {
            reject(err)
        }
    });
}

module.exports = {  getAllMovies,
                    getAllMoviesWithMembersWatched,
                    getMovieById,
                    addMovie,
                    updateMovie,
                    deleteMovie
}
