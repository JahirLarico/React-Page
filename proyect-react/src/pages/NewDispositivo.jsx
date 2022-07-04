import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const idDueno = localStorage.getItem('idDueno');
const ubicacionDispo = localStorage.getItem('ubicacionDispo');
const idDispo = localStorage.getItem('idDispo');
const tipo = localStorage.getItem('tipo');
const urlDispo = localStorage.getItem('urlDispo');
const nombreDispo = localStorage.getItem('nombreDispo');
function NewDispositivo(){
    const navigate = useNavigate()
    const [JSONnombreDispo,setJSONnombreDispo] = useState(nombreDispo);
    const [JSONurlDispo,setJSONurlDispo] = useState(urlDispo);
    const [JSONubicacion , setJSONubicacion] = useState(ubicacionDispo);
    function add(e){
        e.preventDefault();
        const data = {
            id: 100000,
            nombre: JSONnombreDispo,
            ubicacion: JSONubicacion,
            url_conexion: JSONurlDispo,
            propietario : idDueno,
            horarios :[]

        }
        axios.post('https://apidjango.frankalvarez.dev/user/dispositivos?userId='+ idDueno, data)
        navigate('/dispositivos')
    }
    function edit(e){
        e.preventDefault();
        const data = {
                id: idDispo,
                nombre: JSONnombreDispo,
                ubicacion: JSONubicacion,
                url_conexion: JSONurlDispo,
                propietario: idDueno,
                horarios: []
        }
        axios.put('https://apidjango.frankalvarez.dev/user/dispositivos/edit?idDueno='+idDueno+ "&idDispo=" + idDispo, data)
        navigate('/dispositivos')
    }

    if (tipo === "new"){
        return(
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Un nuevo dispositivo</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={add}>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputText"
                                                    type="text"
                                                    placeholder="NOMBRE DEL DISPO"
                                                    onChange={(e) => setJSONnombreDispo(e.target.value)}
                                                    />
                                                    <label for="inputText">Nombre del dispositivo</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputText"
                                                    type="text"
                                                    placeholder="usuario"
                                                    onChange={(e) => setJSONurlDispo(e.target.value)}
                                                    />
                                                    <label for="inputText">URL del dispositivo</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputText"
                                                    type="text"
                                                    placeholder="usuario"
                                                    onChange={(e) => setJSONubicacion(e.target.value)}
                                                    />
                                                    <label for="inputText">Ubicacion del dispositivo</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <input type="submit" className="btn btn-primary" value="Agregar"/>
                                                </div>
                                                <Link to="/dispositivos"  className="btn btn-primary">Cancelar</Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2022</div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
    else {
        return(
        <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Editando un dispositivo</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={edit}>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputText"
                                                    type="text"
                                                    placeholder="usuario"
                                                    defaultValue={JSONnombreDispo} onChange={(e) => setJSONnombreDispo(e.target.value)}
                                                    />
                                                    <label for="inputText">Nombre del dispositivo</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputText"
                                                    type="text"
                                                    placeholder="usuario"
                                                    defaultValue={JSONurlDispo} onChange={(e) => setJSONurlDispo(e.target.value)}
                                                    />
                                                    <label for="inputText">URL del dispositivo</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputText"
                                                    type="text"
                                                    placeholder="usuario"
                                                    defaultValue={JSONubicacion} onChange={(e) => setJSONubicacion(e.target.value)}
                                                    />
                                                    <label for="inputText">Ubicacion del dispositivo</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <input type="submit" className="btn btn-primary" value="Editar"/>
                                                </div>
                                                <Link to="/dispositivos"  className="btn btn-primary">Cancelar</Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2022</div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            )
    }
}
export default NewDispositivo;