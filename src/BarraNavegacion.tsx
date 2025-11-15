import { Link } from "react-router-dom";
import { useState } from "react";

export default function BarraDeNavegacion({ userRole, userEmail }: any) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white shadow-md fixed top-0 left-0 z-50 h-20 flex items-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 w-full">
        <Link to="/" onClick={() => setOpen(false)}>
          <img
            src="/ToniFit.png"
            alt="LogoTonifit"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {userEmail && (
          <span className="hidden lg:block text-blue-400 font-semibold text-lg">
            {userEmail}
          </span>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-3xl focus:outline-none"
        >
          ☰
        </button>

        <ul
          className={`
            flex flex-col lg:flex-row gap-6 lg:gap-10 
            fixed lg:static left-0 w-full lg:w-auto bg-black lg:bg-transparent
            px-6 lg:px-0 py-6 lg:py-0 transition-all text-white duration-300
            ${open ? "top-20" : "top-[-500px]"}
          `}
        >
          {userEmail && (
            <li className="lg:hidden text-blue-400 font-semibold border-b border-gray-700 pb-2">
              {userEmail}
            </li>
          )}

          {userRole === "entrenador" && (
            <>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/dietas"
                  onClick={() => setOpen(false)}
                >
                  Registrar dietas
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/registrar-rutinas"
                  onClick={() => setOpen(false)}
                >
                  Registrar rutinas
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/ver-dieta"
                  onClick={() => setOpen(false)}
                >
                  Ver dieta
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/assign-dieta"
                  onClick={() => setOpen(false)}
                >
                  Asignar dieta
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/ver-rutina"
                  onClick={() => setOpen(false)}
                >
                  Ver rutina
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/assign-rutina"
                  onClick={() => setOpen(false)}
                >
                  Asignar rutina
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/bloquear"
                  onClick={() => setOpen(false)}
                >
                  Bloquear
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/Iniciar-sesion"
                  onClick={() => setOpen(false)}
                >
                  Iniciar sesión
                </Link>
              </li>
            </>
          )}

          {userRole === "usuario" && (
            <>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/ver-dieta"
                  onClick={() => setOpen(false)}
                >
                  MIS DIETAS
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/bloquear"
                  onClick={() => setOpen(false)}
                >
                  BLOQUEAR
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/iniciar-sesion"
                  onClick={() => setOpen(false)}
                >
                  INICIAR SESIÓN
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/ver-rutina"
                  onClick={() => setOpen(false)}
                >
                  MIS RUTINAS
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/planes"
                  onClick={() => setOpen(false)}
                >
                  PLANES
                </Link>
              </li>
            </>
          )}

          {!userRole && (
            <>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/iniciar-sesion"
                  onClick={() => setOpen(false)}
                >
                  INICIAR SESIÓN
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/crear-cuenta"
                  onClick={() => setOpen(false)}
                >
                  REGISTRARSE
                </Link>
              </li>
              <li>
                <Link
                  className="text-white no-underline! hover:underline!"
                  to="/planes"
                  onClick={() => setOpen(false)}
                >
                  PLANES
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
