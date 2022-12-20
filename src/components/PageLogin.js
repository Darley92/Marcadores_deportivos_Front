import React, { Component } from "react";
import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Cookies from "universal-cookie";

const url = "http://localhost:5000/usuarios";

const cookies = new Cookies();

class PageLogin extends Component {
  state = {
    form: {
      name:'',
      pwd:''
    }
  }

  handleChange = async e => {  /// función para capturar os datos del usuario. Es en 2do plano debe ser asincrona
    await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
      form: {
        ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
        [e.target.name]:e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
      }
    })
    console.log(this.state.form);  /// probar por consola lo que se guarda
  }

  iniciarSesion = async()=>{
    let name=this.state.form.name
    let pwd=this.state.form.pwd
    if(name === '' || pwd === ''){
      alert('Se requieren todos los datos')
      return 'Datos vacios'
    }
    console.log(name)
    console.log(pwd)

    await axios.get(url+"/"+name+"/"+pwd)
      .then(response=>{
        //console.log(response.data)
        return response.data
      }).then(response=>{
          console.log(response)
        if(response){
          cookies.set("_id",response._id,{path:"/"})
          cookies.set("usu_email",response.usu_email,{path:"/"})
          cookies.set("usu_nombres",response.usu_nombres,{path:"/"})
          cookies.set("usu_apellidos",response.usu_apellidos,{path:"/"})
          cookies.set("per_id",response.per_id,{path:"/"})
          //console.log(response.per_id)
          alert("Bienvenid@ "+response.usu_nombres)
          this.setState()
          window.location.href='./PageInicio'
        }else{
          //alert("Verificar usuario y/o contraseña")
        }
      })
      .catch(error=>{
        alert("Verificar usuario y/o contraseña")
        console.log(error)
      })
  }

  render() {
    return (
      <div className="containerPrincipal">
      <div className="containerSecundario">
        <div className="form-group">
          <h1>Bienvenido!</h1>
          <h8>Ir a marcadores deportivos</h8>
          <br />
          <br />
        <label>Usuario</label>
        <br />
        <input
            type="text"
            className="form-control"
            name="name"
            onChange={this.handleChange}
          />
          <br />
          <label>Contraseña</label>
        <br />
        <input
            type="password"
            className="form-control"
            name="pwd"
            onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary"onClick={()=> this.iniciarSesion()}>Iniciar sesión</button>
      </div>
      </div>
      </div>
    );
  }
}

export default PageLogin;