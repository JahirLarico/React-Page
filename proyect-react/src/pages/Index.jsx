import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';
function App() {
  const usuario = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const [authUser,setAuthUser] = useState('');
  const [dogs,setdogs] = useState([]);
  const navigate = useNavigate()
  const getDoggs =async()=>{
    const res = await axios.get('http://127.0.0.1:8000/user/perros?idDueno='+authUser);
    setdogs(res.data);
  }

  useEffect(() => {
    if (authUser) {
      getDoggs();
      if (dogs.length === 0) {
        return
      }
    }
  }, [authUser]);

  useEffect(() => {
    const token = AuthService.getToken()
    if (!token) {
      return navigate("/login")
    }
    else{
      axios.get("http://127.0.0.1:8000/userDetail?username="+usuario)
      .then(res => {
        setAuthUser(res.data.id);
      })
    }
  },[])

  const logout=()=> {
    AuthService.destroyToken()
    navigate("/login")
  }

  const deleteDog = async(idPerro)=>{
    console.log(idPerro)
    axios.delete('http://localhost:8000/user/perros/edit?idDueno='+authUser+'&idPerro='+idPerro);
    window.location.reload();
  }
  const editDog = async(idPerro, nombrePerro, razaPerro , edadPerro, ultima , fotoPerro)=>{
    localStorage.setItem('idPerro',idPerro);
    localStorage.setItem('nombrePerro',nombrePerro);
    localStorage.setItem('razaPerro',razaPerro);
    localStorage.setItem('edadPerro',edadPerro);
    localStorage.setItem('ultima_alimnetacion',ultima);
    localStorage.setItem('idDueno',authUser);
    localStorage.setItem('foto', fotoPerro)
    localStorage.setItem('tipo',"edit");
    navigate("/newPerrito");
  }
  const addDog= async()=>{
    localStorage.setItem('tipo', "new");
    navigate("/newPerrito");
  }
  if (dogs ) {
    return (
      <div>
        <Container>
          <h1> El nombre del usuarios es {usuario} y su contra es {password} </h1>
          <button onClick={logout}>Salir de la sesion</button>
          <Link to ="/">Index</Link>
          <Link to="/dispositivos">Ir a dispositivos</Link>
          <Button variant="primary" onClick={addDog}>Agregar un nuevo Perrito</Button>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
              <th>Foto</th>
                <th>Nombre del perro</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog)=>(
                <tr key={dog.id}>
                  <td><img src="localhost:8000/media/perritos/7up.jpg" alt="foto" width="100" height="100"/></td>
                    <td>{dog.nombre_perrito}</td>
                    <td>{dog.raza}</td>
                    <td>{dog.edad}</td>
                    <td>
                      <Button onClick={()=> editDog(dog.id,dog.nombre_perrito, dog.raza, dog.edad , dog.ult_alimentacion , dog.foto)} variant="primary">Editar</Button>
                      <Button onClick={()=> deleteDog(dog.id)} variant="danger">Eliminar</Button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
  else {
    return (
      <div>
        <Container>
          <h1> El nombre del usuarios es {usuario} y su contra es {password} </h1>
          <button onClick={logout}>Salir de la sesion</button>
          <Link to ="/">Index</Link>
          <Link to="/dispositivos">Ir a dispositivos</Link>
          <Link to ="/perritos">Ir a perritos</Link>
          <h2> No existen usuarios o algo salio mal al cargalos </h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default App;
