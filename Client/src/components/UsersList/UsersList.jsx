import React, { useEffect, useState } from "react";
import DataUsers from "../DataUsers/DataUsers";
import { useFetch } from "../customHooks/useFetch";

export default function UsersLists() {
    const { data, loading, error, total } = useFetch(import.meta.env.VITE_FETCH_USERS);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;

    return (
        <div className="w-full h-full pt-10">
            <div className="grid w-4/5 h-auto p-5 bg-white rounded-lg mr-auto ml-auto">
                <div className="flex justify-center m-2 pb-5 ...">
                    <h1 className="text-xl font-semibold text-black ...">LISTA DE USUARIOS</h1>
                </div>
                <div className="grid grid-cols-5 pb-6 justify-items-center">
                    <span>Nombre</span>
                    <span>Apellido</span>
                    <span>Email</span>
                    <span>Eliminar</span>
                    <span>Editar</span>
                </div>
                <div>
                    {data.user?.map((user) => (
                        <DataUsers key={data.name} data={data.user} />
                    )).slice(firstIndex, lastIndex)}
                    {console.log(data.user)}

                </div>
            </div>
        </div>
    );
}