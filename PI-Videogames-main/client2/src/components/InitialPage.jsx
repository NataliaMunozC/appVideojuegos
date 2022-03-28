import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from '../cssModules/InitialPage.module.css';
import { useDispatch } from 'react-redux';
import { getGenres, getGames } from '../actions';

export default function InitialPage() {

  let dispatch=useDispatch();
  useEffect(() => {// para qe apenas se monte el componente se  haga el dispatch del getGames
    dispatch (getGames());
    dispatch(getGenres());
   
     
},[]);
  return (
   <React.Fragment>
    <nav className={styles.container}>
      <Link className={styles.link} to ='/home'>
        <button  className={styles.button}>Welcome to VGApp: 
          <br /> Let´s start!
        
        </button>
      </Link>
    </nav>
    </React.Fragment>  
    
  

  )
};

