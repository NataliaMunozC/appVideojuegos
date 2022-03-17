require('dotenv').config();
const axios  = require('axios');
//const API_KEY = process.env.API_KEY;

const { Videogame, Genre } = require('../db');
const API_KEY = '51073f1a55f24f6b929cb21de0ff3534';

    let functions={};
     functions.getInfoFromApi= async ()=>{
  
            //let url= `https://api.rawg.io/api/games?key=${API_KEY}`;
           /*   const next = (await axios.get(`${url}`)).data.next;
            const next2= (await axios.get(next)).data.next; 
            const next3= (await axios.get(next2)).data.next; 
             */
            
 
           /*  async function buildUrlArray (n) {
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
                    let {id, name, description,released,rating,platforms, background_image,created,genres} =game;
                    info.push({
                        id,
                         name,
                         description,
                         released,
                         platforms: game.platforms.map(e=>e.platform.name),
                         background_image,
                         rating,
                        genres:game.genres.map(e=>e.name),
                         created

                    })
                })
            });           
        return info;  */
        const url = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}`
          );
          const next = await axios.get(url.data.next);
          const next2 = await axios.get(next.data.next);
          const next3 = await axios.get(next2.data.next);
          const next4 = await axios.get(next3.data.next);
    
          const array = [
            ...url.data.results,
            ...next.data.results,
            ...next2.data.results,
            ...next3.data.results,
            ...next4.data.results,
          ];
    
          const mapped = array.map((el) => {
            let {
              id,
              name,
              released,
              rating,
              background_image,
              platforms,
              genres,
            } = el;
            return {
              id,
              name,
              released,
              rating,
              background_image,
              platforms: platforms.map((p) => p.platform.name),
              genres: genres.map((g) => g.name),
            };
          });
          return mapped;
        } ;
          



    

/*   a=functions.getInfoFromApi();
 a.then((v)=>console.log(v));  */


    functions. getInfoFromDb = async ()=>{
     return await Videogame.findAll({
         include:{
             model:Genre,
             attributes:['name'],
             through:{attributes:[]}
         } 
      
        });
    };
    functions. totalInfo = async()=>{
        try{
     const apiInfo= await functions.getInfoFromApi();
      const dbInfo = await functions.getInfoFromDb(); 
      const total= [...apiInfo, ...dbInfo]; 
  /*   const total=[...apiInfo] */
     return total;
        }catch(e){
            console.log(e);
        }
     //console.log(total);

 }

    functions.getGenres = async()=>{    
    const genresInfo= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const map = genresInfo.data.results.map((e)=>e.name);
    return map;
  
    }
    functions.getDetailsGame = async(id)=>{  
        if (String(id).length<10){ 
        const Info= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const response = Info.data;
        return(response);
        }else if (String(id).length>10){
            const gameDb= await Videogame.findByPk(id, {
            include:[{
                model:Genre,
                attributes:['name'],
                through:{attributes:[]}
                }]
                
            })
          
            console.log(gameDb);
            return gameDb
        } 
    } 


/*  let a=functions.getGenres();
 a.then((v)=>console.log(v, v.length)); 

  /* let a=functions.getInfoFromDb();
 a.then((v)=>console.log(v, v.length));   */
  let a=functions.totalInfo();
 a.then((v)=>console.log(v));   
/*  let a=functions.getPlatforms();
 a.then((v)=>console.log(v)) */
/*  let a=functions.getDetailsGame('d9337220-a27a-11ec-b98f-379653b276b8');
 a.then((v)=>console.log("hola"))   */



module.exports =functions;
