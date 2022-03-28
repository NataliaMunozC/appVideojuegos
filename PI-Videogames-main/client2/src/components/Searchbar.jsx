import  React, { useState, useRef } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getGamesByName, setMatches } from "../actions";
import style from '../cssModules/Searchbar.module.css'
//import gif from '../assets/loading.gif'


export default function Searchbar (){
    const search = useRef();

    const [input, setInput]= useState("");

    const dispatch=useDispatch();
   
    const handleChange= (e)=>{
        e.preventDefault();
        setInput(e.target.value);

        console.log(input);
        
    }
    const handleClick= (e)=>{
        e.preventDefault();
        if (input !==""){
            dispatch(getGamesByName(input));
        
        }else{alert ('a name is required')};
        setTimeout(()=>search.current.value="",1500);
             
           
          
    }


    let match=useSelector(state=>state.matchFound);
    if(!match) alert ('No matches found');
    dispatch(setMatches());
   
    return(

        
          <div >

            
              <input style={style.input} ref={search} type="text"  placeholder="Game name..." onChange={e => handleChange(e)}/>
              <button style={style.button} type ='submit' onClick={e=>handleClick(e)}>Search games by name</button>
           
         </div>
      /*   )}         
       </div>  


 */    );

}