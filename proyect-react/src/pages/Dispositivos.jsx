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
function Dispositivos(){
    const userId = localStorage.getItem('idDueno');
    const [dispositivos,setDispositivos] = useState([]);
    const navigate = useNavigate()

    const deleteDispo = async(idDispo)=>{
      const res = axios.delete('http://localhost:8000/user/dispositivos/edit?idDueno='+userId+'&idDispo='+idDispo);
      window.location.reload();
    }
    const getDispositivos =async()=>{
      const res = await axios.get('http://localhost:8000/user/dispositivos?userId='+ userId);
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
      const idDispo = localStorage.setItem('idDispo',id);
      navigate('/dispositivos/horarios');
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
      const logout=()=> {
        AuthService.destroyToken()
        navigate("/login")
      }
      return (
        <div>
          <Container>
            <h1> El nombre del usuarios es {} y su contra es {} </h1>
            <button onClick={logout}>Salir de la sesion</button>
            <Link to ="/">Index</Link>
            <Link to="/dispositivos">Ir a dispositivos</Link>
            <Button variant="primary" onClick={addDispositivo}>Agregar un nuevo dispositivo</Button>
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
export default Dispositivos;