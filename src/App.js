import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Component } from "react";

const url = "http://localhost:9000/api/usuarios";

class App extends Component {
  state = { data: [] };
  peticionGet = () => {
    axios.get(url).then((response) => {
      //console.log(response.data);
      this.setState({data: response.data})
    });
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <button className="btn btn-success">Agregar Usuario</button>
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
      </div>
    );
  }
}

export default App;
