import React from "react";
import styles from '../cssModules/Card.module.css'
import { Link } from "react-router-dom";

export default function Card ({name,image,genres, id,rating}){


  const defImage='https://images.unsplash.com/photo-1627856013091-fed6e4e30025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&w=1000&q=80'
    return (
        <div className={styles.container}>
              <Link className={styles.link} to={`/home/${id}`}> 

                 <h3>{name}</h3>
            <img src={image?image:defImage }alt="img not found" width="200px" height="250px" />
          
           <span><b>Rating:</b>{rating}</span>
         <div className={styles.genreslist}>
          <span> <b>Genres</b>: </span>
         
          { genres.map((element) => {
            
            return (
              <span  className={styles.g} key={element.name ? element.name : element}> { element.name ? element.name : element} </span>
            );
          })}
        </div>
             </Link> 

        </div>
    )
}