import React from 'react';
import Navbar from './Navbar/Navbar'
import UrlForm from './components/UrlForm';
import './App.css';


function App() {
  return (
    <div className="app-wrapper">
      <Navbar/>
     
      <UrlForm />
      
    </div>
  );
}

export default App;
