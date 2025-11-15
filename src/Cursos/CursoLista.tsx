import { CursoContext } from "../Providers/CursoProvider";
import { useContext, useState, useEffect } from "react"
import Curso from "./Curso.jsx"
import { Container, Row } from "react-bootstrap"

export default function CursoLista() {
    const {curso} = useContext(CursoContext);

    return (
        <>
            <Container className="pt-80 md:pt-24">
                <Row>
                    {curso.map((cursoActual) => 
                        <Curso data={cursoActual}/>
                    )}
                </Row>
            </Container>
        </>
    )
}
