// Importaciones
import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useFormik } from "formik";
import "../../public/Style/register.css";
import { FirebaseContext } from "../firebase";
function CrearCuenta() {
    const { firebase } = useContext(FirebaseContext);
  const [showTrainerPassword, setShowTrainerPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      cc: null,
      edad: null,
      estatura: "",
      userName: "",
      email: "",
      password: "",
      trainerPassword: "",
      rol: "",
      blocked: false,
    },

    onSubmit: async (values: any) => {
      try {
        const existingUserByUsername = await firebase.db
          .collection("users")
          .where("userName", "==", values.userName)
          .get();

        const existingUserByEmail = await firebase.db
          .collection("users")
          .where("email", "==", values.email)
          .get();

        if (values.rol === "entrenador" && values.trainerPassword !== "123456") {
          return window.alert("La contraseña para entrenadores debe ser '123456'.");
        }

        if (!existingUserByUsername.empty) {
          window.alert("El nombre de usuario ya está en uso.");
        } else if (!existingUserByEmail.empty) {
          window.alert("El correo electrónico ya está en uso.");
        } else {
          await firebase.db.collection("users").add(values);
          window.alert("Registro exitoso");
        }
      } catch (e) {
        window.alert("Registro no exitoso, causa → " + e);
      }
    },
  });

  useEffect(() => {
    console.log("Valores actuales del formulario:", formik.values);
  }, [formik.values]);

  const handleRoleChange = (event: any) => {
    const selectedRole = event.target.value;
    formik.setFieldValue("rol", selectedRole);
    setShowTrainerPassword(selectedRole === "entrenador");
  };

  return (
    <div className="register-bg pt-24">
      <div className="register-container">
        <h1 className="register-title">Registrar Datos</h1>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>

          {/* NOMBRE */}
          <label className="register-label">Nombre completo</label>
          <input type="text" className="register-input" required {...formik.getFieldProps("name")} />

          {/* CC */}
          <label className="register-label">Cédula</label>
          <input type="number" className="register-input" required {...formik.getFieldProps("cc")} />

          {/* USERNAME */}
          <label className="register-label">Usuario</label>
          <input type="text" className="register-input" required {...formik.getFieldProps("userName")} />

          {/* EDAD */}
          <label className="register-label">Edad</label>
          <input type="number" className="register-input" required {...formik.getFieldProps("edad")} />

          {/* ESTATURA */}
          <label className="register-label">Estatura</label>
          <input type="number" className="register-input" required {...formik.getFieldProps("estatura")} />

          {/* EMAIL */}
          <label className="register-label">Email</label>
          <input type="email" className="register-input" required {...formik.getFieldProps("email")} />

          {/* PASSWORD */}
          <label className="register-label">Contraseña</label>
          <input type="password" className="register-input" required {...formik.getFieldProps("password")} />

          {/* ROL */}
          <label className="register-label">Rol</label>
          <select id="rol" className="register-select" value={formik.values.rol} onChange={handleRoleChange}>
            <option value="" disabled>Seleccione una opción</option>
            <option value="usuario">Usuario</option>
            <option value="entrenador">Entrenador</option>
          </select>

          {/* PASSWORD ENTRENADOR */}
          {showTrainerPassword && (
            <>
              <label className="register-label">Contraseña de Entrenador</label>
              <input
                type="password"
                className="register-input"
                required
                {...formik.getFieldProps("trainerPassword")}
              />
            </>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            className="register-button"
            onClick={(e) => {
              e.preventDefault();
              if (formik.values.edad < 10 || formik.values.password.length < 6) {
                alert("La edad debe ser mayor a 10 y la clave debe tener más de 6 dígitos");
              } else {
                formik.handleSubmit();
              }
            }}
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearCuenta;
