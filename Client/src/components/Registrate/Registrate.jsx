// Componente de registrar ususrio

import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useModal } from "../Modal/useModal";
import Modal from "../Modal/Modal";
import axios from "axios";
import { Select } from 'flowbite-react';

export default function Registrate() {
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
        setData({ ...data, [input.fisrtname]: input.value });
    };

    // Validacion  de los formularios

    const validateForm = () => {
        if (
            data.firstname === "" ||
            data.lastname === "" ||
            data.email === "" ||
            data.password === "" ||
            data.repeat === ""
        ) {
            setError("Todos los campos son obligatorios.");
            return false;
        } else if (data.password !== data.repeat) {
            setError("Las contraseñas no coinciden.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let body = new FormData();
            data.firstname !== "" && body.append('Nombre', data.firstname);
            data.lastname !== "" && body.append('Apellido', data.lastname);
            data.email !== "" && body.append('Correo electrónico', data.email);
            data.password !== "" && body.append('Contraseña', data.password);
            data.repeat !== "" && body.append('Repetir contraseña', data.repeat);

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



    function ValidateEmail(email) {
      // Validar que el correo electrónico tenga el formato correcto
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    }
    
    function ValidateName(firstname) {
        // Validar que el Nombre tenga el formato correcto
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{4,90}$/;
        return nameRegex.test(firstname);
      }
    
    function ValidateLastname(lastname) {
        // Validar que el Apellido tenga el formato correcto
        const lastNameRegex = /^[a-zA-ZÀ-ÿ\s]{4,90}$/;
        return lastNameRegex.test(lastname);
      }
    
    function ValidatePassword(password) {
        // Validar que la contraseña tenga el formato correcto
        const passwordRegex = /^.{6,24}$/;
        return passwordRegex.test(password);
      }

    return (
        <div className="flex justify-center m-10 w-98 ...">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <h2>PERFIL CREADO CORRECTAMENTE</h2>
            </Modal>
            <form className="flex flex-col p-2 bg-white rounded-lg  min-w-[100%] md:min-w-[70%] ..." onSubmit={handleSubmit}>
                <div className="flex justify-center m-2 ...">
                    <h1 className="text-xl font-semibold text-black ...">CREA TU PERFIL</h1>
                </div>

                <label htmlFor="firstname" className="pt-2 pl-1.5"><b>Nombre</b></label>
                <input
                    type="text"
                    placeholder="Nombre"
                    name="firstname"
                    value={data.firstname}
                    onChange={handleChange}
                    onSubmit={ValidateName}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="firstname"
                />

            <label htmlFor="" id="lastname" className=" pl-1.5"><b>Apellido</b></label>
            <input
                type="text"
                placeholder="Nombre"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                onSubmit={ValidateLastname}
                className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="lastname"
            />

            <label htmlFor="" id="email" className="pl-1.5"><b>Correo Electronico</b></label>
            <input
                type="text"
                placeholder="Ejemplo@gmail.com"
                name="email"
                onChange={handleChange}
                value={data.email}   
                onSubmit={ValidateEmail}
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
                onSubmit={ValidatePassword}
                
                className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="password"
            />
            <label htmlFor="" id="repeat" className="pl-1.5"><b>Repetir contraseña</b></label>
            <input
                type="password"
                placeholder="Repetir contraseña"
                name="repeat"
                
                className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="repeat"
            />
                {/* Agrega campos similares para los otros campos del formulario (apellido, correo, contraseña, repetir contraseña) */}

                {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center'>{error}</div>}
                <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                    Crear Perfil
                </button>
            </form>
        </div>
    );
}
