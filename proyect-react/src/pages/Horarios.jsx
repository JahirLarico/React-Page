import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';
function Horarios(){
    const [horarios,setHorarios] = useState([]);
    const idDispo = localStorage.getItem('idDispo');
    const navigate = useNavigate()
    const getHorarios =async()=>{
        const res = await axios.get('https://apidjango.frankalvarez.dev/dispositivo/horarios?dispositivoId='+ idDispo);
        setHorarios(res.data);
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
    const deleteHorario = async(idHorario)=>{
      if (window.confirm('¿Estas seguro de eliminar este horario?')) {
      axios.delete('https://apidjango.frankalvarez.dev/dispositivo/horarios/edit?dispoId='+idDispo+'&horarioId='+idHorario);
      window.location.reload();
      }
      else{
      }
    }

    useEffect(() => {
        const token = AuthService.getToken()
        if (!token) {
          return navigate("/login")
        }
        else {
          getHorarios();
        }
      },[])

      if (horarios.length > 0){
        return (
          <div>
            <Container>
            <Button variant="primary" onClick={goIndex}>Index</Button>
            <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
            <Button variant='success' onClick={logout}>Salir de la sesion</Button>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Dia de la modificacion</th>
                    <th>Hora de la modificacion</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {horarios.map((horario)=>(
                  <tr key={horario.id}>
                      <td>{horario.fecha}</td>
                      <td>{horario.hora}</td>
                      <td>{horario.cantidad_comida}</td>
                      <td>
                      <Button onClick={()=> deleteHorario(horario.id)} variant="danger">Eliminar</Button>
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
              <Button variant="primary" onClick={goIndex}>Index</Button>
              <Button variant="primary" onClick={goDispo}>Ir a dispositivos</Button>
              <Button variant='success' onClick={logout}>Salir de la sesion</Button>
              <h2>Este dispositivo no tiene historial, agregue alguno desde la app</h2>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Dia de la modificacion</th>
                    <th>Hora de la modificacion</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </Table>
            </Container>
          </div>
        )
}
export default Horarios;