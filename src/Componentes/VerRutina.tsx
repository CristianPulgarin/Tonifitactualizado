import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
// import './Assign2.css';

const VerRutina = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classs, setClass] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [availableTrainings, setAvailableTrainings] = useState([]);
  const [assignedTrainings, setAssignedTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userSnapshot = await firebase.db.collection("users").get();
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);

      const trainingSnapshot = await firebase.db.collection("training").get();
      const trainingList = trainingSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableTrainings(trainingList);
      setClass(trainingList);

      const assignedSnapshot = await firebase.db.collection("assigned").get();
      const assignedList = assignedSnapshot.docs.map((doc) => ({
        id: doc.id,
        trainingId: doc.data().trainingId,
        userId: doc.data().userId,
        available: doc.data().available,
      }));
      setAssignedTrainings(assignedList);
    };

    fetchData();
  }, [firebase]);

  const assignRutina = async () => {
    if (!selectedUser || !selectedTraining) {
      window.alert("Selecciona un usuario y un horario de entrenamiento.");
      return;
    }

    await firebase.db.collection("assigned").add({
      userId: selectedUser,
      trainingId: selectedTraining,
      available: true,
    });

    const assignedSnapshot = await firebase.db.collection("assigned").get();
    const assignedList = assignedSnapshot.docs.map((doc) => ({
      id: doc.id,
      trainingId: doc.data().trainingId,
      userId: doc.data().userId,
      available: doc.data().available,
    }));
    setAssignedTrainings(assignedList);

    // Eliminar el usuario asignado de la lista desplegable
    const updatedUsers = users.filter((user) => user.id !== selectedUser);
    setUsers(updatedUsers);

    window.alert("Entrenamiento asignado correctamente.");
    setSelectedUser("");
    setSelectedTraining("");
  };

  const unassignRutina = async (assignedTrainingId) => {
    await firebase.db.collection("assigned").doc(assignedTrainingId).update({
      available: false,
    });

    const updatedAssignedTrainings = assignedTrainings.filter(
      (assignedTraining) => assignedTraining.id !== assignedTrainingId
    );
    setAssignedTrainings(updatedAssignedTrainings);
  };

  const availableOptions = availableTrainings
    .filter((training) => {
      return !assignedTrainings.some(
        (assigned) =>
          assigned.trainingId === training.id && assigned.available === true
      );
    })
    .map((training) => (
      <option key={training.id} value={training.id}>
        {`Entrenamiento: ${training.name} - Fecha inicio: ${training.day}, Hora inicio: ${training.startHour}`}
      </option>
    ));

  // Filtrado de entrenamientos asignados basado en el término de búsqueda
  const filteredAssignedTrainings = assignedTrainings.filter((assignedTraining) => {
    const assignedClass = classs.find((clas) => clas.id === assignedTraining.trainingId);
    const assignedUser = users.find((user) => user.id === assignedTraining.userId);

    return (
      assignedTraining.available &&
      (assignedClass?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignedUser?.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
  <div className="min-h-screen pt-24 w-full bg-gradient-to-b from-[#0a0f1f] to-[#00040a] text-white py-10 px-4">

    {/* TÍTULO */}
    <div className="max-w-4xl mx-auto bg-[#0f1629] border border-blue-800/40 shadow-xl rounded-2xl p-6 mb-6">
      <h2 className="text-4xl font-bold text-center tracking-wide text-blue-300 drop-shadow-lg">
        RUTINAS
      </h2>
    </div>

    {/* BUSCADOR */}
    <div className="max-w-4xl mx-auto bg-[#0f1629] border border-blue-900/40 p-6 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold text-blue-200 mb-2 text-center uppercase">
        Clases Asignadas
      </h3>

      <input
        type="text"
        placeholder="Buscar entrenamientos asignados..."
        className="w-full p-3 rounded-lg bg-[#0a1222] border border-blue-700/40 text-blue-100 placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* LISTA DE CARDS */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">

        {filteredAssignedTrainings.map((assignedTraining) => {
          const assignedClass = classs.find((c) => c.id === assignedTraining.trainingId);
          const assignedUser = users.find((u) => u.id === assignedTraining.userId);

          if (!assignedTraining.available || !assignedClass || !assignedUser) return null;

          return (
            <div
              key={assignedTraining.id}
              className="bg-[#0b1220] border border-blue-800/40 shadow-lg rounded-xl p-5 transition transform hover:-translate-y-1 hover:shadow-blue-900/40"
            >
              <h3 className="text-xl font-semibold text-blue-300">
                {assignedClass.name}
              </h3>

              <p className="text-blue-100/70 mt-1">
                <strong className="text-blue-300">Cliente:</strong> {assignedUser.userName}
              </p>

              <p className="text-blue-100/70">
                <strong className="text-blue-300">Categoría:</strong> {assignedClass.category}
              </p>

              <p className="text-blue-100/70">
                <strong className="text-blue-300">Hora de inicio:</strong> {assignedClass.startHour}
              </p>

              <p className="text-blue-100/70">
                <strong className="text-blue-300">Día:</strong> {assignedClass.day}
              </p>

              <p className="text-blue-100/70">
                <strong className="text-blue-300">Guía:</strong>{" "}
                <a
                  href={assignedClass.guia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline hover:text-blue-400 transition"
                >
                  Ver guía
                </a>
              </p>

              <button
                onClick={() => unassignRutina(assignedTraining.id)}
                className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 transition rounded-lg font-semibold w-full shadow-md"
              >
                Cancelar clase del cliente
              </button>
            </div>
          );
        })}

      </div>
    </div>
  </div>
);


};

export default VerRutina;
