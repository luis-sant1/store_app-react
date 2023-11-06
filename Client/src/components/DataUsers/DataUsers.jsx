import React from "react";
import { useState, useEffect } from 'react'
import UpdateUsers from '../UpdateUsers/UpdateUsers'
import UsersLists from '../UsersList/UsersList'

export default function DataUsers(props){

    const [page,setPage]=useState('')

    const getContent=()=>{ // Condicional que setea el estado "page" para que se renderice. 
    if (page==='home') {
      return <Home/>
    }else if(page=== 'UpdateUsers'){
      return <UpdateUsers/>
    }else if(page=== 'UsersList'){
      return <UsersLists/>
    }
  }

      const toPage = page=>e=>{ // Función que cambia de vista. 
        e.preventDefault()
        window.history.pushState(null,"Create",`/${page}`)
        setPage(page)
      }

    const handleDelete=async()=>{
        try {
          const {data:res}=await axios.delete(import.meta.env.VITE_FETCH_DELETE + props.dataDetail._id) // Hacemos delete obtenindo el id de las props.
          console.log(res)
          openAlert()
        } catch (error) {
          console.log(error)
        }
      }
    return(
        <div className="grid grid-cols-5 justify-items-center">
            <span>Nombre: {props.data.name}</span>
            <span>Apellido: {props.data.lastName}</span>
            <span>Email: {props.data.email}</span>
            <button className='w-16 rounded-lg shadow-lg bg-red-200 m-2 p-1 text-sm font-medium' onClick={(e)=>handleDelete()}>Eliminar</button>
            <button className='w-16 rounded-lg shadow-lg bg-green-200 m-2 p-1 text-sm font-medium' onClick={toPage("UpdateUsers")}>Editar</button>

            {getContent()}
        </div>
    )
}