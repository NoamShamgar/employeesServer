const express = require("express");
const {getAllMovies,getAllMoviesWithMembersWatched,getMovieById,addMovie,updateMovie,deleteMovie} = require("../controllers/movie");

const router = express.Router();

router.route("/")
.get(async (req,res,next)=>{
    try {
        res.json(await getAllMovies(res.perm))  // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).post(async (req,res,next)=>{
    try{
        res.json(await addMovie(res.perm,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id")
.get(async (req,res,next)=>{
    try{
        res.json(await getMovieById(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).put(async (req,res,next)=>{
    try{
        res.json(await updateMovie(res.perm,req.params.id,req.body)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).delete(async (req,res,next)=>{
    try{
        res.json(await deleteMovie(res.perm,req.params.id)); // sending user permissions so the function look for authorization
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})

router.route("/watchedMembers") // getting movies with members watched
.get(async (req,res,next)=>{
    try{
        res.json(await getAllMoviesWithMembersWatched());
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})


module.exports = router;