import AuthService from '../services/auth';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate()

    function validationuser(texto){
        if(/^[a-zA-Z0-9_]*$/.test(texto)){
            setUsuario(texto);
            setUserMessage("");
        }
        else{
            setUserMessage("El usuario no puede conterner espacios")
        }
    }
    function validationpassword(texto){
        if (/(?=[A-Z])(?=.*[0-9].*)[a-zA-Z0-9_]{8,}/.test(texto)){
            setPassword(texto)
            setPasswordMessage("")
        }
        else {
            setPasswordMessage("Recuerde que tiene que ser minimo de 8 caracteres ademas de iniciar con mayuscula y poseer almenos un numero")
        }
    }

    function Login(e){
        e.preventDefault();
        AuthService.login(usuario,password)
        .then(()=>{
            localStorage.setItem('username',usuario);
            return navigate('/')
        },
        error =>{
            setMessage("Te equivocaste en algo")
        })
    }
    return(
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                            <div className="card-body">
                                                <form onSubmit={Login}>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control"
                                                        id="inputText"
                                                        type="text"
                                                        placeholder="usuario"
                                                        value = {usuario} onChange={(e)=>validationuser(e.target.value)}
                                                        />
                                                        <label >Usuario</label>
                                                        {userMessage && <p className="text-danger">{userMessage}</p>}
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control"
                                                        id="inputPassword"
                                                        type="password"
                                                        placeholder="Password"
                                                        value = {password} onChange={(e)=>setPassword(e.target.value)}
                                                        />
                                                        <label >Password</label>
                                                        {passwordMessage && <p className="text-danger">{passwordMessage}</p>}
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <p> Olvidaste tu contraseña?</p>
                                                        <input type="submit" className="btn btn-primary" value="Login"/>
                                                    </div>
                                                </form>
                                                {message && (
                                                    <div className="form-group" >
                                                        <div className="alert alert-danger" >
                                                            {message}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="card-footer text-center py-3">
                                                <div className="small">
                                                    <p>No tienes cuenta? </p>
                                                    <a href="/register">Registrate</a>
                                                </div>
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

                                        &middot;

                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
        )
}
export default Login;