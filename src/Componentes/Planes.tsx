import React from "react";
import { Link } from "react-router-dom";

const Planes = () => {
  const planesData = [
    {
      titulo: "Básico",
      beneficios: [
        "Entrada a las instalaciones",
        "Acceso a todas las máquinas",
        "Derecho a un tutor",
      ],
      link: "/pagar",
    },
    {
      titulo: "Plan VIP",
      beneficios: [
        "Todos los beneficios del básico",
        "Acceso a la zona VIP",
        "Entrada a un amigo gratis",
      ],
      link: "/pagar",
    },
    {
      titulo: "Plan Anual VIP",
      beneficios: [
        "Ahorras más dinero",
        "Acceso a la zona VIP",
        "Entrada para un amigo gratis",
      ],
      link: "/pagar#top",
    },
  ];

  return (
    <div className="
      w-full min-h-screen 
      bg-gradient-to-b from-[#0a0f1e] to-[#081020]
      pt-28 pb-16 px-4
    ">
      
      {/* CONTENEDOR EN GRID OCUPANDO TODO EL ANCHO */}
      <div className="
        max-w-[1400px] mx-auto
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-10 place-items-center
        w-full
      ">

        {planesData.map((plan, i) => (
          <div
            key={i}
            className="
              w-full max-w-[420px]
              bg-[#0d1528]
              border border-blue-900/40
              rounded-2xl p-6
              shadow-xl shadow-black/60
              hover:shadow-blue-900/40 hover:-translate-y-2
              transition-all duration-300
            "
          >
            {/* TÍTULO */}
            <h1 className="text-3xl font-extrabold text-center text-white tracking-wide drop-shadow-lg">
              {plan.titulo}
            </h1>

            <h2 className="text-center text-lg font-semibold text-white mt-3">
              Beneficios
            </h2>

            {/* LISTA */}
            <ul className="
              w-full mx-auto mt-3 rounded-xl py-4
              bg-[#142037] border border-blue-900/30
              shadow-inner flex flex-col items-center gap-3
            ">
              {plan.beneficios.map((b, index) => (
                <li
                  key={index}
                  className="
                    text-lg text-gray-200 tracking-wide 
                    hover:text-blue-400 transition-all
                  "
                >
                  {b}
                </li>
              ))}

              {/* BOTÓN */}
              <button
                className="
                  mt-4 w-[80%] py-2 text-xl font-bold rounded-xl
                  bg-blue-600 shadow-lg shadow-blue-900/40
                  hover:bg-blue-500 hover:shadow-blue-600
                  transition-all text-white
                "
              >
                <Link className="text-white no-underline! hover:underline!"  to={plan.link}>PAGAR</Link>
              </button>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planes;
