import {
    GAME_DETAILS,
    RESET_DETAILS,
    CREATE_GAME,
    GET_GAMES,
    GET_GENRES,
    GET_PLATFORMS,
    FILTER_BY_GENRES,
    FILTER_CREATED_GAMES,
    ORDERED_GAMES,
    GAMES_NAME,
    SET_MATCHES,
    DELETE_GAME
 

} from "../actions";

const initialState = {
    games: [],
    details: [],
    allGames: [],
    genres:[],
    platforms:[],
    matchFound:true
}


export default function rootReducer (state= initialState, action) {
    let allGames=state.allGames;
    switch(action.type) {
         case GET_GAMES:
         return{
             ...state,
             games: action.payload,
             allGames:action.payload
         }   

         case GAMES_NAME:
             console.log(action.payload);
            if(action.payload.length){
            return{
                ...state,
                games: action.payload, 
                matchFound:true 
            } }
            else return {...state,games:action.payload, matchFound:false}  

        case SET_MATCHES:
           
            return{
                ...state,
                matchFound: true
            }  
            
    
        case GAME_DETAILS:
            return{
                ...state,
                details: action.payload

            }
            case RESET_DETAILS:
                return{
                    ...state,
                    details:[]
    
                }   

        case CREATE_GAME:
            console.log(action.payload);
            return{
                ...state,
    
                }

        case DELETE_GAME:
            const filteredGames = [...state.allGames].filter(g => {
             return g.id !== action.payload.id;
            });
            return { ...state, 
                    allGames: filteredGames,
                     games: filteredGames };       

        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
     
            }      
        case GET_PLATFORMS:
                return{
                    ...state,
                    platforms: action.payload
                }   

        case FILTER_BY_GENRES:
                 
                const gamesFG= action.payload ==="All"?allGames:allGames.filter((g)=>g.genres.includes(action.payload));
                return{
                    ...state,
                    games:gamesFG
                }
        case FILTER_CREATED_GAMES:
                 console.log(action.payload);
                let gamesFC=[];
                
                (action.payload==='All')? gamesFC=state.allGames
                                            :(action.payload==='created')
                                                ?gamesFC=state.allGames.filter(g=>g.created)
                                                 :gamesFC=state.allGames.filter(g=>!g.created);
                    console.log(gamesFC);
                   return{
                       ...state,
                       games:gamesFC
                   } 

         case ORDERED_GAMES:
                    let ordering=(arg)=>{
                        let orderedGames=[];  
                        if(arg==='ascA'){
                            orderedGames=state.games.sort((e1,e2)=>{
                                if(e1.name.toLowerCase()<e2.name.toLowerCase()) return -1;
                                else if(e1.name.toLowerCase()>e2.name.toLowerCase()) return 1
                                else return 0
                            })
                        }else if(arg==='descA'){    
                            orderedGames=state.games.sort((e1,e2)=>{
                                    if(e1.name.toLowerCase()<e2.name.toLowerCase()) return 1;
                                    else if(e1.name.toLowerCase()>e2.name.toLowerCase()) return -1
                                    else return 0
                                })   
                         
                        }else if(arg==='ascR'){    
                                orderedGames=state.games.sort((e1,e2)=>{
                                        if(e1.rating<e2.rating) return -1;
                                        else if(e1.rating>e2.rating) return 1
                                        else return 0
                                        }) 
                        }else if(arg==='descR'){
                            orderedGames=state.games.sort((e1,e2)=>{
                                if(e1.rating<e2.rating) return 1 ;
                                else if(e1.rating>e2.rating) return -1
                                else return 0
                                }) 

                        }
                                                       
                        console.log(orderedGames)        
                        return orderedGames;    
                    }
    
                    let result=[];
                    console.log(allGames, allGames.length);

                    if(action.payload==='none') result =allGames;
                    if(action.payload==='ascA') result=ordering('ascA');
                    if(action.payload==='descA') result=ordering('descA');
                    if(action.payload==='ascR') result=ordering('ascR');
                    if(action.payload==='descR') result=ordering('descR');

        
                   return{
                       ...state,
                       games:result
                   }  

        default:
            return state
    }  
}

