import React from "react";
import DataUsers from "../DataUsers/DataUsers";
import { useEffect, useState } from 'react';
import { useFetch } from "../customHooks/useFetch"

export default function UsersLists(){

    const { data, loading, error, total } = useFetch(import.meta.env.VITE_FETCH_ALL); // uso del custom hook useFetch para traer la data.
    const [productsPerPage, setProductsPerPage] = useState(10) // Productos que se muestran por página
    const [currentPage, setCurrentPage] = useState(1) // Página actual en la que nos encontramos.

    const lastIndex = currentPage * productsPerPage; // Calculo de los indeces para retornar la data
    const firtsIndex = lastIndex - productsPerPage;


    return(

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
                {data?.map((e) => ( // Pasamos por cada uno de los productos, colocamos una key y traemos la data. 
                     <DataUsers key={e._id} data={e} /> // Arreglado errox "Every child has to be a unique key."
                )).slice(firtsIndex, lastIndex)}
            </div>
            
                    
        </div>
        </div>
    )
}