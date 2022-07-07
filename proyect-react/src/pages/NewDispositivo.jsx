import {Link} from 'react-router-dom'
import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function NewDispositivo(){
    const navigate = useNavigate()
    const idDueno = localStorage.getItem('idDueno');
    const ubicacionDispo = localStorage.getItem('ubicacionDispo');
    const idDispo = localStorage.getItem('idDispo');
    const tipo = localStorage.getItem('tipo');
    const urlDispo = localStorage.getItem('urlDispo');
    const nombreDispo = localStorage.getItem('nombreDispo');
    const [JSONnombreDispo,setJSONnombreDispo] = useState(nombreDispo);
    const [JSONurlDispo,setJSONurlDispo] = useState(urlDispo);
    const [JSONubicacion , setJSONubicacion] = useState(ubicacionDispo);

    const [nombreMessage,setNombreMessage] = useState('');
    const [urlMessage,setUrlMessage] = useState('');
    const [ubicacionMessage,setUbicacionMessage] = useState('');

    function validationNombreDispo(texto){
        if(/^([A-Z]).*[a-zA-Z0-9]/.test(texto)){
            setJSONnombreDispo(texto);
            setNombreMessage('');
        }
        else{
            setNombreMessage("Debe comenzar con mayuscula y contener solo letras y numeros");
        }
    }
    function validationUrl(texto){
        if(/^([0-9]{0,3})\.([0-9]{0,3})\.([0-9]{0,3})\.([0-9]{0,3})$/.test(texto)){
            setJSONurlDispo(texto);
            setUrlMessage("")
        }
        else{
            setUrlMessage("Error en la direcciona IP , debe ser de la forma xxx.xxx.xxx.xxx")
        }
    }

    function validationUbicacion(texto){
        if(/^([A-Z]).*[a-zA-Z0-9]/.test(texto)){
            setJSONubicacion(texto)
            setUbicacionMessage("")
        }
        else {
            setUbicacionMessage("Debe comenzar con mayuscula y contener solo letras y numeros")
        }
    }
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
                                                    type="text"
                                                    placeholder="NOMBRE DEL DISPO"
                                                    onChange={(e) => validationNombreDispo(e.target.value)}
                                                    />
                                                    <label>Nombre del dispositivo</label>
                                                    {nombreMessage &&
                                                        <p className="text-danger">{nombreMessage}</p>
                                                    }
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    placeholder="usuario"
                                                    onChange={(e) => validationUrl(e.target.value)}
                                                    />
                                                    <label>Direccion IP del dispositivo</label>
                                                    {urlMessage &&
                                                        <p className="text-danger">{urlMessage}</p>
                                                    }
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    placeholder="usuario"
                                                    onChange={(e) => validationUbicacion(e.target.value)}
                                                    />
                                                    <label>Ubicacion del dispositivo</label>
                                                    {ubicacionMessage &&
                                                        <p className="text-danger">{ubicacionMessage}</p>
                                                    }
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link to="/dispositivos"  className="btn btn-primary">Cancelar</Link>
                                                    {(nombreMessage||urlMessage||ubicacionMessage) &&
                                                        <input disabled={true} type="submit" className="btn btn-primary" value="Agregar"/>
                                                    }
                                                    {(!nombreMessage&&!urlMessage&&!ubicacionMessage) &&
                                                        <input type="submit" className="btn btn-primary" value="Agregar"/>
                                                    }
                                                </div>
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
                                <div className="text-muted">Copyright &copy; Perritos JJ</div>
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
                                                    type="text"
                                                    placeholder="usuario"
                                                    defaultValue={JSONnombreDispo} onChange={(e) => validationNombreDispo(e.target.value)}
                                                    />
                                                    <label>Nombre del dispositivo</label>
                                                    {nombreMessage &&
                                                        <p className="text-danger">{nombreMessage}</p>
                                                    }
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    placeholder="usuario"
                                                    defaultValue={JSONurlDispo} onChange={(e) => validationUrl(e.target.value)}
                                                    />
                                                    <label>URL del dispositivo</label>
                                                    {urlMessage &&
                                                        <p className="text-danger">{urlMessage}</p>
                                                    }
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    placeholder="usuario"
                                                    defaultValue={JSONubicacion} onChange={(e) => validationUbicacion(e.target.value)}
                                                    />
                                                    <label>Direccion IP del dispositivo</label>
                                                    {ubicacionMessage &&
                                                        <p className="text-danger">{ubicacionMessage}</p>
                                                    }
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link to="/dispositivos"  className="btn btn-primary">Cancelar</Link>
                                                    {(nombreMessage||urlMessage||ubicacionMessage) &&
                                                        <input disabled={true} type="submit" className="btn btn-primary" value="Agregar"/>
                                                    }
                                                    {(!nombreMessage&&!urlMessage&&!ubicacionMessage) &&
                                                        <input type="submit" className="btn btn-primary" value="Agregar"/>
                                                    }
                                                </div>
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
                                <div className="text-muted">Copyright &copy; Perritos JJ</div>
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