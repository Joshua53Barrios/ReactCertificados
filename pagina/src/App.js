import React from 'react';
import './App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { BiPencil } from "react-icons/bi"
import { BiTrash } from "react-icons/bi"


const url = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/Dominios";

class App extends React.Component {

  state = {
    data: [] ,
    modalInsertar: false,
    tipoModal: "",
    form:{
      acl_description: "",
      base_domain: "",
      description: "",
      type_description: "",
      wallet_password: "",
      walleth_path: ""
    }
  }

  getPetition = () => {
    axios.get(url).then(response => {
      console.log('API OBTENIDA');
      this.setState({ data:response.data.items });
    }).catch(error =>{
      console.log(error);
    })
  }

  postPetition = async() => {
    await axios.post(url,this.state.form).then(response => {
      this.modalInsertar();
      this.getPetition();
      console.log(this.state.form)
    }).catch(error=>{
      console.log(error.message);
    })
    console.log(this.state.form);
  }

  putPetition = () =>{
    axios.put(url+this.state.form.acl_description, this.state.form).then(response=>{
      this.modalInsertar();
      this.getPetition();
    })
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  domainSelect = (domain) =>{
    this.setState({
      tipoModal: "update",
      form: {
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
      <td>{domain.acl_description}</td>
      <td>{domain.base_domain}</td>
      <td>{domain.description}</td>
      <td>{domain.published}</td>
      <td>{domain.type_description}</td>
      <td>{domain.wallet_password}</td>
      <td>{domain.walleth_path}</td>
      <td>
          <button className='btn btn-primary' onClick={()=>{this.domainSelect(domain); this.modalInsertar()}}><BiPencil /></button>
          {"  "}
          <button className='btn btn-danger'><BiTrash /></button>
      </td>
    </tr>
  ))
}

      </tbody>
      </table>

      <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className='form-group'>
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
              <input className='form-control' type='text' name="type_description" id="type_description" onChange={this.handleChange} value={form?form.type_description:""} />
              <br />
              <label htmlFor="wallet_password">wallet_password</label>
              <input className='form-control' type='text' name="wallet_password" id="wallet_password" onChange={this.handleChange} value={form?form.wallet_password:""} />
              <br />
              <label htmlFor="walleth_path">walleth_path</label>
              <input className='form-control' type='text' name="walleth_path" id="walleth_path" onChange={this.handleChange} value={form?form.walleth_path:""} />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal == "update"?
            <button className='btn btn-primary' onClick={()=>this.putPetition()}>
            update
          </button> :
            <button className='btn btn-success' onClick={()=>this.postPetition()}>
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

export default App;
