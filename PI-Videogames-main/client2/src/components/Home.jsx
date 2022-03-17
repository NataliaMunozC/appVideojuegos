import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import { getGames, getGenres,filterGamesByGenre,filterCreatedGames, ordering } from "../actions";
import styles from '../cssModules/Home.module.css';
import Card from "./Card";
import Paginated from "./Paginated";
import Searchbar from "./Searchbar";
import gif from '../assets/giphy.jpg'


export default function Home() {
    const dispatch=useDispatch();
    const history=useHistory();
    const allGames=useSelector((state)=>state.games);
    const genres= useSelector((state)=>state.genres);
    const [currentPage,setCurrentPage]= useState(1);
    const [gamesPerPage]=useState(15);
    const indexOfLastGame=currentPage*gamesPerPage;
    const indexOfFirstGame=indexOfLastGame-gamesPerPage;
    const currentGames=allGames.slice(indexOfFirstGame,indexOfLastGame);
    const [order,setOrder]=useState("");
    const [ loading, setLoading ] = useState(true);
    const paginated=(pageNumber)=>{
        setCurrentPage(pageNumber);

    };
    
    useEffect(() => {// para qe apenas se monte el componente se  haga el dispatch del getGames
        dispatch (getGames());
        dispatch(getGenres());
        //allGames.length?setLoading(false):setLoading(true)
        
    },[]);
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getGames());
        console.log("hola");
    }  

    function handleClick2(e){
            e.preventDefault();
            history.push('/create');
        }
     
    function handleFilterGenre(e){
        e.preventDefault();
        dispatch(filterGamesByGenre(e.target.value))
        
    }
    
    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreatedGames(e.target.value))
    }   
        
  

     function handleOrder(e){
       /*   e.target.value==='none'? dispatch(getGames())
         : */
            e.preventDefault();
            dispatch(ordering(e.target.value));
            setCurrentPage(1);
            setOrder(`Ordered ${e.target.value}`);
           

    }

      return (
          <div className={styles.container}>
              <div >
             
                  <button className={styles.buttons} onClick={e=>handleClick2(e)}>Create your own Game</button>
             
              <Searchbar/>
        
            </div>
            <div>
                <div className={styles.bar}>
                <select onChange={e=>handleOrder(e)}className={styles.filter}>
                <optgroup label ="Sort Options">
                    <option value='none'>None</option>
                    <option value='ascA'>Ascendent by ALPH</option>
                    <option value='descA'>Descendent by ALPH</option>
                    <option value='ascR'>Ascendent by rating</option>
                    <option value='descR'>Descendent by rating</option>
                </optgroup>
                </select>
                <select  onChange={e=>handleFilterCreated(e)} className={styles.filter} >
                    <optgroup label ="Created or Not">

                    <option value='All'>All</option>
                    <option value= 'created'>Created</option>
                    <option value= 'notCreated'>Not Created</option>
                    </optgroup>

                </select >


                <select  onChange={e=>handleFilterGenre(e)} className={styles.filter} >

                        <optgroup label ="Filter by Genre">  
                         <option value='All'> All </option>;

                    {genres && genres.map(e=>{
                        
                        return (<option key={e.id} value={e.name}> {e.name} </option>);
                    }
                    
                    )
                    
                }
                 </optgroup>
                
               </select >

               <button className={styles.button} onClick={e=>{handleClick(e)}}>
            Reset
            </button>
               </div>
                <Paginated gamesPerPage={gamesPerPage} allGames={allGames.length} paginated={paginated}/>
               
            {/*  { loading?
                ( <span className={styles.gif}>
                    <img src={gif} alt="img" width='200px' height='200px'  />
                    </span>
                ): */}

                <div className={styles.cards}>

                   
                 {
                 currentGames &&
                 currentGames.map((e) => {
                   
                     return (
                       
                         <Card
                         key={e.id}
                         id={e.id}
                         name={e.name}
                         image={e.background_image}
                         genres={e.genres}
                         rating={e.rating}
                         />
                         );
                        })}

                     
                </div>
                
     

            </div>
          </div>

        
      )

   
}
