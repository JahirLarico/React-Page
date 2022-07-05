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
                                                    defaultValue = {nombrePerro} onChange={(e)=>setJSONnombre(e.target.value)}
                                                    />
                                                    <label>Nombre del perro</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    defaultValue = {razaPerro} onChange={(e)=>setJSONraza(e.target.value)}
                                                    />
                                                    <label>Raza</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    defaultValue = {edadPerro} onChange={(e)=>setJSONedad(e.target.value)}
                                                    />
                                                    <label>Edad</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    defaultValue = {fotoPerro} onChange={(e)=>setJSONfoto(e.target.value)}
                                                    />
                                                    <label>Foto del perro(URL)</label>
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
                                                    onChange={(e)=>setJSONnombre(e.target.value)}
                                                    />
                                                    <label>Nombre del perro</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                     onChange={(e)=>setJSONraza(e.target.value)}
                                                    />
                                                    <label>Raza</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                     onChange={(e)=>setJSONedad(e.target.value)}
                                                    />
                                                    <label>Edad</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                     onChange={(e)=>setJSONfoto(e.target.value)}
                                                    />
                                                    <label>Foto del perro(URL)</label>
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