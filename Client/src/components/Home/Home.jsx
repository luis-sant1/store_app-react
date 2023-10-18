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

    const funUp = props
    //ESTADOS
    const [isOpenAlert, openAlert, closeAlert] = useModal(false); // Estado de la venta ver deetalles
    const [dataDetail, setDataDetail] = useState({}) // Data de la ventana datails.
    const [products, setProducts] = useState([]); // Arreglo de productos. -Probablmente no lo use x
    const [productsPerPage, setProductsPerPage] = useState(6) // Productos que se muestran por página
    const [currentPage, setCurrentPage] = useState(1) // Página actual en la que nos encontramos.
    const [numberProducts, setNumberProducts] = useState('') // Número de productos


    const { data, loading, error } = useFetch(`https://api.escuelajs.co/api/v1/products?offset=0&limit=9`); // uso del custom hook useFetch para traer la data.
    const totalProducts = async (data) =>{ //Función asincrona que espera para calcular el total de productos.
        await data // Espera por data (Que es un array)
        const totalProducts = data.length // calcul el length
        return totalProducts // retorna
    }
   
    totalProducts(data).then((value)  => setNumberProducts(value) ).catch((error) => (error)) //seteamos el valro al estado (promesaa)
    
     
    const openDetail = (e, data) => { // Ventana d ever detalles
        setDataDetail(data)
        openAlert()
    }
    



    return (
        <div className="Po">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <CardDetail dataDetail={dataDetail} funUp={funUp} />
            </Modal>
            <div className="items-center justify-center text-center mt-4 text-white">
                <span className="text-3xl font-bold pt-4 text-white"><h1>POKEMONES</h1></span>
            </div>
            <div className="flex p-8 justify-center">+
                <div className="w-auto flex flex-wrap lg:gap-14 place-items-center m-8 pb-4 mb-8">
                    {error && <Error error={error} />} {/*Para mostrar el error.*/}
                    {loading && <Loading />} {/* Estado de la carga del req. */}
                    {data?.map((e) => ( // Pasamos por cada uno de los productos, colocamos una key y traemos la data. 
                        <CardPokemons key={data.id} data={e} openDetail={openDetail} />
                    ))}
                    <Pagination productsPerPage = {productsPerPage} currentPage = {currentPage} setCurrentPage = {setCurrentPage} numberProducts={numberProducts} />
                </div>
            </div>
        </div>
    )
}