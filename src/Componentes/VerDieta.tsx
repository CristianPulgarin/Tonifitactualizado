import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const VerDieta = () => {
  const { firebase } = useContext(FirebaseContext);

  const [users, setUsers] = useState([]);
  const [classs, setClass] = useState([]);
  const [selectedDieta, setSelectedDieta] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [availableDietas, setAvailableDietas] = useState([]);
  const [assignedDietas, setAssignedDietas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUserTerm, setSearchUserTerm] = useState("");

  // =============== Obtener usuarios y dietas ===============
  useEffect(() => {
    const unsubscribeUsers = firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    const unsubscribeDietas = firebase.db.collection("dieta").onSnapshot((snapshot) => {
      const dietaList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableDietas(dietaList);
      setClass(dietaList);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeDietas();
    };
  }, [firebase]);

  // =============== Obtener dietas asignadas ===============
  useEffect(() => {
    const unsubscribeAssigned = firebase.db
      .collection("assigned2")
      .onSnapshot((snapshot) => {
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

  // =============== Asignar dieta ===============
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

  // =============== Desasignar dieta ===============
  const unassignDieta = (assignedDietaId) => {
    firebase.db.collection("assigned2").doc(assignedDietaId).update({
      available: false,
    });

    const updated = assignedDietas.filter(
      (assigned) => assigned.id !== assignedDietaId
    );

    setAssignedDietas(updated);
  };

  // =============== Opciones de dietas disponibles ===============
  const availableOptions = availableDietas
    .filter((dieta) => {
      return !assignedDietas.some(
        (assigned) => assigned.DietaId === dieta.id && assigned.available
      );
    })
    .map((dieta) => (
      <option key={dieta.id} value={dieta.id}>
        {`Dieta: ${dieta.dieta} - Cantidad: ${dieta.cantidad} - Horario: ${dieta.horario}`}
      </option>
    ));

  // =============== Filtro de usuarios ===============
  const filteredUsers = users.filter(
    (user) =>
      !user.blocked &&
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =============== Filtro de dietas asignadas ===============
  const filteredAssignedDietas = assignedDietas.filter((assigned) => {
    const user = users.find((u) => u.id === assigned.userId);
    return user && user.userName.toLowerCase().includes(searchUserTerm.toLowerCase());
  });

  return (
    <div className="pt-24 min-h-screen pt-24 px-6 pb-10 bg-gradient-to-b text-white from-[#0b1120] to-[#000]">


      <div className="rounded-2xl bg-[#0f172a] border border-blue-800/40 shadow-xl p-6 text-center">
        <h2 className="text-4xl font-extrabold tracking-wide 
          bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
          VER Y GESTIONAR DIETAS
        </h2>
      </div>

      <div className="mt-10 bg-[#0f172a] border border-blue-900/40 shadow-2xl rounded-3xl p-10">

        <h2 className="text-3xl font-bold text-center text-blue-300 mb-4 tracking-wide">
          Dietas Asignadas
        </h2>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="bg-[#101a33] text-white border border-blue-800/40 p-3 w-full max-w-xl 
              rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchUserTerm}
            onChange={(e) => setSearchUserTerm(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {filteredAssignedDietas.map((assigned) => (
            <div key={assigned.id}>
              {assigned.available && (
                <div
                  className="bg-[#101a33] border border-blue-800/40 p-6 rounded-2xl 
                  shadow-lg shadow-blue-900/20 hover:shadow-blue-700/30 transition-all"
                >
                  <h3 className="text-xl font-semibold text-blue-300">
                    Dieta:{" "}
                    {
                      classs.find((c) => c.id === assigned.DietaId)?.dieta ||
                      "Dieta no encontrada"
                    }
                  </h3>

                  <p className="text-gray-300 mt-1">
                    <strong className="text-blue-400">Cliente:</strong>{" "}
                    {
                      (function () {
                        const user = users.find((u) => u.id === assigned.userId);
                        return user ? user.userName : "Usuario no encontrado";
                      })()
                    }
                  </p>

                  <p className="text-gray-300">
                    <strong className="text-blue-400">Horario:</strong>{" "}
                    {
                      classs.find((c) => c.id === assigned.DietaId)?.horario ||
                      "Horario no encontrado"
                    }
                  </p>

                  <div className="mt-4">
                    <button
                      onClick={() => unassignDieta(assigned.id)}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold 
                        rounded-xl shadow-md shadow-red-800/30 transition-all"
                    >
                      Cancelar dieta
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VerDieta;
