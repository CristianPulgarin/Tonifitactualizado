import { createContext, useState, useEffect } from "react";

export const MaquinaContext = createContext();
export const MaquinaProvider = ({children}) => {
    const [maquina, setMaquina] = useState([])

    const addMaquina = (item) => {
        setMaquina([...maquina, item])
    }

    useEffect(() => {
        const cargarMaquinas = async() => {
            const response = await fetch('/ArchivosJSON/maquinas.json')
            const json = await response.json()
            setMaquina(json.maquinas)
        }
        cargarMaquinas()
    }, []);

    return (
        <>
            <MaquinaContext.Provider value={{maquina, addMaquina}}>
                {children}
            </MaquinaContext.Provider>
        </>
    )
}
