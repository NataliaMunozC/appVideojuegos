
const { Router } = require('express');
const {Videogame, Genre}=require ('../db');
const { totalInfo, getDetailsGame,totalGamesByname } = require('./functions');




const router = Router();

router
        .get ('/', async(req,res,next)=>{

            try{
            let {name}=req.query;
            if(name){  
             let gamesByName= await  totalGamesByname(name);
             gamesByName
             ?res.status(200).send(gamesByName)
             : res.status(404).send('Game not Found :(')
               
            }else{ let totalGames= await totalInfo();
                console.log(totalGames);
                let map= totalGames?.map((g)=>{
                    const {background_image, name, genres,rating,id,platforms,created, description, image}=g;
                    return {
                        id,
                        background_image:String(id).length<10?background_image:"",
                        image:String(id).length>10?image:"",
                        name,
                        genres,
                        rating,
                        platforms,
                        created,
                        description
                    }
                })
                
                res.status(200).send(map); 
            
            }
            }catch(e){
            next(e)
            }  
      
        })

        .get('/:id', async (req, res) => {
            const { id } = req.params;
            const games = await getDetailsGame(id);
        
            const {background_image, name, genres,rating,description,platforms, image}=games;
             const response= {
                    id,
                    background_image:String(id).length>10?image:background_image,
                    name,
                    genres: genres.map(e=>e.name),
                    rating,
                    description,
                    platforms: String(id).length<10?platforms.map(e=>e.platform.name):platforms
                 
                }
                games
                ? res.status(200).json(response)
                : res.status(404).send("game not found :(");
            })
            
                
            
    

        .post ('/', async(req, res) =>{
            const {name, description, released,rating, platforms, created, genres, image}= req.body;
            let newGame = await Videogame.create({
                
                name, 
                image,
                description, 
                released, 
                rating, 
                platforms,
                created,
                genres,
              
            })
            console.log(newGame);
            let genreDb= await Genre.findAll({where:{name:genres}})
            console.log(genreDb);
            newGame.addGenre(genreDb);  
            res.send("Game created successfully :)")

        })

        .delete ('/:id', async (req, res)=>{
            try{
                let {id}= req.params;
            
                res.json(await Videogame.destroy({
                    where:{id}
                }));
            
            }catch(e){
                res.send(e);
            }
        });

module.exports = router;
