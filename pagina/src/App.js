import React from 'react';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import './App.css';
import  {Navbarmenu}  from './Componentes/menu/Navbarmenu';
import Wallets from './Componentes/walllets';
import Certificates from './Componentes/certificates';
function App() {
  return (
    <div>
      <Router basename="/">
       {/* Add Menu Component */}
        <Navbarmenu />
        <Routes> 
          <Route exact path="/" element={<Wallets/>}/>
          <Route path="/certificates" element={<Certificates/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;