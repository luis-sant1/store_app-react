import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import CardPokemons from "../CardPokemons/CardPokemons";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
import CardDetail from "../CardDetail/CardDetail";
import { useFetch } from "../customHooks/useFetch"
import { Loading } from "../extraComponents/Loading";
import { Error } from "../extraComponents/Error";
import { Pagination } from "../extraComponents/pagination";

export default function Home(props) {
    const funUp = props
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [dataDetail, setDataDetail] = useState({})
    const [products, setProducts] = useState([]);
    const [productPerPage, setProductPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)


    const { data, loading, error } = useFetch(`https://api.escuelajs.co/api/v1/products?offset=0&limit=9`);

    const openDetail = (e, data) => {
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
                    {error && <Error error={error} />}
                    {loading && <Loading />}
                    {data?.map((e) => (
                        <CardPokemons key={data.id} data={e} openDetail={openDetail} />
                    ))}
                    <Pagination />
                </div>
            </div>
        </div>
    )
}