///import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Component } from "react";


const url = "http://localhost:9000/api/usuarios";

class App extends Component {

  state = { 
    data:[], 
    modalInsertar: false,
    form:{
      usu_id:'',
      usu_email:'',
      usu_clave:'',
      usu_nombres:'',
      usu_apellidos:''
    }
  
  };


  peticionGet = () => {
    axios.get(url).then((response) => {
      //console.log(response.data);
      this.setState({data: response.data})
    })
    .catch(error =>{
      console.log(error.message)
    })
  };

  peticionPost = async ()=>{
    delete this.state.form.usu_id
    await axios.post(url,this.state.form).then(response =>{
      this.modalInsertar() ///cerrar el modal form
      this.peticionGet()
    }).catch(error =>{
      console.log(error.message)
    })

  }

  modalInsertar=()=>{
    this.setState({modalInsertar: ! this.state.modalInsertar})
  }

  handleChange=async e=>{  /// función para capturar os datos del usuario. Es en 2do plano debe ser asincrona
    e.persist();           /// y por reso debemos especificar persistencia
    await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
      form:{
        ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
        [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
      }
    });
    console.log(this.state.form);  /// probar por consola lo que se guarda
    }

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <button className="btn btn-success" onClick={() => this.modalInsertar()}>Agregar Usuario</button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(usuario => {
              return (
                <tr>
                  <td>{usuario.usu_id}</td>
                  <td>{usuario.usu_email}</td>
                  <td>{usuario.usu_clave}</td>
                  <td>{usuario.usu_nombres}</td>
                  <td>{usuario.usu_apellidos}</td>
                  <td>
                    <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
                    {"  "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display:'block'}}>


          </ModalHeader>
          <ModalBody>
            <div>
              <label htmlFor="usu_id">ID</label>
              <input 
              value={this.state.data.length+1}
              className="form-control" 
              type="text" 
              name="usu_id" 
              id="usu_id" 
              readOnly 
              onChange={this.handleChange}>
              </input>
              <br />
              <label htmlFor="usu_email">Email</label>
              <input className="form-control" 
              type="text" 
              name="usu_email" 
              id="usu_email" 
              onChange={this.handleChange}>
              </input>
              <br />
              <label htmlFor="usu_clave">Clave</label>
              <input className="form-control" 
              type="text" 
              name="usu_clave" 
              id="usu_clave" 
              onChange={this.handleChange}></input>
              <br />
              <label htmlFor="usu_nombres">Nombres</label>
              <input className="form-control" 
              type="text" 
              name="usu_nombres" 
              id="usu_nombres" 
              onChange={this.handleChange}></input>
              <br />
              <label htmlFor="usu_apellidos">Apellidos</label>
              <input className="form-control" 
              type="text" 
              name="usu_apellidos" 
              id="usu_apellidos" 
              onChange={this.handleChange}></input>
              <br />
            </div>

          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>

          </ModalFooter>
        </Modal>



      </div>
    );
  }
}

export default App;
