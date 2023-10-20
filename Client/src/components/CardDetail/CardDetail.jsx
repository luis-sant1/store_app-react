import React from "react";
import axios from "axios";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
export default function CardDetail(props){
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const funUpDate=props.funUp.toPageUp // Función que retorna setea los datos, id y la página (update para el caso.)

    const handleDelete=async()=>{
        try {
          const {data:res}=await axios.delete(`http://localhost:3000/deleteProduct/${props.dataDetail._id}`) // Hacemos delete obtenindo el id de las props.
          console.log(res)
          openAlert()
        } catch (error) {
          console.log(error)
        }
      }
    return(
        <div className="h-98" >
                <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                    <h2>PRODUCTO ELIMINADO CORRECTAMENTE</h2>
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
                    <div className='details w-full grid grid-cols-3  items-center justify-center text-center'>
                            <span className="sm:mr-2">Precio: {props.dataDetail.precio}$</span>
                            <span className="ml-auto mr-auto">Disponible:{props.dataDetail.unidades}</span>
                            <span className="sm:ml-5 pl-5">Categoria: {props.dataDetail.categoria[0].split('_').join(" ")}</span> {/* ARREGLADO MAL RENDERIZADO DE LAS CATEGORIAS CON ESPACIO*/}
                    </div>
                    <div className='grid grid-cols-2 m-4 gap-20'>
                        <button className='w-full rounded-lg shadow-lg bg-red-200 m-2 p-1 text-sm font-medium' onClick={(e)=>handleDelete()}>Eliminar</button>
                        <button className='w-full rounded-lg shadow-lg bg-violet-100 m-2 p-1 text-sm font-medium' onClick={funUpDate("update",props.dataDetail._id, props.dataDetail )} >Actualizar</button>
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