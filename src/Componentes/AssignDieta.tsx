import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const AssignDieta = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classs, setClass] = useState([]);
  const [selectedDieta, setSelectedDieta] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [availableDietas, setAvailableDietas] = useState([]);
  const [assignedDietas, setAssignedDietas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUserTerm, setSearchUserTerm] = useState("");

  // --- Firebase ---
  useEffect(() => {
    const unsubscribeUsers = firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    });

    const unsubscribeDietas = firebase.db.collection("dieta").onSnapshot((snapshot) => {
      const dietaList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAvailableDietas(dietaList);
      setClass(dietaList);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeDietas();
    };
  }, [firebase]);

  useEffect(() => {
    const unsubscribeAssigned = firebase.db.collection("assigned2").onSnapshot((snapshot) => {
      const assignedList = snapshot.docs.map((doc) => ({
        id: doc.id,
        DietaId: doc.data().DietaId,
        userId: doc.data().userId,
        available: doc.data().available,
      }));
      setAssignedDietas(assignedList);
    });

    return () => unsubscribeAssigned();
  }, [firebase]);

  // --- Funciones ---
  const assignDieta = () => {
    if (!selectedUser || !selectedDieta) {
      window.alert("Selecciona un usuario y una dieta.");
      return;
    }
    firebase.db.collection("assigned2").add({
      userId: selectedUser,
      DietaId: selectedDieta,
      available: true,
    });
    window.alert("Dieta asignada correctamente.");
    setSelectedUser("");
    setSelectedDieta("");
  };

  const unassignDieta = (assignedDietaId) => {
    firebase.db.collection("assigned2").doc(assignedDietaId).update({ available: false });
    setAssignedDietas(assignedDietas.filter((d) => d.id !== assignedDietaId));
  };

  const availableOptions = availableDietas
    .filter((dieta) =>
      !assignedDietas.some((assigned) => assigned.DietaId === dieta.id && assigned.available === true)
    )
    .map((dieta) => (
      <option key={dieta.id} value={dieta.id}>
        {`Dieta: ${dieta.dieta} - Cantidad: ${dieta.cantidad} - Horario: ${dieta.horario}`}
      </option>
    ));

  const filteredUsers = users.filter((u) =>
    !u.blocked && u.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssignedDietas = assignedDietas.filter((assigned) => {
    const user = users.find((u) => u.id === assigned.userId);
    return user && user.userName.toLowerCase().includes(searchUserTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col pt-24 bg-gradient-to-b from-[#0a1124] to-[#000000] min-h-screen p-6">
      
      <div className="bg-[#0d1b33] p-8 rounded-xl shadow-xl border border-blue-900/40">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow mb-6">
          ASIGNAR DIETAS
        </h2>

        <div className="mb-6">
          <label className="text-xl text-blue-200 font-semibold block text-center">
            Usuario
          </label>

          <div className="flex justify-center">
            <select
              id="user"
              className="bg-[#051025] text-blue-100 border border-blue-700 rounded-lg px-4 py-3 w-96
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Selecciona un usuario</option>
              {filteredUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xl text-blue-200 font-semibold block text-center">
            Dietas disponibles
          </label>

          <div className="flex justify-center">
            <select
              id="training"
              className="bg-[#051025] text-blue-100 border border-blue-700 rounded-lg px-4 py-3 w-96
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedDieta}
              onChange={(e) => setSelectedDieta(e.target.value)}
            >
              <option value="">Selecciona una dieta</option>
              {availableOptions}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={assignDieta}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl 
                       font-semibold shadow-lg transition-all"
          >
            Asignar Dieta
          </button>
        </div>
      </div>


      <div className="bg-[#0d1b33] p-8 rounded-xl shadow-xl border border-blue-900/40 mt-8">
        <h2 className="text-3xl font-bold text-white text-center drop-shadow mb-4">
          Dietas asignadas
        </h2>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="bg-[#051025] text-blue-100 border border-blue-700 rounded-lg px-4 py-2 w-1/2 mb-4
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchUserTerm}
            onChange={(e) => setSearchUserTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredAssignedDietas.map((assigned) => (
            <div key={assigned.id} className="bg-[#071427] p-5 rounded-lg border border-blue-800 shadow-md">
              <h3 className="text-xl font-semibold text-white">
                Dieta: {classs.find((c) => c.id === assigned.DietaId)?.dieta}
              </h3>

              <p className="text-blue-100">
                <strong>Cliente: </strong>
                {users.find((u) => u.id === assigned.userId)?.userName || "Usuario no encontrado"}
              </p>

              <p className="text-blue-100">
                <strong>Horario: </strong>
                {classs.find((c) => c.id === assigned.DietaId)?.horario}
              </p>

              <button
                onClick={() => unassignDieta(assigned.id)}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md"
              >
                Cancelar dieta
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AssignDieta;
