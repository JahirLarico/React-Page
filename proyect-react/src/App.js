import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dispositivos from './pages/Dispositivos';
import Perritos from './pages/Perritos';
import NewPerrito from './pages/NewPerrito';
import NewDispositivo from './pages/NewDispositivo';
import Horarios from './pages/Horarios';
import Register from './pages/Register';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dispositivos" element={<Dispositivos />} />
        <Route path="/perritos" element={<Perritos />} />
        <Route path="/newPerrito" element={<NewPerrito />} />
        <Route path="/dispositivos/horarios" element={<Horarios />} />
        <Route path="/newDispositivo" element={<NewDispositivo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
