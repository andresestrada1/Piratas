import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

const MostrarPiratas = () => {

    const [piratas, setPiratas] = useState([]);

    const history = useHistory()

    useEffect(() => {
        axios.get("http://localhost:8000/api/piratas", {withCredentials: true})
            .then(res => setPiratas(res.data))
            .catch(err => {
                if(err.response.status === 401) {
                    history.push('/login');
                }
            });
    }, [history])

    const eliminarPirata = id => {
        axios.delete("http://localhost:8000/api/piratas/"+id, {withCredentials: true})
            .then(res => {
                //Actualizar la lista de piratas por medio de filter
                let nuevaLista = piratas.filter(pirata => pirata._id !== id);
                setPiratas(nuevaLista);
            })
    }

    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => history.push('/login'))
            .catch(err => console.log(err));
    }

    return (
        <div className="contenedor">
            <div className="titulo2">
                <h1><span className="crew">Pirate Crew</span></h1><Link to="/crear_pirata" className="btn">Add Pirate</Link>
            </div>
            
            <br/>
            <button className="btn btn-danger float-right" onClick={cerrarSesion}>Sign off</button>
            <div className="contenedor3">
                {
                    piratas.map((pirata, index) => (
                        <div key={index}>
                            <img src={pirata.imagen} alt="pirata" className="img-fluid" />
                            <h2>{pirata.nombre}</h2>
                            <div className="felipe">
                                <br/>
                                <Link className="btn" to={`/pirata/${pirata._id}`}>View Pirate</Link>
                                <button className="danger" onClick={() => eliminarPirata(pirata._id)} >Walk the Plank</button>
                            </div>
                            <br/><br/>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default MostrarPiratas;