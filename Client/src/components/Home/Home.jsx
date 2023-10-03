import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import CardPokemons from "../CardPokemons/CardPokemons";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
import CardDetail from "../CardDetail/CardDetail";

export default function Home(props){
    const funUp=props
    console.log(funUp)
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [dataDetail,setDataDetail]=useState({})
    const [dataPokemons, setdataPokemons] = useState([]);
    const Potions = async()=>{
        try {
            const response  = await axios(`http://localhost:3000/pokemons`)
            const dataPokemons = Object.values(response.data);
            setdataPokemons(dataPokemons);
            console.log(dataPokemons);
    
        } catch (e){
            console.log(e);
        }
    }
    useEffect(() => {
        Potions();
    }, []);
    const openDetail=(e, data)=>{
        setDataDetail(data)
        openAlert()
    }
    console.log(dataDetail)
    return(
        <div className="Po">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                        <CardDetail dataDetail={dataDetail} funUp={funUp}/>
            </Modal>
            <div className="items-center justify-center text-center mt-4 text-white">
                    <span className="text-3xl font-bold pt-4 text-white"><h1>POKEMONES</h1></span>
            </div>
                <div className="flex p-8 justify-center">
                    <div className="w-auto flex flex-wrap lg:gap-14 place-items-center m-8 pb-4 mb-8">
                            {dataPokemons.map((e)=>(
                                <CardPokemons dataPokemons={e} openDetail={openDetail}/>
                            ))}
                    </div>
                </div>
        </div>
    )
}