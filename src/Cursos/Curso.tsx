import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router";

const Curso = ({ data }) => {
  return (
    <Col md={3} className="mb-4">
      <Card
        className="h-100 shadow-lg border-0"
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          background: "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        <Card.Img
          variant="top"
          src={data.imagen}
          alt={data.titulo}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="fw-bold text-center"
            style={{ color: "#0d6efd", fontSize: "1.2rem" }}
          >
            {data.titulo}
          </Card.Title>

          <Card.Text className="text-muted text-center mb-2">
            {data.categoria}
          </Card.Text>

          <Card.Text
            className="text-secondary text-center flex-grow-1"
            style={{
              fontSize: "0.9rem",
            }}
          >
            {data.descripcion}
          </Card.Text>

          <div className="text-center mt-3">
            <Button
              as={Link}
              to={`/cursos-disponibles/${data.titulo}`}
              variant="primary"
              style={{
                borderRadius: "20px",
                padding: "6px 18px",
                fontWeight: "600",
                transition: "background-color 0.3s ease",
              }}
            >
              Leer más
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Curso;
