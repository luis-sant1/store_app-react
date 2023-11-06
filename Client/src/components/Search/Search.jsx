import  CardPokemons from "../CardPokemons/CardPokemons"
import { useEffect, useState } from 'react';
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
import CardDetail from "../CardDetail/CardDetail";
import App from "../../App";
import Home from "../Home/Home";

export function Search({ productos, props }) {
    
    
    const funUp = props
    

    // const handleDelete=async()=>{
    //     try {
    //       const {data:res}=await axios.delete(import.meta.env.VITE_FETCH_DELETE + props.dataDetail._id) // Hacemos delete obtenindo el id de las props.
    //       console.log(res)
    //       openAlert()
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    const [isOpenAlert, openAlert, closeAlert] = useModal(false);

    const [dataDetail, setDataDetail] = useState({}) // Data de la ventana datails.
    const openDetail = (e, data) => { // Ventana de ver detalles
        setDataDetail(data) // Setear la data a la ventana.
        openAlert()
    }
    return (
        <div>
            

            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <CardDetail dataDetail={dataDetail} funUp={funUp}/>
            </Modal>
            <div className="w-auto flex flex-wrap place-items-center mt-8 pb-4 mb-8">
                {productos?.map((e) => ( // Pasamos por cada uno de los productos, colocamos una key y traemos la data. 
                    <CardPokemons key={e._id} data={e} openDetail={openDetail}/> // 
                ))}
            </div>
        </div>
    )
}