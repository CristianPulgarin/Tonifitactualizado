import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function Footer() {
  const [datosFooter, setDatosFooter] = useState([]);

  useEffect(() => {
    const fetchFooter = async () => {
      const response = await fetch("/footer.json");
      const data = await response.json();
      setDatosFooter(data.footer);
    };
    fetchFooter();
  }, []);

  return (
    <>
      {datosFooter.length === 0 ? (
        <p>No está cargando el JSON</p>
      ) : (
        <footer
          className="pt-5 mt-5 text-white"
          style={{
            background: "linear-gradient(180deg, #111 0%, #000 100%)",
            borderTop: "2px solid #0dcaf0",
          }}
        >
          <Container fluid className="px-5">
            <div className="row justify-content-center align-items-center mb-4">
              <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                <img
                  src={datosFooter.logo.src}
                  alt={datosFooter.logo.alt}
                  style={{
                    borderRadius: "20%",
                    width: "180px",
                    height: "auto",
                    boxShadow: "0 0 15px rgba(13, 202, 240, 0.4)",
                  }}
                />
                <p
                  className="mt-3"
                  style={{
                    fontSize: "0.9rem",
                    color: "#bbb",
                  }}
                >
                  {datosFooter.copyright}
                </p>
              </div>

              <div className="col-12 col-md-8">
                <div className="row text-center text-md-start">
                  {datosFooter.secciones.map((seccion, index) => (
                    <div key={index} className="col-12 col-md-4 mb-4">
                      <h5
                        className="mb-3"
                        style={{
                          borderBottom: "2px solid #0dcaf0",
                          paddingBottom: "5px",
                        }}
                      >
                        {seccion.titulo}
                      </h5>
                      <ul className="list-unstyled">
                        {seccion.links.map((enlace, i) => (
                          <li key={i} className="mb-2">
                            <a
                              href={enlace.link}
                              className="text-white text-decoration-none"
                              style={{
                                transition: "color 0.3s ease",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.color = "#0dcaf0")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.color = "white")
                              }
                            >
                              {enlace.nombre}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="text-center py-3 mt-3"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "0.85rem",
                color: "#aaa",
              }}
            >
              © {new Date().getFullYear()} — Todos los derechos reservados
            </div>
          </Container>
        </footer>
      )}
    </>
  );
}

export default Footer;
