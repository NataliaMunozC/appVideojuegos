
import React from 'react';
import './App.css';
import { Route, Switch,} from 'react-router-dom';
import InitialPage from './components/InitialPage';
import Home from './components/Home';
import NewGame from './components/NewGame';
import Details from './components/Details';


function App() {
  return (
    <React.Fragment>

         <Switch> 
            <Route  exact  path ={'/'} component={InitialPage}/>
            <Route  exact path ={'/home'}  component ={Home}/>
            <Route   exact path={'/home/:id'} component ={Details}/> 
             <Route  exact path={'/create'} component={NewGame}/>  
          </Switch>  
      
    </React.Fragment>
  );
} 

export default App;
