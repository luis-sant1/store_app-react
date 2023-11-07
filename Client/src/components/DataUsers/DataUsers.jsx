import React from "react";
import { useState, useEffect } from 'react'
import UpdateUsers from '../UpdateUsers/UpdateUsers'
import UsersLists from '../UsersList/UsersList'

export default function DataUsers({props}){

    
    const handleDelete=async()=>{
        try {
          const {data:res}=await axios.delete(import.meta.env.VITE_FETCH_DELETE + props.dataDetail._id) // Hacemos delete obtenindo el id de las props.
          console.log(res)
          openAlert()
        } catch (error) {
          console.log(error)
        }
      }

    //   setPage("UpdateUsers")
    return(
        <div className="grid grid-cols-5 justify-items-center">
            <span>Nombre:</span>
            <span>Apellido:</span>
            <span>Email:</span>
            <button className='w-16 rounded-lg shadow-lg bg-red-200 m-2 p-1 text-sm font-medium' onClick={(e)=>handleDelete()}>Eliminar</button>
            <button className='w-16 rounded-lg shadow-lg bg-green-200 m-2 p-1 text-sm font-medium' >Editar</button>

            
        </div>
    )
}