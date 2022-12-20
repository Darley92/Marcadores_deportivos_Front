import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"

const url = "http://localhost:5000/marcadores/5";
const url2 = "http://localhost:5000/deportes";

class PageInicio extends Component {

    state = {
        form: {
            _id: '',
            dep_nombre: ''
        },
        data: [],
        data2: []
    };

    peticionGet = () => {
        axios.get(url).then((response) => {        
            this.setState({ data: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionGet2 = () => {
        axios.get(url2).then((response) => {
            //console.log(response.data);
            this.setState({ data2: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };
    seleccionarMenu = (Menu) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: Menu._id,
                dep_nombre: Menu.dep_nombre
            }
        })
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
        this.peticionGet2();
    }

    render() {

        return (
            <div className="App">
                <div className="table_title"><h1>Eventos recientes</h1></div>
                <form>
                    <select class="form-select"
                        aria-label="Default select example"
                        onChange={this.handleChange}>
                            <sel>
                        <option selected>seleccionar</option>
                        </sel>
                        {this.state.data2.map((Menu) => {
                            return (
                                <option value={Menu._id}>{Menu.dep_nombre}</option>
                            );
                        })}
                    </select>
                    <br />
                </form>
                <table class="table table-responsive table-bordered">
                    <div className="containertabla">
                        <thead>
                            <tr>
                                <th className="td">Deporte</th>
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
                                        <td className="td">{evento.deporte}</td>
                                        <td className="td">{evento.equi1}</td>
                                        <td className="td">{evento.marca1}</td>
                                        <td className="td">{evento.equi2}</td>
                                        <td className="td">{evento.marca2}</td>
                                        <td>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </div>
                </table>
            </div>
        );
    }
}

export default PageInicio;