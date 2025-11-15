import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import Modal from "react-modal";

const Bloquear = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [blockReason, setBlockReason] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, [firebase]);

  const toggleBlockUser = (userId, isBlocked) => {
    if (isBlocked) {
      firebase.db.collection("users").doc(userId).update({
        blocked: false,
      });
    } else {
      setSelectedUser(userId);
      setModalIsOpen(true);
    }
  };

  const handleBlockUser = () => {
    if (selectedUser && blockReason) {
      firebase.db.collection("users").doc(selectedUser).update({
        blocked: true,
        blockReason: blockReason,
      });
      setModalIsOpen(false);
      setBlockReason("");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full bg-[#0d1117] pt-24 text-white rounded-xl shadow-xl p-8 border border-[#1f2937]">
        <h1 className="text-4xl text-center font-bold mb-6 text-blue-400">
          BLOQUEO DE USUARIOS
        </h1>


        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-600 bg-[#161b22] text-white p-3 rounded-lg w-full"
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-[#161b22] border border-gray-700 p-6 rounded-lg shadow-md hover:border-blue-500 transition"
            >
              <strong className="block text-xl font-semibold mb-2 text-blue-300">
                Usuario:
              </strong>

              <p className="text-xl mb-2">{user.userName}</p>

              <p className="text-lg mb-2">
                {user.blocked ? (
                  <span className="text-red-400 font-semibold">🔒 Bloqueado</span>
                ) : (
                  <span className="text-green-400 font-semibold">✔️ Activo</span>
                )}
              </p>

              <button
                onClick={() => toggleBlockUser(user.id, user.blocked)}
                className={`w-full font-bold py-2 px-4 rounded-md mt-4 transition ${
                  user.blocked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {user.blocked ? "Desbloquear" : "Bloquear"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Motivo de bloqueo"
        className="bg-[#0d1117] border border-gray-700 text-white rounded-lg p-6 w-11/12 md:w-1/3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
        overlayClassName="bg-black bg-opacity-60 fixed inset-0"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          Motivo del bloqueo
        </h2>

        <textarea
          className="w-full h-32 bg-[#161b22] border border-gray-600 text-white rounded-md p-3"
          value={blockReason}
          onChange={(e) => setBlockReason(e.target.value)}
        ></textarea>

        <div className="mt-4 text-right">
          <button
            onClick={handleBlockUser}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition"
          >
            Confirmar bloqueo
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Bloquear;
