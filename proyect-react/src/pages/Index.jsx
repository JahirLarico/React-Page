import '../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';
function App() {
  const usuario = localStorage.getItem('username');
  const [authUser,setAuthUser] = useState('');
  const [dogs,setdogs] = useState([]);
  const navigate = useNavigate()
  const getDoggs =async()=>{
    localStorage.setItem('idDueno',authUser);
    const res = await axios.get('https://apidjango.frankalvarez.dev/user/perros?idDueno='+authUser);
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
      axios.get("https://apidjango.frankalvarez.dev/userDetail?username="+usuario)
      .then(res => {
        setAuthUser(res.data.id);
      })
    }
  },[])
  const goIndex=()=>{
    navigate('/');
  }
  const goDispo=()=>{
    navigate ('/dispositivos');
  }
  const logout=()=> {
    if (window.confirm('¿Estas seguro de cerrar sesión?')) {
      AuthService.destroyToken()
      localStorage.removeItem('foto')
      localStorage.removeItem('idDispo')
      localStorage.removeItem('nombreDispo')
      localStorage.removeItem('username')
      localStorage.removeItem('edadPerro')
      localStorage.removeItem('urlDispo')
      localStorage.removeItem('idPerro')
      localStorage.removeItem('nombrePerro')
      localStorage.removeItem('razaPerro')
      localStorage.removeItem('tipo')
      localStorage.removeItem('ubicacionDispo')
      localStorage.removeItem('idDueno')
      navigate("/login")
    }
    else {}
  }

  const deleteDog = async(idPerro)=>{
    if (window.confirm('¿Estas seguro de eliminar este perro?')) {
    axios.delete('https://apidjango.frankalvarez.dev/user/perros/edit?idDueno='+authUser+'&idPerro='+idPerro);
    window.location.reload();
    }
    else{}
  }
  const editDog = async(idPerro, nombrePerro, razaPerro , edadPerro, ultima , fotoPerro)=>{
    localStorage.setItem('idPerro',idPerro);
    localStorage.setItem('nombrePerro',nombrePerro);
    localStorage.setItem('razaPerro',razaPerro);
    localStorage.setItem('edadPerro',edadPerro);
    localStorage.setItem('foto', fotoPerro)
    localStorage.setItem('tipo',"edit");
    navigate("/newPerrito");
  }
  const addDog= async()=>{
    localStorage.setItem('tipo', "new");
    navigate("/newPerrito");
  }
  if (dogs.length>0) {
    return (
      <div>
        <Container>
          <h1>Perros del usuario: {usuario}</h1>
          <Button variant="primary" onClick={goIndex}>Index</Button>
          <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
          <Button variant="primary" onClick={addDog}>Agregar un nuevo Perrito</Button>
          <Button variant='success' onClick={logout}>Salir de la sesion</Button>
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
                    <td> <img src={dog.foto} alt="Imagen del prro" height="50" width="100"></img></td>
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
    return (
      <div>
        <Container>
          <h1>Perros del usuario: {usuario}</h1>
          <Button variant="primary" onClick={goIndex}>Index</Button>
          <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
          <Button variant="primary" onClick={addDog}>Agregar un nuevo Perrito</Button>
          <Button variant='success' onClick={logout}>Salir de la sesion</Button>
          <h2> No existen perros , pruebe ingresar alguno </h2>
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

export default App;
