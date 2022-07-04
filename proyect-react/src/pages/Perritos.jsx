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
function Perritos(){
    const navigate = useNavigate()
    useEffect(() => {
        const token = AuthService.getToken()
        if (!token) {
          return navigate("/login")
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
            <Link to ="/perritos">Ir a perritos</Link>
            <Link to ="/newPerrito">Agregar un nuevo perro</Link>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre del perro</th>
                  <th>Edad del perro</th>
                  <th>Dueño</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </Table>
          </Container>
        </div>
      )
}
export default Perritos;