import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {Provider} from "react-redux";
import {store} from './store';



axios.defaults.baseURL=process.env.REACT_APP_API || "http://localhost:3002";


ReactDOM.render(
<Provider store ={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
</Provider>   
  
  ,
document.getElementById('root')
);


