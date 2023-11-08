import React, { useState, useEffect } from "react";
import { useModal } from "../Modal/useModal";
import Modal from "../Modal/Modal";
import { useForm } from 'react-hook-form'
import { AuthContext, useAuth } from "../Context/AuthContext";

export default function Iniciarsesion({toPage, setPage}) {
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const { signin, error, isAuthenticated } = useAuth()
    const { register, handleSubmit, formState: {
        errors                                                  // Errores del formState
    } } = useForm();
    const onSubmit = handleSubmit(
        (user) => {
            signin(user)
        }
    )
    const handleRedirection = () => {
        setPage("Registrate")
        toPage()
    }
    useEffect(() => {
        if (isAuthenticated) {
            setPage("home")
            toPage()
        }                                                            // Redireccionamos al usuario si isAuthenticated = true

    }, [isAuthenticated])
    
    return (
        <div className="flex justify-center m-10 w-98 ...">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <h2>SESIÓN INICIADA CORRECTAMENTE</h2>
            </Modal>
            <form className="flex flex-col p-2 bg-white rounded-lg min-w-[100%] md:min-w-[70%] ..." onSubmit={
                onSubmit
            }>
                <div className="flex justify-center m-2 ...">
                    <h1 className="text-xl font-semibold text-black ...">Inicia Sesión</h1>
                </div>

                <label htmlFor="" id="email" className="pl-1.5"><b>Correo Electronico</b></label>
                <input
                    type="text"
                    {...register('email', { required: true, minLength: 4, maxLength: 90, pattern: /^\S+@\S+\.\S+$/ })}
                    className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="email"
                />
                {
                    errors.email && (
                        <p className="text-sm pb-3 pl-1.5 w-72 ...">
                            Correo inválido.
                        </p>
                    )
                }

                <label htmlFor="" id="password" className=" pl-1.5"><b>Contraseña</b></label>
                <input
                    type="password"
                    {...register('password', { required: true, minLength: 4, maxLength: 90, pattern: /^.{6,24}$/ })}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="password"
                />
                {
                    errors.password && (
                        <p className="text-sm pb-3 pl-1.5 w-72 ...">
                            Contraseña demasiado corta.
                        </p>
                    )
                }

                {
                    error != undefined ? error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center' >{error}</div> : <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center' >Datos invalidos</div>

                }
            

                <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                    Iniciar Sesión
                </button>
                <p>
                    ¿No tienes una cuenta? <a className="text-blue-500" onClick={handleRedirection}>Regístrate.</a>
                </p>
            </form>
        </div>
    );
}

// function ValidateEmail(email) {
//     // Validar que el correo electrónico tenga el formato correcto
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     return emailRegex.test(email);
//   }

//   function ValidatePassword(password) {
//     // Validar que la contraseña tenga el formato correcto
//     const passwordRegex = /^.{6,24}$/;
//     return passwordRegex.test(password);
//   }
