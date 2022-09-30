import React from "react";
import styles from '../cssModules/Card.module.css'
import { Link } from "react-router-dom";

export default function Card ({name,image,genres, id,rating}){


  const defImage='https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2021/02/30-mejores-heroes-ultimos-30-anos-2243371.jpg?itok=1iWouJJI'
    return (
        <div className={styles.container}>
              <Link className={styles.link} to={`/home/${id}`}> 

                 <h3 className={styles.title}>{name}</h3>
            <img className= {styles.img} src={image?image:defImage }alt="videoimg" width="200px" height="250px" />
          
          <div className={styles.info}>
            <div className={styles.genreslist}>
            <span> <b>Genres</b> </span>
           
            { genres.map((element) => {
              
              return (
                <span  className={styles.g} key={element.name ? element.name : element}> { element.name ? element.name : element} </span>
                );
              })}
          </div>
             <div  className={styles.rating} >
               <span><b>Rating</b></span>
               <span>{rating}</span>
             </div>
        </div>
             </Link> 

        </div>
    )
}