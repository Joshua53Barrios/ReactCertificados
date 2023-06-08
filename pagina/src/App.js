import React from 'react';
import './App.css';

class App extends React.Component {

render(){
  return(
    <div className="app container">
      <div className="jumbotron "> {/*Jumbotron componente de Boostrap que representa un cuadro destacado en una pagina en HTML*/}
        <p className="lead text-center">Buscador de Certificados</p>
      </div>  
    </div>
    );
  }
}

export default App;
