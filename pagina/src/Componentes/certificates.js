import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import {FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap';
import { BiPencil } from "react-icons/bi"
import { BiTrash } from "react-icons/bi"
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { BiSolidPlusCircle } from "react-icons/bi";

const url = "https://apex.oracle.com/pls/apex/jy_apex/ApexCertificates/certificados";



class certificates extends React.Component {

  state = {
    data: [] ,
    modalInsertar: false,
    tipoModal: "",
    form:{
      id_pk: "",
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
        id_pk: domain.id_pk,
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

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      form: {
        ...this.state.form,
        certificate: file,
      },
    });
    console.log(file)
  };
  
  componentDidMount(){
    this.getPetition();
  }

  peticionPost1 = async () => {
    const { form } = this.state;
  
    if (form && form.wallet_fk && form.name && form.certificate) {
      const formData = new FormData();
      formData.append("WALLET_FK", form.wallet_fk);
      formData.append("NAME", form.name);
      formData.append("CERTIFICATE", form.certificate);
  
      try {
        await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        this.modalInsertar();
        this.getPetition();
        swal({text: "The certificate has been inserted", icon: "success", timer:"2000"});  
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill all fields',
      });
      return false;
    }

    return true;

  };
  
  

  peticionDelete = async () => {
    const id = this.state.form.id_pk;
    const deleteUrl = url+"?ID_PK="+id;

    await fetch(deleteUrl, {
      method: 'DELETE',
    }).then (response => {
        this.modalInsertar();
        this.getPetition();
    }).catch(error => {
      console.log(error);
    })
  }


  insertConfirm = async() =>{
      swal({
        title: "Insert",
        text: "Are you sure to insert this certificate?",
        icon: "warning",
        buttons: ["No","Yes"] 
      }).then(respuesta => {
        if(respuesta){
          const result = this.peticionPost1();     
        }
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
        this.peticionDelete();
        swal({text: "The certificate has been deleted", icon: "success", timer:"2000"});        
      }
    })
  }

render(){
  const {form} = this.state;
  
  return(
    <div className='App'>
    <br />
      <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal: 'insert'}); this.modalInsertar()}}>< BiSolidPlusCircle /> Add Certificates</button>
      <br /> <br />
      <table className='table'>
      <thead>
        <tr>
          <th style={{display:'none'}}>id_pk</th>
          <th style={{display: 'none'}} >wallet_fk</th>
          <th>name</th>
          <th>file_name</th>
          <th style={{display: 'none'}} >certificate</th>
          <th style={{display: 'none'}} >download</th>
          <th style={{display: 'none'}} >mime_type</th>
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
      <td style={{display: 'none'}}>{domain.wallet_fk}</td>
      <td>{domain.name}</td>
      <td>{domain.file_name}</td>
      <td style={{display: 'none'}}>{domain.certificate}</td>
      <td style={{display: 'none'}}>{domain.download}</td>
      <td style={{display: 'none'}}>{domain.mime_type}</td>
      <td>{domain.base_domain}</td>
      <td>{domain.acl_description}</td>
      <td>{domain.type_description}</td>
      <td>{domain.description}</td>
      <td>
      <button onClick={()=>{this.domainSelect(domain, "download"); this.modalInsertar()}} className="btn btn-primary" > Download </button>
      {"  "}
      <button className='btn btn-danger' onClick={()=>{this.domainSelect(domain, "delete"); this.modalInsertar()}}><BiTrash /></button>
      </td>
    </tr>
  ))
}
      </tbody>
      </table>
      <form id='myform'>
      <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display: 'block'}}>
          <button className="btn btn-light" style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</button> 
          </ModalHeader>
          <ModalBody>
            <div className='form-group'>
              {this.state.tipoModal === "delete"?
              <div>
              <label htmlFor="wallet_fk">WALLET</label>
              <input className='form-control' readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="wallet_fk" id="wallet_fk" onChange={this.handleChange} value={form?form.wallet_fk: ""}/>
              <br />
              <label htmlFor="name">NAME</label>
              <input className='form-control' readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="name" id="name" onChange={this.handleChange} value={form?form.name: ""}/>
              </div>
              : this.state.tipoModal === "download" ?
              <div>
              <label htmlFor="wallet_fk">WALLET</label>
              <input className='form-control'  readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="wallet_fk" id="wallet_fk" onChange={this.handleChange} value={form?form.wallet_fk: ""}/>
              <br />
              <label htmlFor="name">NAME</label>
              <input className='form-control'  readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="name" id="name" onChange={this.handleChange} value={form?form.name: ""}/>
              <br />
              <label htmlFor="certificate">CERTIFICATE</label>
              <input  disabled className='form-control'  readOnly style={{backgroundColor: '#f2f2f2', color:'#888888'}} type='text' name="certificate" id="certificate" onChange={this.handleFileChange} value={null}/>
              <br /> 
              </div>
              :
              <div>
              <label htmlFor="wallet_fk">WALLET</label>
              <input className='form-control' type='text' name="wallet_fk" id="wallet_fk" onChange={this.handleChange} value={form?form.wallet_fk: ""}/>
              <br />
              <label htmlFor="name">NAME</label>
              <input className='form-control' type='text' name="name" id="name" onChange={this.handleChange} value={form?form.name: ""}/>
              <br />
              <label htmlFor="certificate">CERTIFICATE</label>
              <input className='form-control' type='file' name="certificate" id="certificate" onChange={this.handleFileChange} value={null}/>
              <br /> 
              </div>
              } 
            </div>
          </ModalBody>
          <ModalFooter>
          {this.state.tipoModal === "download"?
            <button className='btn btn-primary' onClick={()=>this.updateConfirm()}>
            download
          </button> : this.state.tipoModal === "delete" ?
          <button className='btn btn-warning' onClick={()=>this.deleteConfirm()}>
          delete
        </button> :
            <button className='btn btn-success' onClick={()=>{this.insertConfirm();}}>
              Insert
            </button> 
            }
            <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>cancelar</button>
          </ModalFooter>
      </Modal>
      </form>
    </div>
    );
  }
}

export default certificates;