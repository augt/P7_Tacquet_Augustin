import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from "./components/AuthProvider"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider/>
  </React.StrictMode>,
  document.getElementById('root')
);


