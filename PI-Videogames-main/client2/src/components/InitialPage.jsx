import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../cssModules/InitialPage.module.css';

export default function InitialPage() {
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

