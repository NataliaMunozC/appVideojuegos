import axios from "axios";



export const GET_GAMES = 'GET_GAMES';
export const GAME_DETAILS = 'GAME_DETAILS';
export const RESET_DETAILS='RESET DETAILS';
export const CREATE_GAME = 'CREATE_GAME';
export const GET_GENRES='GET_GENRES';
export const GET_PLATFORMS='GET_PLATFORMS';
export const FILTER_BY_GENRES='FILTER_BY_GENRES';
export const FILTER_CREATED_GAMES='FILTER_CREATED_GAMES';
export const ORDERED_GAMES='ORDERED_GAMES';
export const GAMES_NAME='GAMES_BY_NAME';
export const SET_MATCHES='SET_MATCHES';
export const DELETE_GAME='DELETE_GAME';
export const RESET_FILTERS='RESET_FILTERS';


 export const getGames = () => async (dispatch) => {
    let json= await axios.get (`http://localhost:3002/videogames`)

   console.log("dispatch getgames",json.data);
    return dispatch({ type: GET_GAMES, payload:json.data})
};

export const getGamesByName = (name) => async (dispatch) => {
    console.log(name);
    try{
    let json= await axios.get (`http://localhost:3002/videogames?name=${name}`)
    console.log(json);
    return dispatch({ type: GAMES_NAME, payload:json.data})
    }catch(e){
        console.log(e);
        return dispatch({ type: GAMES_NAME, payload:[]})

    }
};




 export const setMatches = () => {
    
        return({ type: SET_MATCHES})
    }; 

export const resetFilters = () => {
    
        return({ type: RESET_FILTERS})
    };   

export const getPlatforms = () => async (dispatch) => {
    let json= await axios.get (`http://localhost:3002/videogames`)
    const platforms= json.data.map(e=>e.platforms).flat();
    const setPlatforms= new Set(platforms);
        


    return dispatch({ type: GET_PLATFORMS, payload:[...setPlatforms]})
};


export const getGenres = () => async (dispatch) => {
    let json= await axios.get (`http://localhost:3002/genres`)

    return dispatch({ type: GET_GENRES, payload:json.data})
};


export const getDetails = (id) => async dispatch => {

  const json = await axios.get(`http://localhost:3002/videogames/${id}`);
  console.log(json.data);
    return dispatch({
        type: GAME_DETAILS,
        payload: json.data
})};

export const resetDetails=()=>async dispatch=>{
    return dispatch({
        type:RESET_DETAILS,
    })

}


export const createGame= (payload)=>async() =>{
    console.log(payload);
    const response=await axios.post(`http://localhost:3002/videogames`,payload);
    console.log(response);
    return ({ type: CREATE_GAME, response})
}

export const filterGamesByGenre = (payload) => {

    return({ type: FILTER_BY_GENRES, payload})
};

export const filterCreatedGames = (payload) => {

    return({ type: FILTER_CREATED_GAMES, payload})
};

export const ordering = (payload) => {
console.log(payload)
    return({ type: ORDERED_GAMES, payload})
};


  export const deleteGame = (id) => async (dispatch) => {
    const { data } = await axios.delete(`http://localhost:3002/videogames/${id}`, {data:{id}} );
    return dispatch({ type: DELETE_GAME, payload: { id, data } });
  };
  
  
