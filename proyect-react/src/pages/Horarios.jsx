import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';
function Horarios(){
    const [horarios,setHorarios] = useState([]);
    const idDispo = localStorage.getItem('idDispo');
    const getHorarios =async()=>{
        const res = await axios.get('https://apidjango.frankalvarez.dev/dispositivo/horarios?dispositivoId='+ idDispo);
        setHorarios(res.data);
    }
    const navigate = useNavigate()

    useEffect(() => {
        const token = AuthService.getToken()
        if (!token) {
          return navigate("/login")
        }
        else {
          getHorarios();
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
            <Link to ="/newDispositivo">Agregar un nuevo dispositivo</Link>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Dia de la modificacion</th>
                  <th>Hora de la modificacion</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
              {horarios.map((horario)=>(
                <tr key={horario.id}>
                    <td>{horario.fecha}</td>
                    <td>{horario.hora}</td>
                    <td>{horario.cantidad_comida}</td>
                  </tr>
              ))}
              </tbody>
            </Table>
          </Container>
        </div>
      )
}
export default Horarios;