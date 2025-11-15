import Footer from "../Footer";
import BarraDeNavegacion from "../BarraNavegacion";
import { MaquinaProvider } from "../Providers/MaquinasProvider";
import MaquinaLista from "../Maquinas/MaquinasLista";

export default function MaquinasDisponibles() {
    return (
        <>
            <MaquinaProvider>
                <MaquinaLista/>
            </MaquinaProvider>
        </>
    )
}