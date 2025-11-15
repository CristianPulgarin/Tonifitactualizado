import { useContext } from "react";
import { ScrollContext } from "../Providers/ScrollspyProvider";
import { Link } from "react-router";
import { Navbar, Container, Nav, Col, Button, Row } from "react-bootstrap";

export default function Scrollspy() {
  const { scrollMaquina } = useContext(ScrollContext);

  return (
    <>
      {/* Navbar de navegación */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="sm"
        sticky="top"
        className="shadow-sm py-3"
      >
        <Container>
          <Nav className="mx-auto">
            {scrollMaquina.map((item) => (
              <Nav.Link
                key={item.id}
                href={`#${item.id}`}
                className="text-light mx-2 fw-semibold position-relative"
                style={{
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0d6efd")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                {item.titulo}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>

      {/* Contenedor principal con secciones */}
      <Container
        fluid
        style={{
          height: "600px",
          overflowY: "scroll",
          scrollBehavior: "smooth",
          backgroundColor: "#121212",
        }}
      >
        {scrollMaquina.map((item, index) => (
          <Row
            key={item.id}
            id={item.id}
            className={`container-fluid text-white p-5 align-items-center ${
              index % 2 === 0 ? "bg-dark" : "bg-secondary"
            }`}
            style={{
              minHeight: "100vh",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <Col
              lg={6}
              className="text-center d-flex flex-column align-items-center"
            >
              <h1
                className="mb-4 fw-bold"
                style={{
                  color: "#0d6efd",
                  borderBottom: "2px solid #0d6efd",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                {item.titulo}
              </h1>
              <img
                src={item.imagen}
                className="img-fluid rounded-3 shadow-lg"
                alt={item.titulo}
                style={{
                  maxHeight: "300px",
                  objectFit: "cover",
                  border: "2px solid white",
                }}
              />
            </Col>

            <Col lg={6} className="mt-5">
              <h2 className="fw-semibold mb-3">{item.subtitulo}</h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#e0e0e0",
                  lineHeight: "1.6",
                }}
              >
                {item.descripcion}
              </p>

              <h4
                className="mt-4"
                style={{
                  color: "#00c853",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                DISPONIBILIDAD: HOY MISMO
              </h4>

              <Button
                as={Link}
                to="/maquinas-disponibles"
                variant="primary"
                className="mt-4 fw-semibold"
                style={{
                  borderRadius: "25px",
                  padding: "8px 20px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0b5ed7";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0d6efd";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Leer más
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
