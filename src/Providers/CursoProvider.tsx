import { createContext, useState, useEffect } from "react";

export const CursoContext = createContext();
export const CursoProvider = ({children}) => {
    const [curso, setCurso] = useState([])

    const addCurso = (item) => {
        setCurso([...curso, item])
    }

    useEffect(() => {
        const cargarCursos = async() => {
            const response = await fetch('/ArchivosJSON/cursos.json')
            const json = await response.json()
            setCurso(json.cursos)
        }
        cargarCursos()
    }, []);

    return (
        <>
            <CursoContext.Provider value={{curso, addCurso}}>
                {children}
            </CursoContext.Provider>
        </>
    )
}
