import { createContext, useState, useEffect } from "react";

export const ScrollContext = createContext();
export const ScrollProvider = ({children}) => {
    const [scrollMaquina, setScrollMaquina] = useState([])

    const addScrollMaquina = (item) => {
        setScrollMaquina([...scrollMaquina, item])
    }

    useEffect(() => {
        const cargarScrollMaquinas = async() => {
            const response = await fetch('/ArchivosJSON/scrollspy.json')
            const json = await response.json()
            setScrollMaquina(json.maquinas)
        }
        cargarScrollMaquinas()
    }, []);

    return (
        <>
            <ScrollContext.Provider value={{scrollMaquina, addScrollMaquina}}>
                {children}
            </ScrollContext.Provider>
        </>
    )
}
