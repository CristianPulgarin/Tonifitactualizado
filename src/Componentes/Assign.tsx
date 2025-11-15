import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const Assign = () => {
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
        {`Entrenamiento: ${training.name} - Día: ${training.day} - Hora: ${training.startHour}`}
      </option>
    ));

  const filteredAssignedTrainings = assignedTrainings.filter(
    (assignedTraining) => {
      const assignedClass = classs.find(
        (clas) => clas.id === assignedTraining.trainingId
      );
      const assignedUser = users.find(
        (user) => user.id === assignedTraining.userId
      );

      return (
        assignedTraining.available &&
        (assignedClass?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignedUser?.userName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  );

  return (
    <>
      <div className="flex flex-col px-4 pt-24 pb-10 bg-[#0b1120] min-h-screen">

        {/* Título principal */}
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl shadow-xl border border-white/10 mx-auto w-full max-w-3xl">
          <h2 className="text-3xl text-center font-bold text-white tracking-wide">
            ASIGNAR RUTINAS
          </h2>
        </div>

        {/* Selector de usuario */}
        <div className="backdrop-blur-md bg-white/10 mt-6 p-6 rounded-xl shadow-xl border border-white/10 mx-auto w-full max-w-3xl">
          <label className="text-xl text-blue-300 block font-semibold text-center mb-2">
            Datos del Usuario
          </label>
          <select
            className="bg-[#111a2c] border border-blue-700 text-white py-3 px-4 rounded-lg w-full"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Selecciona un usuario</option>
            {users
              .filter((user) => !user.blocked)
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))}
          </select>
        </div>

        {/* Selector entrenamiento */}
        <div className="backdrop-blur-md bg-white/10 mt-4 p-6 rounded-xl shadow-xl border border-white/10 mx-auto w-full max-w-3xl">
          <label className="text-xl text-blue-300 block font-semibold text-center mb-2">
            Entrenamientos disponibles
          </label>
          <select
            className="bg-[#111a2c] border border-blue-700 text-white py-3 px-4 rounded-lg w-full"
            value={selectedTraining}
            onChange={(e) => setSelectedTraining(e.target.value)}
          >
            <option value="">Selecciona un entrenamiento</option>
            {availableOptions}
          </select>

          <div className="flex justify-center mt-6">
            <button
              onClick={assignRutina}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-lg font-bold tracking-wide shadow-lg"
            >
              Asignar Entrenamiento
            </button>
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="backdrop-blur-md bg-white/10 mt-8 p-8 rounded-xl shadow-xl border border-white/10 mx-auto w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-blue-300 mb-4">
            Clases Asignadas
          </h2>

          <input
            type="text"
            placeholder="Buscar por nombre o usuario..."
            className="bg-[#111a2c] text-white py-3 px-4 border border-blue-700 w-full rounded-lg mb-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Lista asignadas */}
          <div className="space-y-4">
            {filteredAssignedTrainings.map((assignedTraining) => {
              const assignedClass = classs.find(
                (c) => c.id === assignedTraining.trainingId
              );
              const assignedUser = users.find(
                (u) => u.id === assignedTraining.userId
              );

              if (assignedClass && assignedUser) {
                return (
                  <div
                    key={assignedTraining.id}
                    className="p-5 rounded-xl border border-blue-900 bg-white/10 backdrop-blur-md shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {assignedClass.name}
                    </h3>
                    <p className="text-blue-300">
                      <strong>Cliente:</strong> {assignedUser.userName}
                    </p>
                    <p className="text-blue-300">
                      <strong>Categoría:</strong> {assignedClass.category}
                    </p>
                    <p className="text-blue-300">
                      <strong>Hora:</strong> {assignedClass.startHour}
                    </p>
                    <p className="text-blue-300">
                      <strong>Día:</strong> {assignedClass.day}
                    </p>

                    <button
                      onClick={() => unassignRutina(assignedTraining.id)}
                      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
                    >
                      Cancelar Clase
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Assign;
