// Importaciones de librerías
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { FirebaseContext } from "../firebase";
import { Link } from "react-router-dom";

function Actualizar() {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      cc: "",
      edad: "",
      estatura: "",
      email: "",
      password: "",
      rol: "",
      blocked: false,
    },

    onSubmit: async (values) => {
      try {
        if (user) {
          const updatedData = { ...values };
          if (!values.password) delete updatedData.password;

          await firebase.db
            .collection("users")
            .doc(user.id)
            .update(updatedData);
          window.alert("Datos actualizados exitosamente");
        }
      } catch (e) {
        window.alert("No se pudo actualizar, causa --> " + e);
      }
    },
  });

  const handleSearchUser = async () => {
    try {
      const existingUser = await firebase.db
        .collection("users")
        .where("userName", "==", userName)
        .get();

      if (!existingUser.empty) {
        const userData = existingUser.docs[0].data();
        setUser({ ...userData, id: existingUser.docs[0].id });
        formik.setValues(userData);
      } else {
        window.alert("Usuario no encontrado");
      }
    } catch (e) {
      window.alert("Error al buscar el usuario: " + e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-3xl bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-10">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow mb-10">
          MODIFICAR DATOS DEL USUARIO
        </h1>

        <div className="space-y-4 mb-10">
          <label className="text-lg font-bold text-gray-200 tracking-wide">
            Usuario a buscar
          </label>

          <input
            type="text"
            id="userName"
            className="w-full bg-gray-800/70 text-white placeholder-gray-400 
                       border border-gray-700 rounded-xl px-4 py-3
                       focus:ring-2 focus:ring-red-500 focus:border-red-500
                       outline-none transition shadow-inner"
            placeholder="Escribe el nombre de usuario"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <button
            type="button"
            onClick={handleSearchUser}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                       font-bold text-lg py-3 rounded-xl shadow-lg 
                       transition-transform hover:scale-[1.02]"
          >
            Buscar usuario
          </button>
        </div>

        {user && (
          <form className="space-y-7" onSubmit={formik.handleSubmit}>
            {["name", "cc", "edad", "estatura", "email"].map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label
                  htmlFor={field}
                  className="text-lg font-bold text-gray-200 tracking-wide"
                >
                  {field === "cc"
                    ? "Cédula"
                    : field === "edad"
                    ? "Edad"
                    : field === "estatura"
                    ? "Estatura"
                    : field === "email"
                    ? "Correo electrónico"
                    : "Nombre completo"}
                </label>

                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  className="w-full bg-gray-800/70 text-white placeholder-gray-400 
                             border border-gray-700 rounded-xl px-4 py-3
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             outline-none transition shadow-inner"
                />
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <label className="text-lg font-bold text-gray-200 tracking-wide">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Dejar vacío para no cambiar"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full bg-gray-800/70 text-white placeholder-gray-400 
                           border border-gray-700 rounded-xl px-4 py-3
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           outline-none transition shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                         font-bold text-lg py-3 rounded-xl shadow-lg 
                         transition-transform hover:scale-[1.02]"
            >
              Actualizar datos
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Actualizar;
