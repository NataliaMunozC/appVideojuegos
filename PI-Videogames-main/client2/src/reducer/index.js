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
    DELETE_GAME,
    RESET_FILTERS
 

} from "../actions";

const initialState = {
    games: [],
    details: [],
    allGames: [],
    genres:[],
    platforms:[],
    created:[],
    notCreated:[],
    matchFound:true,
    filtOrigin:{created:false,notCreated:false},
    filtGenre:false,
}


export default function rootReducer (state= initialState, action) {
    let allGames=state.allGames;
    switch(action.type) {
         case GET_GAMES:  
         console.log(action.payload);
         return{
             ...state,
             games:action.payload,
             allGames:action.payload,
             created: action.payload.filter(e=>e.created),
             notCreated: action.payload.filter(e=>!e.created)
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
         case RESET_FILTERS:
             return{
                 ...state,
                 filtOrigin:{created:false,notCreated:false},
                 filtGenre:false,
        
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
            let baseg= state.filtOrigin.created?state.created:
                        state.filtOrigin.notCreated?state.notCreated:
                        state.allGames;

            console.log(baseg);
            console.log(action.payload);
            
            const gamesFG= action.payload ==="All"?baseg:baseg.filter((g)=>
                String(g.id).length>10?g.genres.map(e=>e.name).includes(action.payload)
                                      :g.genres.includes(action.payload) 

            );  
           
               console.log(gamesFG);   
               return{
                    ...state,
                    games:gamesFG,
                    filtGenre:action.payload==="All"?false:true
                }
        case FILTER_CREATED_GAMES:
                let gamesFC=[];
                let base=[];
                if(action.payload[1]==='All') base=state.allGames;
                if(!state.filtOrigin.created &&!state.filtOrigin.notCreated && action.payload[1]!=='All')  base=state.games; //No previous filters by origin and theres a  genre filter
                if(state.filtOrigin.created && action.payload[1]!=='All'){
                    base=state.allGames.filter(g=>g.genres.includes(action.payload[1]));
                }   
                if(state.filtOrigin.notCreated && action.payload[1]!=='All'){// if  it was filter by notCreated 
                    base=state.allGames.filter(g=>g.genres.map(e=>e.name).includes(action.payload[1]));
                }  
                 (action.payload[0]==='All')?gamesFC=base
                                         :(action.payload[0]==='created')
                                         ?gamesFC=base.filter(g=>g.created) 
                                        :gamesFC=base.filter(g=>!g.created);                             
                    console.log(gamesFC);  
                   return{
                       ...state,
                       games:gamesFC,
                       filtOrigin:{created:action.payload[0]==="created"?true:false, notCreated:action.payload[0]==="notCreated"?true:false}
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

