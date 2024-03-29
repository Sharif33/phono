import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import { store } from './Redux/store';
import { Provider } from 'react-redux';
import ScrollTop from './Shared/Header/ScrollTop';
import { QueryClient, QueryClientProvider } from 'react-query'
 
 const queryClient = new QueryClient()

/* https://peaceful-shore-84874.herokuapp.com */

ReactDOM.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
      <ScrollTop/>
    </BrowserRouter>
    </QueryClientProvider>
    ,
  // </React.StrictMode>
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
