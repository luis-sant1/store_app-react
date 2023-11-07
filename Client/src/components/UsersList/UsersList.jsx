import React, { useEffect, useState } from "react";
import DataUsers from "../DataUsers/DataUsers";
import { useFetch } from "../customHooks/useFetch";
import UpdateUsers from '../UpdateUsers/UpdateUsers.jsx'

export default function UsersLists() {
  const { data, loading, error, total } = useFetch(import.meta.env.VITE_FETCH_USERS);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);


  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

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
            <th className="px-4 py-2">Apellido</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Eliminar</th>
            <th className="px-4 py-2">Editar</th>
          </tr>
        </thead>
        <tbody>
          {data.users &&
            data.users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                    <td>{console.log(data.users)}</td>
                  <button onClick={() => seEditing(true)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                    Editar
                  </button>
                  {isEditing && <UpdateUsers />}
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
