const { Router } = require('express');
const express = require ('express');
const {Genre} =require ('../db');
const { getGenres } = require('./functions');
const functions =require ('./functions');
const router = Router();

router.use(express.json());

router.get ('/', async (req, res)=>{
    let genres= await getGenres();
    genres.forEach(e => {
        Genre.findOrCreate({
            where:{name:e}
        })   
    });
    let response= await Genre.findAll();
    res.send(response); 
})


module.exports = router;