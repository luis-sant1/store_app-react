import React, { useEffect, useState } from "react";
import { useFetch } from "../customHooks/useFetch";
import axios from 'axios'

export default function UsersLists({toPage, setPage, toPageUp}) {
  const { data } = useFetch(import.meta.env.VITE_FETCH_USERS);
  const del = import.meta.env.VITE_FETCH_DELETE_USERS;
  return (
<div className="w-full h-full pt-10">
  <div className="grid w-4/5 p-5 bg-white rounded-lg mx-auto min-w-[98%] md:min-w-[70%]">
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
                    {/* <td>{console.log(data.users)}</td> */}
                  <button onClick={async (e) => {
                    try {
                      e.preventDefault()
                      // window.location.href = "UpdateUsers";
                      const res = await axios.delete(del + user._id)
                      console.log(res) ;
                    } catch (error) {
                      console.log(error)
                    }
                  }} className="bg-red-200 hover:bg-red-600 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button onClick={toPageUp("UpdateUsers", user._id, data.users)} className="bg-green-100 hover:bg-blue-600 text-white px-2 py-1 rounded">
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
