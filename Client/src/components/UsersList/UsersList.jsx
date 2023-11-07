import React, { useEffect, useState } from "react";
import DataUsers from "../DataUsers/DataUsers";
import { useFetch } from "../customHooks/useFetch";

export default function UsersLists() {
  const { data, loading, error, total } = useFetch(import.meta.env.VITE_FETCH_USERS);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const handleEdit = (_id) => {

    fetch(`${import.meta.env.VITE_FETCH_EDIT_USERS}/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users.name, users.lastname, phone),
    })
      .then((response) => response.json())
      .then((data) => {

        console.log("Usuario editado con éxito:", data);
      })
      .catch((error) => {

        console.error("Error al editar el usuario:", error);
      });
  };

  const handleDelete = (userId) => {

    fetch(`${import.meta.env.VITE_FETCH_DELETE_USERS}/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {

        console.log("Usuario eliminado con éxito:", data);
      })
      .catch((error) => {
  
        console.error("Error al eliminar el usuario:", error);
      });
  };

  return (
<div className="w-full h-full pt-10">
  <div className="grid w-4/5 p-5 bg-white rounded-lg mx-auto">
    <div className="flex justify-center mb-5">
      <h1 className="text-xl font-semibold text-black">LISTA DE USUARIOS</h1>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Direccion</th>
            <th className="px-4 py-2">Telefono</th>
            <th className="px-4 py-2">Eliminar</th>
            <th className="px-4 py-2">Editar</th>
          </tr>
        </thead>
        <tbody>
          {data.users &&
            data.users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(user.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}
