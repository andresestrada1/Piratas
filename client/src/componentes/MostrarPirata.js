import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



const MostrarPirata = () => {

    const {id} = useParams();

    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");
    const [pataDePalo, setPataDePalo] = useState(true);
    const [parcheOjo, setParcheOjo] = useState(true);
    const [gancho, setGancho] = useState(true);
    const [cofres, setCofres] = useState(0)
    const [posicion, setPosicion] = useState("")

    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8000/api/piratas/"+id, {withCredentials: true})
            .then(res => {
                setNombre(res.data.nombre);
                setImagen(res.data.imagen);
                setPataDePalo(res.data.pataDePalo);
                setParcheOjo(res.data.parcheOjo);
                setGancho(res.data.gancho);
                setCofres(res.data.cofresDeTesoro);
                setPosicion(res.data.posicion)
            })
            .catch(err => history.push('/error'));
    }, [id, history])

    return (
        <div >
        <div className="contenedor">
            <div className="titulo">
                <h1>Deep Sea Davy</h1>
            </div>
            <div className="pirata">
                <div className="imagen">
                    <img src={imagen} alt="pirata" className="img-fluid" />
                    <h1>{nombre}</h1>
                </div>
                <div className="informacion">
                    <h2><span className="subtitulo">About</span></h2>
                    Position: {posicion}
                    <br />
                    <br/>
                    Treasures: {cofres}
                    <br />
                    <br/>
                    Peg Leg: {pataDePalo ? <p>Si</p> : <p>No</p>}
                    <br />
                    Eye Patch: {parcheOjo ? <p>Si</p> : <p>No</p>}
                    <br />
                    Hook Hand: {gancho ? <p>Si</p> : <p>No</p>}
                </div>

            </div>


            <span className="boton"><Link  to="/">Home</Link></span>
        </div>
        </div>
    )

}

export default MostrarPirata;