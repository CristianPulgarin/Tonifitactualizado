import Footer from "../Footer";
import BarraDeNavegacion from "../BarraNavegacion";
import CursoLista from "../Cursos/CursoLista";
import { CursoProvider } from "../Providers/CursoProvider";

export default function CursosDisponibles() {
    return (
        <>
            <CursoProvider>
                <CursoLista/>
            </CursoProvider> 
        </>
    )
}