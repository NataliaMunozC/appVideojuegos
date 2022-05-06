 import React, { useEffect, useState } from "react";
 import { useDispatch, useSelector} from "react-redux";
 import { Link, useHistory } from "react-router-dom";
import { createGame, getGenres, getPlatforms } from "../actions"; 
import styles from '../cssModules/NewGame.module.css'
import Swal from 'sweetalert2'



export function validate(input) {
    let errors = {};
    if (!input.name) errors.name = 'Name is required';
    if (!input.description) errors.description = 'Description is required';
    if (!input.released)  errors.released = 'Released date is required';
    if (!input.rating) {
        errors.rating = 'Rating is required, it should be a number under 5';
    }else if(input.rating>5)    errors.rating = 'Rate between 1 and 5';
    if (!input.genres.length) errors.genres='At least one genre is required' 
    if (!input.platforms.length) errors.platforms='At least one platform is required'      
  
    return errors;
  };






export default function NewGame(){
    
    const[input, setInput] = useState({name:'',description:'', released:'', rating:'',genres:[], platforms:[], image:""})
    const [errors, setErrors]= useState({});
    const genres= useSelector((state)=>state.genres);
    const platforms=useSelector((state)=>state.platforms).sort();
    let dispatch =useDispatch();
    let history=useHistory();

    const handleChange = e => {
        e.preventDefault();
        setInput((prevState)=>{
            const newState ={
      
              ...prevState,
              [e.target.name]: e.target.value 
            }
 
        setErrors(validate(newState));
        return newState;
          });
          console.log(input);
        }

    const handleCheck = e => {

        if (!input[e.target.name].includes(e.target.value) && e.target.checked){
            setInput((prevState)=>{
                console.log(e.target.name, e.target.checked);

            const newState= {
            ...prevState,
            [e.target.name]: [...input[e.target.name], e.target.value]
            } 
            setErrors(validate(newState));
            return newState;
              });
            }
            // if input was previously checked and then  is unchecked, is  deleted from the array
         else if(input[e.target.name].includes(e.target.value) && !e.target.checked) {
             console.log(e.target.value)
            setInput((prevState)=>{
                console.log(e.target.value, e.target.checked);

            const newState= {
            ...prevState,
            [e.target.name]: [...input[e.target.name]].filter(g=>g!==e.target.value)
            
            } 
            setErrors(validate(newState));
           
    
            return newState;
              });

         }   
            console.log(input);
        }        
    
    

     const handleSubmit = e => {
      e.preventDefault();
       
        dispatch(createGame(input));
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Game created Succesfully!',
            showConfirmButton: false,
            timer: 1500
          })
      setInput({
        name:"",
        description:"",
        released:"",
        rating:"",
        genres:[],
        platforms:[],
        image:""

      })  
      history.push('/home');

     }; 

     useEffect(()=>{
         dispatch(getGenres());
         dispatch(getPlatforms());
    
     },[dispatch]);
    



    return (
        <React.Fragment>
            <div className={styles.container}></div>
            <br />
                <Link  to = '/home'>
                    <button  className={styles.button}>Home</button>
                </Link> 
            <form  className={styles.form} onSubmit={e => handleSubmit(e)} >
                <h1 className={styles.title}>Create your own Videogame</h1>
            <label><h3>Name</h3></label>
                <input 
                    type= "text"
                    name="name"
                    value={input.name}
                    onChange={e => handleChange(e)}
                />
                {errors.name && <p className={styles.danger}>{errors.name}</p>} 


            <label><h3>Description</h3></label>
                <textarea 
                    type="text"
                    name="description" 
                    value={input.description}
                    onChange={e => handleChange(e)}

                />  
                 {errors.description && <p className={styles.danger}>{errors.description}</p>} 


                <div >
                <label className={styles.rr}><h3>Released date</h3></label>
                <input 
                    type= "date"
                    name="released"
                    value={input.released}
                    onChange={e => handleChange(e)}
                />
                 {errors.released && <p className={styles.danger}>{errors.released}</p>} 
            
              <label className={styles.rating} ><h3>Rating</h3></label>
                <input className={styles.rating2}
                type="number"
                placeholder="1.0" 
                step="0.01" 
                min="0"
                max="5"
                name="rating"
                value={input.rating}
                onChange={e => handleChange(e)}
                size="3"
            
                /> 
                 {errors.rating && <p className={styles.danger}>{errors.rating}</p>} 
                 <label ><h3>Image</h3></label>
                <input 
                   
                    name="image"
                    placeholder="Image url"
                    value={input.image}
                    src={input.image}
                    onChange={e => handleChange(e)}
                />

            </div >
            
                
                <label><h3>Genres: Select al least one</h3></label>
              
             <div id="checkBoxes"  className={styles.checkboxes} >
 
            {genres && genres.map(e=>{ 

             return ( 
                <label key={e.id} >
                 <input  className={styles.check} key={e.id} type="checkbox" id="first"  name="genres"   value={e.name} onChange={e => handleCheck(e)} />
                 {e.name}
                 </label>);
                 }

                )}
            </div> 
            {errors.genres && <p className={styles.danger}>{errors.genres}</p>} 


            <br />


            <label><h3>Platforms:Select at least One</h3></label>
          
            <div id="checkBoxes"  className={styles.checkboxes} >

                {platforms && platforms.map(e=>{ 

             return ( 
              <label key={e.toString()} >
                 <input  className={styles.check}  key={e.toString()} type="checkbox" id="first" value={e} name="platforms" onChange={e => handleCheck(e)}  />
                {e}
                 </label>)
                 }

                  )}
            </div>
            {errors.platforms && <p className={styles.danger}>{errors.platforms}</p>} 



            <br /><br /><br />
            <span className={styles.span}>
    
            <button  type='submit' className={styles.button}  disabled={Object.keys(errors).length>0?true:false} >Submit
            </button>  

            </span>
          
            </form>
        </React.Fragment>


    )

}
