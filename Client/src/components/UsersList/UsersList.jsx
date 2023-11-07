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
                <div className="table-responsive">
       <table className="table table-sm table-bordered">
         <thead>
           <tr>
             <th>ID</th>
             <th>Nombre</th>
             <th>Correo</th>
             <th>Direccion</th>
             <th>Telefono</th>
             <th>Eliminar</th>
             <th>Editar</th>
           </tr>
         </thead>

         <tbody>
           {data.users && 
           data.users.map((users)=>(
             <tr key={users.id}>
               <td>{users._id}</td>
               <td>{users.name}</td>
               <td>{users.email}</td>
               <td>{users.address}</td>
               <td>{users.phone}</td>

             </tr>
           ))},{console.log(data.users)}
         </tbody>

       </table>

     </div>
           
            </div>
        </div>
    );
}
