import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const LoginRegistro = () => {

    //Para Formulario de Registro
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");

    //Para Formulario de Inicio de Sesión
    const [emailLogin, setEmailLogin] = useState("");
    const [contraseñaLogin, setContraseñaLogin] = useState("");

    const [errorRegistro, setErrorsRegistro] = useState({});
    /*
    errorRegistro = {
        nombre: {
            message: "El nombre es obligatorio."
        },
        email: {
            message: "El correo no es válido",
        }
        contraseña: {
            message: "El contraseña debe tener 8 caracteres."
        }
    }
    */
    const [errorLogin, setErrorLogin] = useState("");

    const history = useHistory();

    const registro = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/registro',{
            nombre,
            apellido,
            email,
            contraseña,
            confirmarContraseña
        }, {withCredentials: true})
            .then(res => history.push('/'))
            .catch(err => setErrorsRegistro(err.response.data.errors));
    }

    const login = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email: emailLogin,
            contraseña: contraseñaLogin
        }, {withCredentials: true})
            .then(res => {
                if(res.data.error) {
                    setErrorLogin(res.data.message);
                } else {
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="row, contenedor" >
            <div className="col-6">
                <h2>Welcome to Pirate Crew</h2> 
                <form onSubmit={registro}>
                    <div className="form-group">
                        <label htmlFor="nombre">First Name</label>
                        <input  type="text"
                                name="nombre"
                                id="nombre"
                                className="form-control"
                                value={nombre}
                                onChange={e=> setNombre(e.target.value)}  />
                        {errorRegistro.nombre ? <span className="text-danger">{errorRegistro.nombre.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Last Name</label>
                        <input type="text" name="apellido" id="apellido" className="form-control" value={apellido} onChange={e=> setApellido(e.target.value)}  />
                        {errorRegistro.apellido ? <span className="text-danger">{errorRegistro.apellido.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)}  />
                        {errorRegistro.email ? <span className="text-danger">{errorRegistro.email.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseña">Password</label>
                        <input type="password" name="contraseña" id="contraseña" className="form-control" value={contraseña} onChange={e=> setContraseña(e.target.value)}  />
                        {errorRegistro.contraseña ? <span className="text-danger">{errorRegistro.contraseña.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmarContraseña">Confirm Password</label>
                        <input type="password" name="confirmarContraseña" id="confirmarContraseña" className="form-control" value={confirmarContraseña} onChange={e=> setConfirmarContraseña(e.target.value)}  />
                        {errorRegistro.confirmarContraseña ? <span className="text-danger">{errorRegistro.confirmarContraseña.message}</span> : null}
                    </div>
                    <input type="submit" value="Registarme" className="btn btn-primary" />
                </form>
            </div>
            <div className="col-6">
                <h2>Login</h2>
                <form onSubmit={login}>
                    <div className="form-group">
                        <label htmlFor="emailLogin">E-mail</label>
                        <input type="email" name="emailLogin" id="emailLogin" className="form-control" value={emailLogin} onChange={e=>setEmailLogin(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseñaLogin">Password</label>
                        <input type="password" name="contraseñaLogin" id="contraseñaLogin" className="form-control" value={contraseñaLogin} onChange={e=>setContraseñaLogin(e.target.value)} />
                    </div>
                    <div>
                        {errorLogin !== "" ? <span className="text-danger">{errorLogin}</span> : null }
                    </div>
                    <input type="submit" value="Login" className="btn btn-info" />
                </form>
            </div>
        </div>
    )

}

export default LoginRegistro;