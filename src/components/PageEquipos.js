import React, { Component } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const url = "http://localhost:5000/equipos";

class PageEquipos extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            _id: '',
            equi_nombre: ''
        }
    };

    peticionGet = () => {
        axios.get(url).then((response) => {
            //console.log(response.data);
            this.setState({ data: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionPost = async () => {
        delete this.state.form._id
        await axios.post(url, this.state.form).then((response) => {
            this.modalInsertar() //cerramos la modal form
            this.peticionGet()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionPut = () => {
        console.log(url + '/' + this.state.form._id)
        axios.put(url + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalInsertar() //cerramos la modal form
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionDelete = () => {
        console.log(url + '/' + this.state.form._id)
        axios.delete(url + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalEliminar() //cerramos la modal form
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    seleccionarEquipo = (equipo) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: equipo._id,
                equi_nombre: equipo.equi_nombre
            }
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar })
    }

    modalEliminar = () => {
        this.setState({ modalEliminar: !this.state.modalEliminar })
    }

    handleChange = async e => {  /// función para capturar os datos del usuario. Es en 2do plano debe ser asincrona
        e.persist();           /// y por reso debemos especificar persistencia
        await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
            form: {
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

        const form = this.state.form

        return (
            <div className="App">
                <div className="table_title"><h1>Equipos registrados</h1></div>
                <br />
                <table className="table ">
                <div className="containertabla">
                    <thead>
                        <tr>
                            <th className="td">ID</th>
                            <th className="td">Nombre</th>
                            <th className="td">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((equipo) => {
                            return (
                                <tr>
                                    <td className="td">{equipo._id}</td>
                                    <td className="td">{equipo.equi_nombre}</td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <FontAwesomeIcon icon={faEdit} onClick={() => { this.seleccionarEquipo(equipo); this.modalInsertar() }} />
                                        </button>
                                        {"  "}
                                        <button className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => { this.seleccionarEquipo(equipo); this.modalEliminar() }} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </div>
                </table>
                <div className="button-item">
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Equipo</button>
                </div>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>

                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <input
                                className="form-control"
                                type="hidden"
                                name="_id"
                                id="_id"
                                readOnly // Solo lectura
                                onChange={this.handleChange}
                                value={form ? form._id : this.state.data.length + 1}
                            ></input>
                            <label htmlFor="equi_nombre">Nombres</label>
                            <input
                                className="form-control"
                                type="text"
                                name="equi_nombre"
                                id="equi_nombre"
                                onChange={this.handleChange}
                                value={form ? form.equi_nombre: ''}
                            ></input>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.tipoModal === 'insertar' ?
                                <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
                                : <button className="btn btn-success" onClick={() => this.peticionPut()}>Modificar</button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estas segur@ que deseas eliminar?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
                        <button className="btn btn-success" onClick={() => this.modalEliminar()}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PageEquipos;