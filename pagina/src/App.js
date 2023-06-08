import React from 'react';
import './App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


const url = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/Dominios";

const App = () => {
  const [data, setData] = useState([]);

  state = {
    data: []
  }

  getPetition = () => {
    axios.get(url).then(response => {
      console.log('API OBTENIDA');
      this.setState({ data:response.data.items });
    }).catch(error =>{
      console.log(error);
    })
  }

  componentDidMount(){
    this.getPetition();
  }



render(){

  return(
    <div className='App'>
    <br />
      <button className='btn btn-succes'>Agregar Certificado</button>
      <br /> <br />
      <table className='table'>
      <thead>
        <tr>
          <th>acl_description</th>
          <th>base_domain</th>
          <th>description</th>
          <th>published</th>
          <th>type_description</th>
          <th>wallet_password</th>
          <th>walleth_path</th>
        </tr>
      </thead>
      <tbody>
      { 
      this.state.data.map(certificate => (
    <tr key={certificate.description}>
      <td>{certificate.acl_description}</td>
      <td>{certificate.base_domain}</td>
      <td>{certificate.description}</td>
      <td>{certificate.published}</td>
      <td>{certificate.type_description}</td>
      <td>{certificate.wallet_password}</td>
      <td>{certificate.walleth_path}</td>
    </tr>
  ))
}

      </tbody>
      </table>
    </div>
  );
};

export default App;