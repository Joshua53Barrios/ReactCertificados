import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import {FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';
import { BiPencil } from "react-icons/bi"
import { BiTrash } from "react-icons/bi"
import { BiSolidPlusCircle } from "react-icons/bi";

import swal from 'sweetalert'
import Swal from 'sweetalert2'
import './wallets.css'
const url = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/Dominios";
const urlSD = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/DominiosSD";
const urldw = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/CertificadosDW?ID_PK=181"

class wallets extends React.Component {

  state = {
    data: [] ,
    modalInsertar: false,
    tipoModal: "",
    form:{
      id_pk : "",
      acl_description: "",
      base_domain: "",
      description: "",
      type_description: "",
      wallet_password: "",
      walleth_path: "",
      published: ""
    }
  }

  // Llama a la función para hacer la solicitud POST
  
  peticionPost = async() => {

    const { form } = this.state

    if (form && form.acl_description && form.base_domain && form.description && form.type_description && form.wallet_password && form.walleth_path) {
      await fetch(url, {method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify({
        "TYPE_DESCRIPTION" : this.state.form.type_description,
        "ACL_DESCRIPTION" : this.state.form.acl_description,
        "BASE_DOMAIN" : this.state.form.base_domain,
        "WALLETH_PATH" : this.state.form.walleth_path,
        "DESCRIPTION" : this.state.form.description,
        "WALLET_PASSWORD" : this.state.form.wallet_password
      })}).then(response =>{
        this.modalInsertar();
        this.getPetition();
      })
      swal({text: "The certificate has been inserted", icon: "success", timer:"2000"});  
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill all fields',
      });
      return false;
    }

    
  }


  peticionPut = async() => {
    const { form } = this.state
    if (form && form.acl_description && form.base_domain && form.description && form.type_description && form.wallet_password && form.walleth_path){
    await fetch(url, {method: 'PUT', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ID_PK" : this.state.form.id_pk,
      "TYPE_DESCRIPTION" : this.state.form.type_description,
      "ACL_DESCRIPTION" : this.state.form.acl_description,
      "BASE_DOMAIN" : this.state.form.base_domain,
      "WALLETH_PATH" : this.state.form.walleth_path,
      "DESCRIPTION" : this.state.form.description,
      "WALLET_PASSWORD" : this.state.form.wallet_password
    })}).then(response =>{
      this.modalInsertar();
      this.getPetition();
    }) 
    swal({text: "The certificate has been edited", icon: "success", timer:"2000"});   
  } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill all fields',
      });
    }
  }

  deleteConfirm = () =>{
    swal({
      title: "Delete",
      text: "Are you sure to delete this certificate?",
      icon: "warning",
      buttons: ["No","Yes"] 
    }).then(respuesta => {
      if(respuesta){
        this.peticionPutSd();
        swal({text: "The certificate has been deleted", icon: "success", timer:"2000"});        
      }
    })
  }

  updateConfirm = () =>{
    swal({
      title: "Update",
      text: "Are you sure to edit this certificate?",
      icon: "warning",
      buttons: ["No","Yes"] 
    }).then(respuesta => {
      if(respuesta){
       const result = this.peticionPut();     
      }
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
        const result = this.peticionPost();
      }
    })
  }


  peticionPutSd = async() => {
    await fetch(urlSD, {method: 'PUT',
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "ID_PK" : this.state.form.id_pk
  })}).then(response =>{
    this.modalInsertar();
    this.getPetition();
  })
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

  /*postPetition = async() => {
    await axios.post(url, {data: this.state.form},  {
      headers: {
        'Content-Type': 'application/json'
      }
    } ).then(response => {
      this.modalInsertar();
      this.getPetition();
      console.log(this.state.form)
    }).catch(error=>{
      console.log(error.message);
    })
  } 

  putPetition = () =>{
    axios.put(url, this.state.form).then(response=>{
      this.modalInsertar();
      this.getPetition();
    })
  } */

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  domainSelect = (domain, tipoModal) =>{
    this.setState({
      tipoModal: tipoModal,
      form: {
        id_pk : domain.id_pk,
        acl_description: domain.acl_description,
        base_domain: domain.base_domain,
        description: domain.description,
        type_description: domain.type_description,
        wallet_password: domain.wallet_password,
        walleth_path: domain.walleth_path
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

  descargarArchivo = () => {
    axios
    .get(urldw, {
      responseType: "json",
    })
    .then(function (response) {
      console.log(response.data.items);
    });
  }

render(){
  const {form} = this.state;
  
  return(
    <div className='App'>
    <br />
      <div id='breadcrumb'>
      <h1>Wallets</h1>
      <button className='btn btn-success' style={{width:'80px', height:'50px' }} onClick={()=>{this.setState({form: null, tipoModal: 'insert'}); this.modalInsertar()}}> Add <BiSolidPlusCircle/></button>
      </div>
      <br /> <br />
      <table className='table'>
      <thead>
        <tr>
          <th style={{display:'none'}}>id_pk</th>
          <th>ACL</th>
          <th>Base Domain</th>
          <th>Description</th>
          <th>Published</th>
          <th>Type</th>
          <th>Password</th>
          <th>Path</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
      {
      this.state.data.map(domain => (
    <tr key={domain.id_pk}>
      <td style={{display: 'none'}}>{domain.id_pk}</td>
      <td>{domain.acl_description}</td>
      <td>{domain.base_domain}</td>
      <td>{domain.description}</td>
      <td>{domain.published === 'Y' ? 'Yes' : 'No'}</td>
      <td>{domain.type_description}</td>
      <td>{domain.wallet_password}</td>
      <td>{domain.walleth_path}</td>
      <td>
          <button className='btn btn-primary' onClick={()=>{this.domainSelect(domain, "update"); this.modalInsertar()}}><BiPencil /></button>
          {"  "}
          <button className='btn btn-danger' onClick={()=>{this.domainSelect(domain, "delete"); this.modalInsertar()}}><BiTrash /></button>
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
              <label htmlFor="acl_description">ACL Description</label>
              <input className='form-control' type='text' name="acl_description" id="acl_description" onChange={this.handleChange} value={form?form.acl_description: ""}/>
              <br />
              <label htmlFor="base_domain">Domain</label>
              <input className='form-control' type='text' name="base_domain" id="base_domain" onChange={this.handleChange} value={form?form.base_domain: ""}/>
              <br />
              <label htmlFor="description">description</label>
              <input className='form-control' type='text' name="description" id="description" onChange={this.handleChange} value={form?form.description:""}/>
              <br />
              <label htmlFor="type_description">type_description</label>
              <FormGroup>
              <Input className='form-select form-select-sm' type='select' name="type_description" id="type_description" onChange={this.handleChange} value={form?form.type_description:""}>
              <option selected>Select a option</option>
              <option value={'REST'}>REST</option>
              <option value={'SOAP'}>SOAP</option>
              </Input>
              </FormGroup>
              <br /> 
              </div>
              } 
              {this.state.tipoModal === "update" || this.state.tipoModal === "delete"? 
              <div>
              <label htmlFor="wallet_password" >wallet_password</label>
              <input className='form-control' readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="wallet_password" id="wallet_password" onChange={this.handleChange} value={form?form.wallet_password:""} />
              <br />
              <label htmlFor="walleth_path" >walleth_path</label>
              <input className='form-control' readOnly  style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="walleth_path" id="walleth_path" onChange={this.handleChange} value={form?form.walleth_path:""} />
              </div>
               : 
               <div>
              <label htmlFor="wallet_password">wallet_password</label>
              <input className='form-control' type='text' name="wallet_password" id="wallet_password" onChange={this.handleChange} value={form?form.wallet_password:""} />
              <br />
              <label htmlFor="walleth_path">walleth_path</label>
              <input className='form-control' type='text' name="walleth_path" id="walleth_path" onChange={this.handleChange} value={form?form.walleth_path:""} />
              </div>
              }
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === "update"?
            <button className='btn btn-primary' onClick={()=>this.updateConfirm()}>
            Update
          </button> : this.state.tipoModal === "delete" ?
          <button className='btn btn-warning' onClick={()=>this.deleteConfirm()}>
          Delete
        </button> :
            <button className='btn btn-success' onClick={()=>this.insertConfirm()}>
              Insert
            </button> 
            }
            <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>
              Cancel
            </button>
          </ModalFooter>
      </Modal>

    </div>
    );
  }
}

export default wallets;