import React, {useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetails, deleteGame, resetDetails } from "../actions";
import styles from "../cssModules/Details.module.css"
import gif from '../assets/giphy.jpg'




export default function Details (){
  const defImage='https://images.unsplash.com/photo-1627856013091-fed6e4e30025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&w=1000&q=80'
    const [ loading, setLoading ] = useState(true);
    const dispatch=useDispatch();
    let {id}=useParams();
   


        useEffect(() => {
            console.log("hola", id);
         
            dispatch (getDetails(id));
        
            setTimeout(() => { setLoading(false);
                            },3000);  
            return ()=>{
                 dispatch(resetDetails());

            }           
                    
                 },[dispatch, id]);                

                       
     const details= useSelector((state)=>state.details)
    console.log(details);

    return (
            <div >
                {  loading || !details
                ? ( <span className={styles.gif}>
                    <img src={gif} alt="img" width='200px' height='200px'  />
                    </span>
                    )

                : ( 
                <div className={styles.container}>        
                <Link to = '/home'>
                    <button  className={styles.button1}>Home</button>
                </Link>

                    <h2 className={styles.title}>{details.name}</h2>
                    {String(details.id.length)>10&&
                    <Link
                    className={styles.delete}
                    onClick={() => id && dispatch(deleteGame(details.id)).then(()=>alert(`Thes Videogame ${details.id} has been deleted!`))}
                    to="/home"
                  >
                    Delete
                  </Link>
                    
                    }
                   <div className={styles.head}>
                        <div className={styles.img}>
                        <img 
                        src={
                            
                            details.background_image?details.background_image:defImage} alt="img not found" width="400px" height="300px"  />
                        </div>
                    <div className={styles.info}>
                        <div  className={styles.rghead} >
                        <span className={styles.rg} ><b>Rating</b> {details.rating}</span> 
                        <br></br>
                        <span className={styles.rg} > 
                        <span > <b>Genres</b> </span>
         
                            { details.genres.map((element) => {
                            
                            return (
                                <span  className={styles.g} key={element}> { element} </span>
                                );
                            })}
                        </span>  
                        </div>     
                            <br></br>
                        <div className={styles.plat}> 
                        <span> <b>Platforms</b> </span>
         
                     { details.platforms.map((element) => {
                         
                         return (
                             <span  className={styles.g} key={element}> { element} </span>
                             );
                            })}        
                        </div>  
                    </div>
                 </div> 
                    <div className={styles.description}><b>Description:</b> {(details.description).replace(/<[^>]+>/gi, '')}</div>
                   
                </div>
    
            ) }
            </div>  
    );
 }               