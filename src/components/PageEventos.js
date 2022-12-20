import React, { Component } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faListSquares, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

const url = "http://localhost:5000/marcadores";
const url2 = "http://localhost:5000/deportes";
const url3 = "http://localhost:5000/equipos";
const url4 = "http://localhost:5000/marcadores/5";

const cookies = new Cookies();

class PageEventos extends Component {

    state = {
        usuadmin: false,
        data: [],
        data2: [],
        data3: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            dep_id: '',
            usu_id: '',
            mar_fechaEvento: '',
            mar_horaEvento: '',
            mar_fechaRegistro: '',
            mar_horaRegistro: '',
            equi_id: '',
            equi_id2: '',
            mar_marcadoresqui1: '',
            mar_marcadoresqui2: ''
        },
        form2: {
            _id: '',
            dep_nombre: ''
        },
        form3: {
            _id: '',
            equi_nombre: ''
        },

        stateLogin: false
    };

    cerrarSesion() {
        ///let salir=confirm("Deseas cerrar sesión?")
        //if(confirm('Realmente deseas cerrar sesión?')){return}
        cookies.remove("usu_id", { path: "/" })
        cookies.remove("usu_email", { path: "/" })
        cookies.remove("usu_nombres", { path: "/" })
        cookies.remove("usu_apellidos", { path: "/" })
        cookies.remove("per_id", { path: "/" })
        //window.location.href="./"
        this.setState({ stateLogin: false })
        this.setState({ usuadmin: false })
    }

    peticionGet2 = () => {
        axios.get(url2).then((response) => {
            //console.log(response.data);
            this.setState({ data2: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionGet3 = () => {
        axios.get(url3).then((response) => {
            //console.log(response.data);
            this.setState({ data3: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    seleccionarEquipos = (Equipos) => {
        this.setState({
            tipoModal: 'actualizar',
            form3: {
                _id: Equipos._id,
                equi_nombre: Equipos.equi_nombre
            }
        })
    }


    seleccionarDeportes = (Deportes) => {
        this.setState({
            tipoModal: 'actualizar',
            form2: {
                _id: Deportes._id,
                dep_nombre: Deportes.dep_nombre
            }
        })
    }

    peticionGet = () => {
        axios.get(url4).then((response) => {
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

    seleccionarEvento = (evento) => {
        this.setState({
            tipoModal: 'actualizar',
            form4: {
                _id: evento._id,
                fecha: evento.fecha,
                horaEvento: evento.horaEvento,
                fechaRegistro: evento.fechaRegistro,
                horaRegistro: evento.horaRegistro,
                equi1: evento.equi1,
                equi2: evento.equi2,
                marca1: evento.marca1,
                marca2: evento.marca2,
                deporte: evento.deporte,
                usuario: evento.usuario,
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
        if (cookies.get("usu_nombres")) {
            this.setState({ stateLogin: true })
        } else {
            this.setState({ stateLogin: false })
            //window.location.href="./" ///redirigir al inicio
        }
        console.log(this.state.stateLogin)
        if (cookies.get("per_id") === "639e6e2ae186e97c01464ddd") {
            this.setState({ usuadmin: true })
        }
        else {
            this.setState({ usuadmin: false })
        }

        this.peticionGet();
        this.peticionGet2();
        this.peticionGet3();
    }

    render() {

        const form = this.state.form

        return (
            <div className="App">
                <div className="table_title"><h1>Eventos registrados</h1>
                </div>
                <br />
                <table className="table ">
                    <div className="containertabla">
                        <thead>
                            <tr>
                                <th hidden={!this.state.usuadmin} className="td">ID</th>
                                <th className="td">Deporte</th>
                                <th hidden={!this.state.usuadmin} className="td">Usuario</th>
                                <th hidden={!this.state.usuadmin} className="td">Fecha Evento</th>
                                <th hidden={!this.state.usuadmin} className="td">Hora Evento</th>
                                <th hidden={!this.state.usuadmin} className="td">Fecha Registro</th>
                                <th hidden={!this.state.usuadmin} className="td">Hora Registro</th>
                                <th className="td">Equipo 1</th>
                                <th className="td">Marcador Equipo 1</th>
                                <th className="td">Equipo 2</th>
                                <th className="td">Marcador Equipo 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((evento) => {
                                return (
                                    <tr>
                                        <td hidden={!this.state.usuadmin} className="td">{evento._id}</td>
                                        <td className="td">{evento.deporte}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.usuario}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.fecha}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.horaEvento}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.fechaRegistro}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.horaRegistro}</td>
                                        <td className="td">{evento.equi1}</td>
                                        <td className="td">{evento.marca1}</td>
                                        <td className="td">{evento.equi2}</td>
                                        <td className="td">{evento.marca2}</td>
                                        <td>
                                            <button className="btn btn-primary">
                                                <FontAwesomeIcon icon={faEdit} hidden={!this.state.stateLogin} onClick={() => { this.seleccionarEvento(evento); this.modalInsertar() }} />
                                            </button>
                                            {"  "}
                                            <button className="btn btn-danger">
                                                <FontAwesomeIcon icon={faTrashAlt} hidden={!this.state.usuadmin} onClick={() => { this.seleccionarEvento(evento); this.modalEliminar() }} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </div>
                </table>
                <div className="button-item">
                    <button className="btn btn-success" hidden={!this.state.usuadmin} onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Evento</button>
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

                            <label htmlFor="mar_id">id evento</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_id"
                                id="mar_id"
                                onChange={this.handleChange}
                                value={form ? form.mar_id : ''}
                            ></input>

                            <label htmlFor="dep_id" hidden={!this.state.usuadmin}>Deporte</label>
                            <select class="form-select" hidden={!this.state.usuadmin}
                                value={form ? form.dep_id : ''}
                                aria-label="Default select example"
                                onChange={this.handleChange}>
                                <option selected >seleccionar</option>
                                {this.state.data2.map((Deportes) => {
                                    return (
                                        <option value={Deportes._id}>{Deportes.dep_nombre}</option>
                                    );

                                })}
                            </select>

                            <label htmlFor="mar_fechaEvento" hidden={!this.state.usuadmin}>Fecha Evento</label>
                            <input hidden={!this.state.usuadmin}
                                className="form-control"
                                type="date"
                                name="mar_fechaEvento"
                                id="mar_fechaEvento"
                                onChange={this.handleChange}
                                value={form ? form.mar_fechaEvento : ''}
                            ></input>
                            <label htmlFor="mar_horaEvento" hidden={!this.state.usuadmin}>Hora Evento</label>
                            <input hidden={!this.state.usuadmin}
                                className="form-control"
                                type="time"
                                name="mar_horaEvento"
                                id="mar_horaEvento"
                                onChange={this.handleChange}
                                value={form ? form.mar_horaEvento : ''}
                            ></input>
                            <label htmlFor="mar_fechaRegistro" hidden={!this.state.usuadmin}>Fecha Registro</label>
                            <input hidden={!this.state.usuadmin}
                                className="form-control"
                                type="date"
                                name="mar_fechaRegistro"
                                id="mar_fechaRegistro"
                                onChange={this.handleChange}
                                value={form ? form.mar_fechaRegistro : ''}
                            ></input>

                            <label htmlFor="mar_horaRegistro" hidden={!this.state.usuadmin}>Hora Registro</label>
                            <input hidden={!this.state.usuadmin}
                                className="form-control"
                                type="time"
                                name="mar_horaRegistro"
                                id="mar_horaRegistro"
                                onChange={this.handleChange}
                                value={form ? form.mar_horaRegistro : ''}
                            ></input>

                            <label htmlFor="equi_id" hidden={!this.state.usuadmin}>Equipo 1</label>
                            <select class="form-select" hidden={!this.state.usuadmin}
                                value={form ? form.equi_id : ''}
                                aria-label="Default select example"
                                onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data3.map((Equipos) => {
                                    return (
                                        <option value={Equipos._id}>{Equipos.equi_nombre}</option>

                                    );

                                })}
                            </select>

                            <label htmlFor="mar_marcadoresqui1">Marcador Equipo 1</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_marcadoresqui1"
                                id="mar_marcadoresqui1"
                                onChange={this.handleChange}
                                value={form ? form.mar_marcadoresqui1 : ''}
                            ></input>

                            <label htmlFor="equi_id2" hidden={!this.state.usuadmin}>Equipo 2</label>
                            <select class="form-select" hidden={!this.state.usuadmin}
                                value={form ? form.equi_id2 : ''}
                                aria-label="Default select example" onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data3.map((Equipos) => {
                                    return (
                                        <option value={Equipos._id}>{Equipos.equi_nombre}</option>
                                    );
                                })}
                            </select>

                            <label htmlFor="mar_marcadoresqui2">Marcador Equipo 2</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_marcadoresqui2"
                                id="mar_marcadoresqui2"
                                onChange={this.handleChange}
                                value={form ? form.mar_marcadoresqui2 : ''}
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

export default PageEventos;