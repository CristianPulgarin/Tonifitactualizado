import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function IniciarSesion({ setUserRole }: any) {
  const firestore = getFirestore();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const usersCollectionRef = collection(firestore, "users");
        const q = query(usersCollectionRef, where("email", "==", values.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setLoginError("Correo no encontrado.");
        } else {
          let userData = null;

          querySnapshot.forEach((doc) => {
            const user = doc.data();
            if (user.password === values.password) {
              userData = user;
              setUserRole(user.rol);
            }
          });

          if (userData) {
            if (userData.rol === "entrenador") {
              navigate("/ver-dieta");
            } else {
              navigate("/register");
            }
          } else {
            setLoginError("Contraseña incorrecta.");
          }
        }
      } catch (e) {
        alert("Error al iniciar sesión: " + e.message);
      }
    },
  });

  useEffect(() => {
    console.log("Valores:", formik.values);
  }, [formik.values]);

  return (
    <div className="min-h-screen top-5 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-lg bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-10">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow mb-8">
          INICIAR SESIÓN
        </h1>

        <form className="space-y-7" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-lg font-bold text-gray-200 tracking-wide"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full bg-gray-800/70 text-white placeholder-gray-400 
                         border border-gray-700 rounded-xl px-4 py-3
                         focus:ring-2 focus:ring-red-500 focus:border-red-500
                         outline-none transition shadow-inner"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-lg font-bold text-gray-200 tracking-wide"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-800/70 text-white placeholder-gray-400 
                         border border-gray-700 rounded-xl px-4 py-3
                         focus:ring-2 focus:ring-red-500 focus:border-red-500
                         outline-none transition shadow-inner"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>

          {loginError && (
            <p className="text-center text-red-400 font-semibold text-sm tracking-wide">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                       font-bold text-lg py-3 rounded-xl shadow-lg 
                       transition-transform hover:scale-[1.02]"
          >
            INGRESAR
          </button>

          <div className="pt-2 text-center">
            <Link
              to="/Actualizar"
              className="text-gray-300 hover:text-blue-400 font-semibold tracking-wide"
            >
              Recuperar contraseña
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IniciarSesion;
