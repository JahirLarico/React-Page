import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function NewPerrito(){
    const idPerro = localStorage.getItem('idPerro');
    const nombrePerro = localStorage.getItem('nombrePerro');
    const razaPerro = localStorage.getItem('razaPerro');
    const edadPerro = localStorage.getItem('edadPerro');
    const fotoPerro = localStorage.getItem('foto');
    const dueñoId = localStorage.getItem('idDueno');
    const tipo = localStorage.getItem('tipo');
    const navigate = useNavigate()
    const [JSONnombre , setJSONnombre] = useState(nombrePerro);
    const [JSONraza , setJSONraza] = useState(razaPerro);
    const [JSONedad , setJSONedad] = useState(edadPerro);
    const [JSONfoto , setJSONfoto] = useState(fotoPerro);

    const [nombreMessage, setNombreMessage] = useState('');
    const [razaMessage, setRazaMessage] = useState('');
    const [edadMessage, setEdadMessage] = useState('');
    const [fotoMessage, setFotoMessage] = useState('');

    function validationNombrePerro(texto){
        if(/^([A-Z]).*[a-zA-Z-0-9]/.test(texto)){
            setJSONnombre(texto);
            setNombreMessage("");
        }
        else {
            setNombreMessage("Debe comenzar con mayuscula el nombre del perrito");
        }
    }
    function validationRazaPerro(texto){
        if(/^([A-Z]).*[a-zA-Z-0-9]/.test(texto)){
            setJSONraza(texto);
            setRazaMessage("");
        }
        else{
            setRazaMessage("Debe comenzar con mayuscula la raza del perrito");
        }
    }

    function validationEdadPerro(texto){
        if(/^[0-9]{1,2}$/.test(texto)){
            setJSONedad(texto);
            setEdadMessage("");
        }
        else{
            setEdadMessage("Debe ser solo numeros no mayores a 2 digitos");
        }
    }

    function validationFotoPerro(texto){
        if(/^[a-zA-Z0-9/,.&-;:_=?¡¿!]{0,100}$/.test(texto)){
            setJSONfoto(texto);
            setFotoMessage("");
        }
        else{
            setFotoMessage("Debe ser solo letras, numeros, caracteres especiales y no mayor a 100 caracteres");
        }
    }


    function add(e){
        e.preventDefault();
        const data = {
            id : 10000000,
            foto : JSONfoto,
            nombre_perrito : JSONnombre,
            raza : JSONraza,
            edad : JSONedad,
            dueño : dueñoId
        }
        axios.post('https://apidjango.frankalvarez.dev/user/perros?idDueno='+dueñoId,data);
        navigate("/");
    }
    function edit(e){
        e.preventDefault();
        const data = {
            id : idPerro,
            foto : JSONfoto,
            nombre_perrito : JSONnombre,
            raza : JSONraza,
            edad : JSONedad,
            dueño : dueñoId
        }
        axios.put('https://apidjango.frankalvarez.dev/user/perros/edit?idDueno='+dueñoId+"&idPerro="+idPerro,data);
        navigate("/");
    }
    if (tipo === "edit"){
        return(
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Editando al perrito {nombrePerro}</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={edit}>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    defaultValue = {nombrePerro} onChange={(e)=>validationNombrePerro(e.target.value)}
                                                    />
                                                    <label>Nombre del perro</label>
                                                    {nombreMessage&& <p className="text-danger">{nombreMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    defaultValue = {razaPerro} onChange={(e)=>validationRazaPerro(e.target.value)}
                                                    />
                                                    <label>Raza</label>
                                                    {razaMessage&& <p className="text-danger">{razaMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    defaultValue = {edadPerro} onChange={(e)=>validationEdadPerro(e.target.value)}
                                                    />
                                                    <label>Edad</label>
                                                    {edadMessage&& <p className="text-danger">{edadMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    defaultValue = {fotoPerro} onChange={(e)=>validationFotoPerro(e.target.value)}
                                                    />
                                                    <label>Foto del perro(URL)</label>
                                                    {fotoMessage&& <p className="text-danger">{fotoMessage}</p>}
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <Link to="/"  className="btn btn-primary">Cancelar</Link>
                                                    {(fotoMessage || razaMessage || edadMessage || nombreMessage)&&
                                                        <input disabled={true} type="submit" className="btn btn-primary" value="Terminar Edit"/>
                                                    }
                                                    {(!fotoMessage && !razaMessage && !edadMessage && !nombreMessage)&&
                                                        <input  type="submit" className="btn btn-primary" value="Terminar Edit"/>
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
    else{
        return(
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Agregando un nuevo perrito</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={add}>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    onChange={(e)=>validationNombrePerro(e.target.value)}
                                                    />
                                                    <label>Nombre del perro</label>
                                                    {nombreMessage&& <p className="text-danger">{nombreMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                     onChange={(e)=>validationRazaPerro(e.target.value)}
                                                    />
                                                    <label>Raza</label>
                                                    {razaMessage&& <p className="text-danger">{razaMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                     onChange={(e)=>validationEdadPerro(e.target.value)}
                                                    />
                                                    <label>Edad</label>
                                                    {edadMessage&& <p className="text-danger">{edadMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                     onChange={(e)=>validationFotoPerro(e.target.value)}
                                                    />
                                                    <label>Foto del perro(URL)</label>
                                                    {fotoMessage&& <p className="text-danger">{fotoMessage}</p>}
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <Link to="/"  className="btn btn-primary">Cancelar</Link>
                                                    {(fotoMessage || razaMessage || edadMessage || nombreMessage)&&
                                                        <input disabled={true} type="submit" className="btn btn-primary" value="Terminar Edit"/>
                                                    }
                                                    {(!fotoMessage && !razaMessage && !edadMessage && !nombreMessage)&&
                                                        <input  type="submit" className="btn btn-primary" value="Terminar Edit"/>
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
export default NewPerrito;