 import React from 'react'
 import Header from './Header';
 import Navbar from './Navbar';
 import Footer from './Footer';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Dashboard from './DashBoard';
 const App = () => {
   return (
       <>
        
          <Header/>
          <Navbar/>
          <Footer/> 
          <Routes>
            <Route 
              path="/dashboard" 
              element={ 
                  <Dashboard />
                 
              } 
            />
          </Routes>
          
       </>
   )
 }
 
 export default App