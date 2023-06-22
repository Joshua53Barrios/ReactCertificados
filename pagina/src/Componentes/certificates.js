import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import {FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';
import { BiPencil } from "react-icons/bi"
import { BiTrash } from "react-icons/bi"
import swal from 'sweetalert'

const url = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/certificados";



class wallets extends React.Component {

  state = {
    data: [] ,
    modalInsertar: false,
    tipoModal: "",
    form:{
      id_pk : "",
      wallet_fk: "",
      name: "",
      certificate: "",
      mime_type: "",
      file_name: ""
    }
  }

  // Llama a la función para hacer la solicitud POST

  getPetition = () => {
    axios.get(url).then(response => {
      console.log('API GET OBTENIDA');
      console.log(response)
      this.setState({ data:response.data.items });
    }).catch(error =>{
      console.log(error);
    })
  }

  domainSelect = (domain, tipoModal) =>{
    this.setState({
      tipoModal: tipoModal,
      form: {
        id_pk : domain.id_pk,
        acl_description: domain.wallet_fk,
        base_domain: domain.name,
        description: domain.certificate,
        type_description: domain.mime_type,
        wallet_password: domain.file_name
      }
    })
  }

  handleChange = async e =>{
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form)
  }


  componentDidMount(){
    this.getPetition();
  }



render(){
  const {form} = this.state;
  
  return(
    <div className='App'>
    <br />
      <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal: 'insert'}); this.modalInsertar()}}>Agregar Dominios</button>
      <br /> <br />
      <table className='table'>
      <thead>
        <tr>
          <th style={{display:'none'}}>id_pk</th>
          <th>wallet_fk</th>
          <th>name</th>
          <th>certificate</th>
          <th>mime_type</th>
          <th>file_name</th>
        </tr>
      </thead>
      <tbody>
      {
      this.state.data.map(domain => (
    <tr key={domain.description}>
      <td style={{display: 'none'}}>{domain.id_pk}</td>
      <td>{domain.wallet_fk}</td>
      <td>{domain.name}</td>
      <td>{domain.certificate}</td>
      <td>{domain.mime_type}</td>
      <td>{domain.file_name}</td>
      <a href={domain.certificate} download={domain.certificate} className="btn btn-primary">
      Download
      </a>
    </tr>
  ))
}

      </tbody>
      </table>
    </div>
    );
  }
}

export default wallets;