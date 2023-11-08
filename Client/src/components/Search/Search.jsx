import CardPokemons from "../CardPokemons/CardPokemons"
import Modal from "../Modal/Modal"
import { useState } from 'react'
import CardDetail from "../CardDetail/CardDetail"
import { useModal } from "../Modal/useModal"

export function Search(props) {
    const [isOpenAlert, openAlert, closeAlert] = useModal(false); // Estado de la venta ver deetalles
    const [dataDetail, setDataDetail] = useState({}) // Data de la ventana datails.
    const funUp = props
    const openDetail = (e, data) => { // Ventana de ver detalles
        setDataDetail(data) // Setear la data a la ventana.c
        openAlert()
    }
    return (

        <div className="Po ">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}> {/* VENTANA EMERGENTE */}
                <CardDetail dataDetail={dataDetail} funUp={funUp} /> {/* dataDetail, contenido del reques, funUp, función heredada. */}
            </Modal>
            <div className="items-center justify-center text-center mt-4 text-white">
                <span className="text-3xl font-bold pt-4 text-white"><h1>Total Market</h1></span>
            </div>
            <div className="flex p-8 justify-center">
                <div className="w-auto flex flex-wrap place-items-center m-8 pb-4 mb-8">
                    {props.productos?.map((e) => ( // Pasamos por cada uno de los productos, colocamos una key y traemos la data. 
                        <CardPokemons key={e._id} data={e} openDetail={openDetail} /> // 
                    ))} 
                </div>

            </div>


            
        </div>
    )
}
