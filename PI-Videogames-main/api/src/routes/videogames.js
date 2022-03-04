const { Router } = require('express');
const {Videogame, Genre}=require ('../db');
//const Genre = require('../models/Genre');
const { totalInfo } = require('./functions');
const functions =require ('./functions');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router
        .get ('/', async(req,res)=>{
            
            let totalGames= await totalInfo();
            let map= totalGames.map((g)=>{
                const {background_image, name, genres,rating}=g;
                return {
                    background_image,
                    name,
                    genres,
                    rating
                }
            })
            let {name}=req.query;
            if(name){
                let gameName = map.filter( g=> g.name.toLowerCase().includes(name.toLowerCase())).slice(0,15);
                gameName.length  
                             ?res.status(200).send(gameName.slice(0,14))
                            : res.status(404).send('Game not Found :(') 

            }
            res.status(200).send(map);   
      
        })

        .get('/:id', async (req, res) => {
            const { id } = req.params;
            const games = await totalInfo();
            if(id) {
                let gameId = games?.filter(g => g.id == id);
                gameId.length
                ? res.status(200).json(gameId)
                : res.status(404).send("game not found :(");
            }
        })

   .post ('/', async(req, res) =>{
            const {name, description, released,rating, platforms, created, genre}= req.body;

            let newGame = await Videogame.create({
                name, 
                description, 
                released,
                rating, 
                platforms,
                created
            })
            let genreDb= await Genre.findAll({where:{name:genre}})
            newGame.addGenre(genreDb);
            res.send("Game created successfully :)")

        });
        
        




module.exports = router;
