import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import BarraDeNavegacion from "./BarraNavegacion";
import Footer from "./Footer";

const Boxeo = () => {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("/boxeo.json");
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchDatos();
  }, []);

  if (!datos) {
    return (
      <div className="text-center text-light py-5 bg-dark">
        <h4>Cargando contenido...</h4>
      </div>
    );
  }

  const { cursos, contenidoPrincipal } = datos;

  return (
    <>
      <div className="container-fluid bg-dark text-white min-vh-100 py-4">
        <div className="row">

          <aside className="col-12 col-md-3 border-end border-secondary">
            <h3 className="text-center mt-4 mb-3 fw-bold text-uppercase">
              Cursos de Boxeo
            </h3>
            <div className="d-flex flex-column gap-3 px-3">
              {cursos.map((curso, idx) => (
                <Link
                  key={idx}
                  to={`/cursos-disponibles/${curso.nombre}`}
                  className="text-decoration-none text-white bg-secondary rounded-3 py-2 px-3 text-center fw-semibold shadow-sm transition-all hover:bg-light hover:text-dark"
                  style={{
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {curso.nombre}
                </Link>
              ))}
            </div>
          </aside>


          <main className="col-12 col-md-9 px-4 mt-4">
            <section className="mb-5">
              <div className="row align-items-center">
                <div className="col-lg-4 text-center">
                  <img
                    src={contenidoPrincipal.imagenPrincipal}
                    alt="Curso Boxeo"
                    className="img-fluid rounded-3 border border-light shadow-sm"
                    style={{ maxWidth: "90%" }}
                  />
                </div>
                <div className="col-lg-8 mt-3 mt-lg-0">
                  <h2 className="fw-bold border-bottom border-light pb-2">
                    {contenidoPrincipal.titulo}
                  </h2>
                  <div className="mt-3">
                    {contenidoPrincipal.descripcion.map((desc, index) => (
                      <p key={index} className="mb-2 lh-lg">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            <section>
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h4 className="fw-semibold mb-3 border-bottom border-secondary pb-2">
                    Horarios
                  </h4>
                  {contenidoPrincipal.horario.map((hora, index) => (
                    <p key={index} className="mb-1">
                      {hora}
                    </p>
                  ))}

                  <h4 className="fw-semibold mt-4 mb-3 border-bottom border-secondary pb-2">
                    Torneos
                  </h4>
                  {contenidoPrincipal.torneos.map((torneo, index) => (
                    <p key={index} className="mb-1">
                      {torneo}
                    </p>
                  ))}
                </div>
                <div className="col-lg-4 text-center mt-4 mt-lg-0">
                  <img
                    src={contenidoPrincipal.imagenTorneo}
                    alt="Torneo Boxeo"
                    className="img-fluid rounded-3 border border-light shadow-sm"
                    style={{ maxWidth: "90%" }}
                  />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Boxeo;
