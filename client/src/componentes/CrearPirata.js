import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const CrearPirata = () => {

    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");
    const [pataDePalo, setPataDePalo] = useState(true);
    const [parcheOjo, setParcheOjo] = useState(true);
    const [gancho, setGancho] = useState(true);
    const [cofresDeTesoro, setCofresDeTesoro] = useState(0)
    const [posicion, setPosicion] = useState("")

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const guardarPirata = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/piratas", {
            nombre,
            imagen,
            pataDePalo,
            parcheOjo,
            gancho,
            cofresDeTesoro,
            posicion
        },{withCredentials: true})
            .then(res => history.push("/"))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div className="nuevoPirata">
            <h1>Add Pirate</h1>
            <form onSubmit={guardarPirata}>
                <div className="form-group">
                    <label htmlFor="nombre">First Name:</label>
                    <input type="text" id="nombre" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" />
                    {errors.nombre ? <span className="text-danger">{errors.nombre.message}</span>: null}
                </div>
                <div >
                    <label htmlFor="imagen">Image Url:</label>
                    <input type="text" id="imagen" name="imagen" value={imagen} onChange={e => setImagen(e.target.value)} className="form-control" />
                </div>
                <div className="form-group"><span className="check">
                    <input type="checkbox" className="form-check-input" id="pataDePalo" name="pataDePalo" checked={pataDePalo} onChange={e => setPataDePalo(e.target.checked)} />
                    <label className="form-check-label" htmlFor="pataDePalo">
                        Peg Leg
                    </label>
                </span>
                </div>
                <div className="form-group"><span className="check">
                    <input type="checkbox" className="form-check-input" id="parcheOjo" name="parcheOjo" checked={parcheOjo} onChange={e => setParcheOjo(e.target.checked)} />
                    <label className="form-check-label" htmlFor="parcheOjo">
                        Eye Patch
                    </label>
                </span>
                </div>
                <div className="form-group"><span className="check">
                    <input type="checkbox" className="form-check-input" id="gancho" name="gancho" checked={gancho} onChange={e => setGancho(e.target.checked)} />
                    <label className="form-check-label" htmlFor="gancho">
                        Hook Hand
                    </label>
                </span>
                </div>
                <div className="form-group">
                    <label htmlFor="cofre">
                        Treasures
                    </label>
                    <input type="number" id="cofre" name="cofre" onChange={e => setCofresDeTesoro(e.target.value)} />
                </div>
                <div className="form-group">
                    <select onChange={e => setPosicion(e.target.value)}>
                        <option disabled selected># of Treasure Chests:</option>
                        <option>Captain</option>
                        <option>First Mate</option>
                        <option>Quarter Master</option>
                        <option>Boatswain</option>
                        <option>Powder Monkey</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-success" value="Add Pirate" />
            </form><br/>
            <Link className="btn btn-primary" to="/"> Home</Link>
        </div>
    )

}

export default CrearPirata;