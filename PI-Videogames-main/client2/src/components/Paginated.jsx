import React from "react";
import styles from '../cssModules/Paginated.module.css'


export default function Paginated({gamesPerPage, allGames,paginated}){
 const pageNumbers=[];
 for (let i = 0; i < Math.ceil(allGames/gamesPerPage); i++) {
    pageNumbers.push(i+1)
     
 }
 return (
     <nav className={styles.nav} >
         <ul className={styles.ul} >
             {pageNumbers?.map(n=>{
                 return(
                 <li key={n} className={styles.li}>
                     <button  className={styles.button} onClick={()=>paginated(n)}>{n}</button>
                 
                  </li>)
             })}
         </ul>
     </nav>
 )
}