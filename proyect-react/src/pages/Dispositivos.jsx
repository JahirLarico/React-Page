import '../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';
function Dispositivos(){
    const usuario = localStorage.getItem('username');
    const userId = localStorage.getItem('idDueno');
    const [dispositivos,setDispositivos] = useState([]);
    const navigate = useNavigate()

    const deleteDispo = async(idDispo)=>{
      if (window.confirm('¿Estas seguro de eliminar este dispositivo?')) {
      axios.delete('https://apidjango.frankalvarez.dev/user/dispositivos/edit?idDueno='+userId+'&idDispo='+idDispo);
      window.location.reload();
      }
      else{

      }
    }
    const getDispositivos =async()=>{
      const res = await axios.get('https://apidjango.frankalvarez.dev/user/dispositivos?userId='+ userId);
      setDispositivos(res.data);
    }
    const addDispositivo = async()=>{
      localStorage.setItem('tipo',"new");
      navigate('/newDispositivo')
    }
    const editDispositivo = async(idDispo, ubicacionDispo, urlDispo, nombreDispo)=>{
      localStorage.setItem('idDispo',idDispo);
      localStorage.setItem('ubicacionDispo',ubicacionDispo);
      localStorage.setItem('urlDispo',urlDispo);
      localStorage.setItem('nombreDispo',nombreDispo);
      localStorage.setItem('tipo',"edit");
      navigate('/newDispositivo')
    }
    const info = async(id)=>{
      localStorage.setItem('idDispo',id);
      navigate('/dispositivos/horarios');
    }
    const goIndex=()=>{
      navigate('/');
    }
    const goDispo=()=>{
      navigate ('/dispositivos');
    }
    const logout=()=> {
    if (window.confirm('¿Estas seguro de cerrar sesión?')) {
      AuthService.destroyToken()
    navigate("/login")
    }
    else {}
  }
    useEffect(() => {
        const token = AuthService.getToken()
        if (!token) {
          return navigate("/login")
        }
        else {
          getDispositivos();
        }
      },[])
      if (dispositivos.length>0){
        return (
          <div>
            <Container>
            <h1>Dispositivos del usuario: {usuario}</h1>
              <Button variant="primary" onClick={goIndex}>Index</Button>
              <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
              <Button variant="primary" onClick={addDispositivo}>Agregar un nuevo dispositivo</Button>
              <Button variant='success' onClick={logout}>Salir de la sesion</Button>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Nombre del dispositivo</th>
                    <th>URL del dispositivo</th>
                    <th>Ubicacion del dispositivo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {dispositivos.map((dispositivo)=>(
                  <tr key={dispositivo.id}>
                      <td>{dispositivo.nombre}</td>
                      <td>{dispositivo.url_conexion}</td>
                      <td>{dispositivo.ubicacion}</td>
                      <td>
                        <Button onClick={()=>deleteDispo(dispositivo.id)} variant="danger">Eliminar</Button>
                        <Button onClick={()=>info(dispositivo.id)} variant="warning">Detalles</Button>
                        <Button onClick={()=>editDispositivo(dispositivo.id, dispositivo.ubicacion , dispositivo.url_conexion, dispositivo.nombre)} variant="primary">Editar</Button>
                      </td>
                    </tr>
                ))}
                </tbody>
                <script src="acciones.js" ></script>
              </Table>
            </Container>
          </div>
        )
      } 
      return (
        <div>
          <Container>
          <h1>Dispositivos del usuario: {usuario}</h1>
            <Button variant="primary" onClick={goIndex}>Index</Button>
            <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
            <Button variant="primary" onClick={addDispositivo}>Agregar un nuevo dispositivo</Button>
            <Button variant='success' onClick={logout}>Salir de la sesion</Button>
            <h1>No tiene dispositivos , agrege alguno</h1>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Nombre del dispositivo</th>
                  <th>URL del dispositivo</th>
                  <th>Ubicacion del dispositivo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
              <script src="acciones.js" ></script>
            </Table>
          </Container>
        </div>
      )
}
export default Dispositivos;