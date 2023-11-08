
import React from "react";
import { useEffect, useState } from 'react';
import CardPokemons from "../CardPokemons/CardPokemons";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
import CardDetail from "../CardDetail/CardDetail";
import { useFetch } from "../customHooks/useFetch"
import { Loading } from "../extraComponents/Loading";
import { Error } from "../extraComponents/Error";
import { all } from "axios";
import App from "../../App";


export default function FavProducs(props) {
    console.log(props.content)
  const [isOpenAlert, openAlert, closeAlert] = useModal(false); // Estado de la venta ver deetalles
  const [dataDetail, setDataDetail] = useState({}) // Data de la ventana datails.
  const { data } = useFetch(import.meta.env.VITE_FETCH_ALL); // uso del custom hook useFetch para traer la data.
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
              {data?.map((e) => ( // Pasamos por cada uno de los productos, colocamos una key y traemos la data. 
                  <CardPokemons key={e._id} data={e} openDetail={openDetail} /> // 
              ))} 
          </div>

      </div>


      
  </div>
    )
}