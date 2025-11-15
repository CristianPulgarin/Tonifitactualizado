import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
// import './Training.css'
import { FirebaseContext } from "../firebase";

function RegistrarRutina() {
  const { firebase } = useContext(FirebaseContext);
  const [trainings, setTrainings] = useState([]);
  console.log(trainings)
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      guia: "",
      day: "",
      startHour: "8:00 AM",
    },


    onSubmit: async (values) => {
      try {
        const trainingData = {
          name: values.name,
          description: values.description,
          category: values.category,
          guia: values.guia,
          day: values.day,
          startHour: values.startHour,
        };
        await firebase.db.collection("training").add(trainingData);
        window.alert("Entrenamiento agregado correctamente");
        window.location.reload();
      } catch (e) {
        window.alert("El Entrenamiento no se agrego" + e);
      }
    },
  });

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const snapshot = await firebase.db.collection("training").get();
        const trainingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainings(trainingList);
      } catch (error) {
        console.error("Error al obtener los entrenamientos", error);
      }
    };
    fetchTrainings();
  }, [firebase]);

  

  return (
  <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-b from-[#0b1120] to-black p-6">
    <section className="w-full max-w-2xl bg-[#0f172a] border border-[#1e293b] rounded-2xl shadow-xl p-8">
      
      <h1 className="text-3xl text-center font-extrabold tracking-wide text-white mb-8">
        REGISTRAR RUTINA
      </h1>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        

        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-blue-300 mb-2">
            Nombre de la rutina
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155] 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-blue-300 mb-2">
            Descripción de la rutina
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#1e293b] text-white w-full p-3 rounded-xl min-h-[120px] border border-[#334155]
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div>
          <label htmlFor="category" className="block text-lg font-semibold text-blue-300 mb-2">
            Tipo de ejercicio
          </label>
          <select
            id="category"
            name="category"
            required
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155]
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Cardio">Cardio</option>
            <option value="Pierna">Pierna</option>
            <option value="Brazos">Brazos</option>
            <option value="Abdomen">Abdomen</option>
            <option value="Pecho">Pecho</option>
          </select>
        </div>


        <div>
          <label htmlFor="guia" className="block text-lg font-semibold text-blue-300 mb-2">
            Link guía
          </label>
          <select
            id="guia"
            name="guia"
            required
            value={formik.values.guia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155]
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona la guía</option>
            <option value="https://www.youtube.com/watch?v=IQzGRo3F0Ys&ab_channel=GymTopz">Brazo</option>
            <option value="https://www.youtube.com/watch?v=QOVXlsAfOT0&ab_channel=BUFFAcademyAPP">Cardio</option>
            <option value="https://www.youtube.com/watch?v=x7zLcAWueAc&ab_channel=BUFFAcademyAPP">Pecho</option>
            <option value="https://www.youtube.com/watch?v=Z2X5w4_eiH8&ab_channel=GymTopz">Pierna</option>
            <option value="https://www.youtube.com/watch?v=L1kn_0zO6VU&ab_channel=CarlosBelcast">Abdomen</option>
          </select>
        </div>


        <div>
          <label htmlFor="day" className="block text-lg font-semibold text-blue-300 mb-2">
            Día disponible
          </label>
          <select
            id="day"
            name="day"
            required
            value={formik.values.day}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155]
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Elija un día</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label htmlFor="startHour" className="block text-lg font-semibold text-blue-300 mb-2">
            Hora de inicio
          </label>
          <select
            id="startHour"
            name="startHour"
            required
            value={formik.values.startHour}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-[#334155]
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="8:00 PM">8:00 PM</option>
          </select>
        </div>


        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 transition-all font-bold text-white 
                     rounded-xl shadow-lg hover:shadow-blue-600/30"
        >
          CREAR RUTINA
        </button>
      </form>
    </section>
  </div>
);

}
export default RegistrarRutina;
