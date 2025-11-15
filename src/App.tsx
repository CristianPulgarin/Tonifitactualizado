
import './Estilos/App.css';
import BarraDeNavegacion from './BarraNavegacion';
import { CursoContext } from './Providers/CursoProvider.jsx';
import Inicio from './Componentes/Inicio.jsx';
import { BrowserRouter } from 'react-router';
import CursosDisponibles from './Componentes/CursosDisponibles.jsx';
import MaquinasDisponibles from './Componentes/MaquinasDisponibles.jsx';
import { Route, Routes } from 'react-router';
import Footer from './Footer.jsx';
import Boxeo from './Boxeo.js'
import Natacion from './Natacion.js'
import Esgrima from './Esgrima.js'
import Karate from './Karate.js';
import CrearCuenta from './Componentes/CrearCuenta.jsx';
import IniciarSesion from './Componentes/IniciarSesion.jsx'
import { useState } from 'react';
import Actualizar from './Componentes/Actualizar';
import Planes from './Componentes/Planes';
import Dieta from './Componentes/Dieta';
import RegistrarRutina from './Componentes/RegistrarRutina';
import VerDieta from './Componentes/VerDieta';
import AssignDieta from './Componentes/AssignDieta';
import VerRutina from './Componentes/VerRutina';
import Assign from './Componentes/Assign';
import Bloquear from './Componentes/Bloquear';


function App() {
  
  const [userRole, setUserRole] = useState(null); // Puede ser 'entrenador' o 'usuario'
  return (
    <div className="App">
      <BrowserRouter>
      <BarraDeNavegacion userRole={userRole}/>
          <Routes>
            <Route index element={<Inicio/>}/>
            <Route path='/' element={<Inicio/>}/>
            <Route path="/deportes" element={<CursosDisponibles/>}/>
            <Route path="/maquina" element={<MaquinasDisponibles/>}/>
            <Route path="/cursos-disponibles/natación" element={<Natacion/>}/>
            <Route path="/cursos-disponibles/esgrima" element={<Esgrima/>}/>
            <Route path="/cursos-disponibles/boxeo" element={<Boxeo/>}/>
            <Route path="/actualizar" element={<Actualizar/>}/>
            <Route path="/cursos-disponibles/karate" element={<Karate/>}/>
            <Route path='/crear-cuenta' element={<CrearCuenta/>}/>
            <Route path='/iniciar-sesion' element={<IniciarSesion setUserRole={setUserRole}/>}/>
            <Route path='/dietas' element={<Dieta/>}/>
            <Route path='/registrar-rutinas' element={<RegistrarRutina/>}/>
            <Route path='/ver-dieta' element={<VerDieta/>}/>
            <Route path='assign-dieta' element={<AssignDieta/>}/>
            <Route path='ver-rutina' element={<VerRutina/>}/>
            <Route path='assign-rutina' element={<Assign/>}/>
            <Route path='bloquear' element={<Bloquear/>}/>
            <Route path='planes' element={<Planes/>}/>
            

          </Routes>
          
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

//<Route path="/" element={<Inicio/>}/>
