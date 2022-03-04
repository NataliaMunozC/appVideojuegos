require('dotenv').config();
const axios  = require('axios');
//const API_KEY = process.env.API_KEY;

const { Videogame, Genre } = require('../db');
const API_KEY = 'e3002286cfea4a18bd15fde3a37fb299';

    let functions={};
     functions.getInfoFromApi= async ()=>{
       
            //let url= `https://api.rawg.io/api/games?key=${API_KEY}`;
           /*   const next = (await axios.get(`${url}`)).data.next;
            const next2= (await axios.get(next)).data.next; 
            const next3= (await axios.get(next2)).data.next; 
             */

            async function buildUrlArray (n) {
                let url= `https://api.rawg.io/api/games?key=${API_KEY}`;
                let array= Array(n/20);
                array[0]= url;
                for(let i=1; i<array.length; i++){
                    array[i]=(await axios.get(array[i-1])).data.next;
                };
                return array  
            }
          
            let urls=await buildUrlArray(100);
            const array2= urls.map( async e=>{
                const response=await axios.get(e);
                const info= await response.data.results;
                return info;
            });
            let responsesArray=await Promise.all(array2);
            let info=[];
            responsesArray.forEach(url=>{
                url.map(game=>{
                    let {id, name, description,released,rating,platforms, background_image} =game;
                    info.push({
                        id,
                         name,
                         description,
                         released,
                         platforms: game.platforms.map(e=>e.platform.name),
                         background_image,
                         rating,
                         genres: game.genres.map(e=>e.name)

                    })
                })
            });           
        return info;
    } ;

/*  a=functions.getInfoFromApi();
 a.then((v)=>console.log(v, v.length));  */


    functions. getInfoFromDb = async ()=>{
     return await Videogame.findAll({
         /* include:{
             model:Genre,
             attributes:['name'],
             through:{attributes:[]}
         } */
         includes:Genre
        });
    };
    functions. totalInfo = async()=>{
     const apiInfo= await functions.getInfoFromApi();
     const dbInfo = await functions.getInfoFromDb();
     const total= [...apiInfo, ...dbInfo];
     //console.log(total);
     return total;

 }

    functions.getGenres = async()=>{    
    const genresInfo= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const map = genresInfo.data.results.map((e)=>e.name);
    return map;
  
    }

 /* let a=functions.getGenres();
 a.then((v)=>console.log(v, v.length)); */

/*  let a=functions.getInfoFromDb();
 a.then((v)=>console.log(v, v.length)); */
 /* let a=functions.totalInfo();
 a.then((v)=>console.log(v, v.length)); */



module.exports =functions;
