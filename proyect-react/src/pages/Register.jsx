import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react';
function Register(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    function add(e){
        e.preventDefault();
        const data = {
                id: 10000,
                username: username,
                password: password ,
                perros : [],
                dispositivos: []
        }
        axios.post('http://localhost:8000/users',data)
        .then((datos)=>{
            console.log(datos.data)
            const codefing = {
                id: datos.data.id,  
                username:  datos.data.username,
                password:  datos.data.password,
                perros : [],
                dispositivos: []
            }
            axios.put('http://localhost:8000/userDetail?username=',codefing)
            navigate('/login')
        })}
    return(
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Creando un nuevo usuario</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={add}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                id="inputText"
                                                type="text"
                                                placeholder="usuario"
                                                onChange={(e)=>setUsername(e.target.value)}
                                                />
                                                <label for="inputText">Nombre del usuario</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                id="inputPassword"
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e)=>setPassword(e.target.value)}
                                                />
                                                <label for="inputPassword">Contraseña del usuario</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <input type="submit" className="btn btn-primary" value="Login"/>
                                            </div>
                                            <Link to="/login"  className="btn btn-primary">Cancelar</Link>
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
export default Register;