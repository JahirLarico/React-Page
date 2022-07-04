import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const idPerro = localStorage.getItem('idPerro');
const nombrePerro = localStorage.getItem('nombrePerro');
const razaPerro = localStorage.getItem('razaPerro');
const edadPerro = localStorage.getItem('edadPerro');
const fotoPerro = localStorage.getItem('fotoPerro');
const dueñoId = localStorage.getItem('idDueno');
const tipo = localStorage.getItem('tipo');
function NewPerrito(){
    const navigate = useNavigate()
    const [JSONnombre , setJSONnombre] = useState(nombrePerro);
    const [JSONraza , setJSONraza] = useState(razaPerro);
    const [JSONedad , setJSONedad] = useState(edadPerro);
    const [JSONfoto , setJSONfoto] = useState(fotoPerro);
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
        axios.post('http://localhost:8000/user/perros?idDueno='+dueñoId,data);
        navigate("/");
    }
    function edit(e){
        e.preventDefault();
        const data = {
            id : idPerro,
            nombre_perrito : JSONnombre,
            raza : JSONraza,
            edad : JSONedad,
            dueño : dueñoId
        }
        axios.put('http://localhost:8000/user/perros/edit?idDueno='+dueñoId+"&idPerro="+idPerro,data);
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
                                                    id="nombrePerro"
                                                    type="text"
                                                    defaultValue = {nombrePerro} onChange={(e)=>setJSONnombre(e.target.value)}
                                                    />
                                                    <label for="inputText">Nombre del perro</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="razaPerro"
                                                    type="text"
                                                    defaultValue = {razaPerro} onChange={(e)=>setJSONraza(e.target.value)}
                                                    />
                                                    <label for="inputPassword">Raza</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="edadPerro"
                                                    type="text"
                                                    defaultValue = {edadPerro} onChange={(e)=>setJSONedad(e.target.value)}
                                                    />
                                                    <label for="inputPassword">Edad</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <input type="submit" className="btn btn-primary" value="Terminar Edit"/>
                                                </div>
                                                <Link to="/"  className="btn btn-primary">Cancelar</Link>
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
                                                    id="nombrePerro"
                                                    type="text"
                                                    onChange={(e)=>setJSONnombre(e.target.value)}
                                                    />
                                                    <label for="inputText">Nombre del perro</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="razaPerro"
                                                    type="text"
                                                     onChange={(e)=>setJSONraza(e.target.value)}
                                                    />
                                                    <label for="inputPassword">Raza</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="edadPerro"
                                                    type="text"
                                                     onChange={(e)=>setJSONedad(e.target.value)}
                                                    />
                                                    <label for="inputPassword">Edad</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="edadPerro"
                                                    type="file"
                                                     onChange={(e)=>setJSONfoto(e.target.value)}
                                                    />
                                                    <label for="inputPassword">Foto</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <input type="submit" className="btn btn-primary" value="Agregar"/>
                                                </div>
                                                <Link to="/"  className="btn btn-primary">Cancelar</Link>
    
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
export default NewPerrito;