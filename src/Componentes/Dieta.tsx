//Importaciones de librerias , componentes y hooks
import React, { useContext } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { FirebaseContext } from "../firebase";

function Dieta() {
  const { firebase } = useContext(FirebaseContext);

  const formik2 = useFormik({
    initialValues: {
      dieta: "",
      cantidad: "",
      suplemento: "",
      horario: "",
      blocked: false,
    },

    onSubmit: async (values) => {
      try {
        await firebase.db.collection("dieta").add(values);
        window.alert("Registro exitoso");
      } catch (e) {
        window.alert("Registro no exitoso, causa --> " + e);
      }
    },
  });

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-b from-[#0b1120] to-[#000] p-6">
      <section className="w-full max-w-xl bg-[#0f172a] border border-[#1e293b] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl text-center font-extrabold tracking-wide text-white mb-8">
          REGISTRAR DIETAS
        </h1>

        <form className="space-y-6" onSubmit={formik2.handleSubmit}>
          <div>
            <label
              htmlFor="dieta"
              className="block mb-2 text-lg font-semibold text-blue-300"
            >
              Nombre de la dieta
            </label>
            <input
              type="text"
              id="dieta"
              required
              value={formik2.values.dieta}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="cantidad"
              className="block mb-2 text-lg font-semibold text-blue-300"
            >
              Cantidad
            </label>
            <input
              type="text"
              id="cantidad"
              required
              value={formik2.values.cantidad}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="suplemento"
              className="block mb-2 text-lg font-semibold text-blue-300"
            >
              Suplemento
            </label>
            <input
              type="text"
              id="suplemento"
              required
              value={formik2.values.suplemento}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="horario"
              className="block mb-2 text-lg font-semibold text-blue-300"
            >
              Horario
            </label>
            <input
              id="horario"
              name="horario"
              required
              value={formik2.values.horario}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all font-bold text-white rounded-xl shadow-lg hover:shadow-blue-600/30"
            >
              CREAR DIETA
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Dieta;
