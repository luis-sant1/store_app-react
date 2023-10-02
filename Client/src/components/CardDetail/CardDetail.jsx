import React from "react";
import axios from "axios";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
export default function CardDetail(props){
    console.log(props)
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const funUpDate=props.funUp.toPageUp
    console.log(funUpDate)

    const handleDelete=async()=>{
        try {
          const {data:res}=await axios.post(`http://localhost:3000/delete-pokemons/${props.dataDetail._id}`)
          console.log(res)
          window.location.reload()
          openAlert()
        } catch (error) {
          console.log(error)
        }
      }
    return(
        <div className="h-98" >
                <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                    <h2>POKEMON ELIMINADO CORRECTAMENTE</h2>
                </Modal>    
            {props.dataDetail.imagen?
            <div className="inf">
                <div className="max-w-98 max-h-98 bg-secondary flex flex-col items-center justify-center m-8">
                    <div>
                        <img src={props.dataDetail.imagen.secure_url} alt="img_not_fund" className="h-40"/>
                    </div>
                    <div className='p-4'>
                        <span className="flex text-lg font-semibold text-center">{props.dataDetail.nombre}</span>
                    </div>
                    <div className="des pb-3">
                        <span>Descripcion: {props.dataDetail.descripcion}</span>
                    </div>
                    <div className='w-full h-full grid grid-cols-3 gap-42 items-center justify-center rounded-b-lg'>
                            <span>Habilidad: {props.dataDetail.habilidad}</span>
                            <span>Generación: {props.dataDetail.generacion}</span>
                            <span>Categoria: {props.dataDetail.categoria[0]}</span>
                    </div>
                    <div className='grid grid-cols-2 m-4 gap-20'>
                        <button className='w-full rounded-lg shadow-lg bg-red-400 m-2 p-1 text-sm font-medium' onClick={(e)=>handleDelete()} >Eliminar</button>
                        <button className='w-full rounded-lg shadow-lg bg-green-400 m-2 p-1 text-sm font-medium' onClick={funUpDate("update",props.dataDetail._id)}>Actualizar</button>
                    </div>
                </div>
            </div>:
            <div className="">
                <h1>No hay</h1>
            </div>
        }
    </div>
    )
}