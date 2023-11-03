import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useModal } from "../Modal/useModal";
import Modal from "../Modal/Modal";
import axios from "axios";
import { Select } from 'flowbite-react';

export default function Iniciarsesion() {
    const [error, setError] = useState("");
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeat: ""
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const validateForm = () => {
        if (
            data.email === "" ||
            data.password === "" 
            
        ) {
            setError("Todos los campos son obligatorios.");
            return false;
        } return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let body = new FormData();
            data.email !== "" && body.append('Correo electrónico', data.email);
            data.password !== "" && body.append('Contraseña', data.password);

            try {
                const url = import.meta.env.VITE_FETCH_CREATE;
                const { data: res } = await axios.post(url, body);
                openAlert();
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.messageError);
                }
            }
        }
    };

    return (
        <div className="flex justify-center m-10 w-98 ...">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <h2>SECIÓN INICIADA CORRECTAMENTE</h2>
            </Modal>
            <form className="flex flex-col min-w-[70%] p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
                <div className="flex justify-center m-2 ...">
                    <h1 className="text-xl font-semibold text-black ...">Inicia Sesión</h1>
                </div>


            <label htmlFor="" id="email" className="pl-1.5"><b>Correo Electronico</b></label>
            <input
                type="text"
                placeholder="Ejemplo@gmail.com"
                name="email"
                onChange={handleChange}
                value={data.email}   
                className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="email"
            />
            
            <label htmlFor="" id="password" className=" pl-1.5"><b>Contaseña</b></label>
            <input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                value={data.password}
                
                className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="password"
            />
                {/* Agrega campos similares para los otros campos del formulario (apellido, correo, contraseña, repetir contraseña) */}

                {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center'>{error}</div>}
                <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}