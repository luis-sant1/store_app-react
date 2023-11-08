import React from "react";
import { useEffect, useState } from 'react';
import CardPokemons from "../CardPokemons/CardPokemons";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
import CardDetail from "../CardDetail/CardDetail";
import { useFetch } from "../customHooks/useFetch"
import { Loading } from "../extraComponents/Loading";
import { Error } from "../extraComponents/Error";
import { Pagination } from "../extraComponents/Pagination";

export default function Home(props) {
    const funUp = props // TRAE FUNCiÓN
    
    //ESTADOS
    const [isOpenAlert, openAlert, closeAlert] = useModal(false); // Estado de la venta ver deetalles
    const [dataDetail, setDataDetail] = useState({}) // Data de la ventana datails.
    const [products, setProducts] = useState([]); // Arreglo de productos. -Probablmente no lo use x
    const [productsPerPage, setProductsPerPage] = useState(8) // Productos que se muestran por página
    const [currentPage, setCurrentPage] = useState(1) // Página actual en la que nos encontramos.


    const { data, loading, error, total } = useFetch(import.meta.env.VITE_FETCH_ALL); // uso del custom hook useFetch para traer la data.
    const openDetail = (e, data) => { // Ventana de ver detalles
        setDataDetail(data) // Setear la data a la ventana.
        openAlert()
    }

    const lastIndex = currentPage * productsPerPage; // Calculo de los indeces para retornar la data
    const firtsIndex = lastIndex - productsPerPage;

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
                    {error && <Error error={error} />} {/*Para mostrar el error.*/}
                    {loading && <Loading />} {/* Estado de la carga del req. */}
                    {data?.map((e) => ( // Pasamos por cada uno de los productos, colocamos una key y traemos la data. 
                        <CardPokemons key={e._id} data={e} openDetail={openDetail} /> // Arreglado errox "Every child has to be a unique key."
                    )).slice(firtsIndex, lastIndex)}
                </div>
            
            </div>

            
            <section className="pb-4 flex justify-center">
                <Pagination productsPerPage={productsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} total={total}/>
            </section>
        </div>
    )
}