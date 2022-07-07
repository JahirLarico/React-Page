import '../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
            <Navbar bg="light" expand="lg">
              <Container>
                <h1>{usuario}</h1>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  <Button variant="primary" onClick={goIndex}>Index</Button>
                      <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
                      <Button variant="primary" onClick={addDispositivo}>Agregar un nuevo dispositivo</Button>
                      <Button variant='success' onClick={logout}>Salir de la sesion</Button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Container>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nombre del dispositivo</th>
                      <th>IP del dispositivo</th>
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
                </table>
              </div>
            </Container>
          </div>
        )
      }
      return (
        <div>
          <Navbar bg="light" expand="lg">
              <Container>
                <h1>{usuario}</h1>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  <Button variant="primary" onClick={goIndex}>Index</Button>
                      <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
                      <Button variant="primary" onClick={addDispositivo}>Agregar un nuevo dispositivo</Button>
                      <Button variant='success' onClick={logout}>Salir de la sesion</Button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          <Container>
          <h1>No tiene dispositivos , agrege alguno</h1>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                      <th>Nombre del dispositivo</th>
                      <th>IP del dispositivo</th>
                      <th>Ubicacion del dispositivo</th>
                      <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
                <script src="acciones.js" ></script>
              </table>
            </div>
          </Container>
        </div>
      )
}
export default Dispositivos;