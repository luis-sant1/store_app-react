import React from "react";
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiFillStar } from "react-icons/ai" ;   
import { SlBan } from "react-icons/sl";
// import FavProducs from '../FavProducs/FavProducs'



export default function CardPokemons(props) {

    // todas las constantes y funciones de este componente son del botn de favoritos

    // Crear un nuevo estado en tu componente principal (donde se renderiza CardPokemons) para almacenar las tarjetas favoritas. Inicializa este estado como un array vacío. (es es de esta primera constante)
    const [favoritos, setFavoritos] = useState([]);
  const esFavorito = favoritos.includes(props.data.id);

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter((id) => id !== props.data.id));
    } else {
      setFavoritos([...favoritos, props.data.id]);
    }
  };

  return (
    <div className="flex mr-auto ml-auto">
      <button
        className="flex justify-center items-center text-center content-center mb-6 mr-6 ml-6 sm:ml-auto sm:mr-auto md:mr-auto md:ml-auto"
        onClick={(e) => props.openDetail(e, props.data)}
      >
        <div className="Card bg-zinc-50  cursor-pointer h-96 mb-6  sm:ml-auto sm:mr-auto md:mr-auto md:ml-auto">
          <div className="max-w-98 max-h-98 bg-secondary flex flex-col items-center justify-center m-8">
            <div>
              <img src={props.data.imagen.secure_url} alt="img_not_fund" className="h-40" />
            </div>
            <div className="p-4">
              <span className="flex text-lg font-semibold text-center">{props.data.nombre}</span>
            </div>
            <div className="w-full h-full flex items-center justify-center rounded-b-lg">
              <div className="flex flex-col w-1/2 gap-2">
                <span>Precio: {props.data.precio}$</span>
                <span>Unidades: {props.data.unidades}</span>
              </div>
              
            </div>
            {/* este el esl boton de favoritos */}
            <div className="pt-4"> 
            <button onClick={toggleFavorito} className=" w-auto h-auto">
                {esFavorito ? < SlBan /> : < AiFillStar />}
              </button>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}