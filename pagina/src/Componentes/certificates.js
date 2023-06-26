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
      wallet_fk : "",
      name: "",
      certificate: ""
    }
  }

  // Llama a la función para hacer la solicitud POST
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

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
        wallet_fk : domain.wallet_fk,
        name: domain.name,
        certificate: domain.certificate
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

  peticionPost = async() => {
    await fetch(url, {method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
  
    body: JSON.stringify({
      "WALLET_fk" : this.state.form.wallet_fk,
      "NAME" : this.state.form.name,
      "CERTIFICATE" : this.state.form.certificate
    })}).then(response =>{
      this.modalInsertar();
      this.getPetition();
    })
  }
  insertConfirm = () =>{
    swal({
      title: "Insert",
      text: "Are you sure to insert this certificate?",
      icon: "warning",
      buttons: ["No","Yes"] 
    }).then(respuesta => {
      if(respuesta){
        this.peticionPost();
        swal({text: "The certificate has been inserted", icon: "success", timer:"2000"});        
      }
    })
  }
render(){
  const {form} = this.state;
  
  return(
    <div className='App'>
    <br />
      <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal: 'insert'}); this.modalInsertar()}}>Agregar Certificates</button>
      <br /> <br />
      <table className='table'>
      <thead>
        <tr>
          <th style={{display:'none'}}>id_pk</th>
          <th>wallet_fk</th>
          <th>name</th>
          <th>file_name</th>
          <th>certificate</th>
          <th>download</th>
          <th>mime_type</th>
          <th>base_domain</th>
          <th>acl_description</th>
          <th>type_description</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>
      {
      this.state.data.map(domain => (
    <tr key={domain.id_pk}>
      <td style={{display: 'none'}}>{domain.id_pk}</td>
      <td>{domain.wallet_fk}</td>
      <td>{domain.name}</td>
      <td>{domain.file_name}</td>
      <td>{domain.certificate}</td>
      <td>{domain.download}</td>
      <td>{domain.mime_type}</td>
      <td>{domain.base_domain}</td>
      <td>{domain.acl_description}</td>
      <td>{domain.type_description}</td>
      <td>{domain.description}</td>
      <td>
      <a href={domain.download} download={domain.download} className="btn btn-primary">
      Download
      </a>
      </td>
    </tr>
  ))
}

      </tbody>
      </table>
      <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display: 'block'}}>
          <button className="btn btn-light" style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</button> 
          </ModalHeader>
          <ModalBody>
            <div className='form-group'>
              {this.state.tipoModal === "delete"?
              <div>
              <label htmlFor="acl_description">ACL Description</label>
              <input className='form-control'  readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="acl_description" id="acl_description" onChange={this.handleChange} value={form?form.acl_description: ""}/>
              <br />
              <label htmlFor="base_domain">Domain</label>
              <input className='form-control'  readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="base_domain" id="base_domain" onChange={this.handleChange} value={form?form.base_domain: ""}/>
              <br />
              <label htmlFor="description">description</label>
              <input className='form-control'  readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="description" id="description" onChange={this.handleChange} value={form?form.description:""}/>
              <br />
              <label htmlFor="type_description">type_description</label>
              <FormGroup>
              <Input disabled className='form-select form-select-sm'  readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='select' name="type_description" id="type_description" onChange={this.handleChange} value={form?form.type_description:""}>
              <option selected>Select a option</option>
              <option value={'REST'}>REST</option>
              <option value={'SOAP'}>SOAP</option>
              </Input>
              </FormGroup>
              <br /> 
              </div>
              :
              <div>
              <label htmlFor="wallet_fk">ACL Description</label>
              <input className='form-control' type='text' name="wallet_fk" id="wallet_fk" onChange={this.handleChange} value={form?form.wallet_fk: ""}/>
              <br />
              <label htmlFor="name">Domain</label>
              <input className='form-control' type='text' name="name" id="name" onChange={this.handleChange} value={form?form.name: ""}/>
              <br />
              <label htmlFor="certificate">description</label>
              <input className='form-control' type='file' name="certificate" id="certificate" onChange={this.handleChange} value={form?form.certificate:""}/>
              <br /> 
              </div>
              } 
            </div>
          </ModalBody>
          <ModalFooter>
          {this.state.tipoModal === "update"?
            <button className='btn btn-primary' onClick={()=>this.updateConfirm()}>
            update
          </button> : this.state.tipoModal === "delete" ?
          <button className='btn btn-warning' onClick={()=>this.deleteConfirm()}>
          delete
        </button> :
            <button className='btn btn-success' onClick={()=>this.insertConfirm()}>
              Insert
            </button> 
            }
            <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>cancelar</button>
          </ModalFooter>
      </Modal>
    </div>
    );
  }
}

export default wallets;