import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import {FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';
import { BiPencil } from "react-icons/bi"
import { BiTrash } from "react-icons/bi"
import swal from 'sweetalert'
import './wallets.css'
const url = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/Dominios";
const urlSD = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/DominiosSD";



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
  }


  peticionPut = async() => {
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
        this.peticionPut();
        swal({text: "The certificate has been edited", icon: "success", timer:"2000"});        
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
        this.peticionPost();
        swal({text: "The certificate has been inserted", icon: "success", timer:"2000"});        
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
      this.state.data.map(domain => (
    <tr key={domain.description}>
      <td style={{display: 'none'}}>{domain.id_pk}</td>
      <td>{domain.acl_description}</td>
      <td>{domain.base_domain}</td>
      <td>{domain.description}</td>
      <td>{domain.published}</td>
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