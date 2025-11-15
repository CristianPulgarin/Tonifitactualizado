import { useContext, useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { MaquinaContext } from "../Providers/MaquinasProvider.jsx";
import Maquina from "./Maquina.jsx"

export default function MaquinaLista() {
    const {maquina} = useContext(MaquinaContext);

    return (
        <>
            <Container className="pt-24">
                <Row>
                    {maquina.map((maquinaActual) => 
                        <Maquina data={maquinaActual}/>
                    )}
                </Row>
            </Container>
        </>
    )
}
