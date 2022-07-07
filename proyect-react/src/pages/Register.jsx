import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react';
function Register(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [userMessage,setUserMessage] = useState('');
    const [passwordMessage,setPasswordMessage] = useState('');
    const navigate = useNavigate();
    function validationuser(texto){
        if(/^[a-zA-Z0-9_]*$/.test(texto)){
            setUsername(texto);
            setUserMessage("");
        }
        else{
            setUserMessage("El usuario no puede conterner espacios")
        }
    }
    function validationpassword(texto){
        if (/(?=[A-Z])(?=.*[0-9].*)[a-zA-Z0-9_]{8,}/.test(texto)){
            setPassword(texto)
            setPasswordMessage("");
        }
        else {
            setPasswordMessage("Recuerde que tiene que ser minimo de 8 caracteres ademas de iniciar con mayuscula , poseer almenos un numero y no tener espacios")
        }
    }
    function add(e){
        e.preventDefault();
        const data = {
                id: 10000,
                username: username,
                password: password ,
                perros : [],
                dispositivos: []
        }
        axios.post('https://apidjango.frankalvarez.dev/users',data)
        .then((datos)=>{
            console.log(datos.data)
            const codefing = {
                id: datos.data.id,
                username:  datos.data.username,
                password:  datos.data.password,
                perros : [],
                dispositivos: []
            }
            axios.put('https://apidjango.frankalvarez.dev/userDetail?username='+username,codefing)
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
                                                type="text"
                                                placeholder="usuario"
                                                onChange={(e)=>validationuser(e.target.value)}
                                                />
                                                <label>Nombre del usuario</label>
                                                {userMessage && <p className="text-danger">{userMessage}</p>}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e)=>validationpassword(e.target.value)}
                                                />
                                                <label>Contraseña del usuario</label>
                                                {passwordMessage && <p className="text-danger">{passwordMessage}</p>}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <input type="submit" className="btn btn-primary" value="Agregar usuario"/>
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