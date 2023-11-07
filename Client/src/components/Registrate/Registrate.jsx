import React, { useState, useEffect } from "react";
import { useModal } from "../Modal/useModal";
import Modal from "../Modal/Modal";
import { useForm } from 'react-hook-form'
import { useAuth } from "../Context/AuthContext";

export default function Registrate({ toPage, setPage, page }) {
    const [localError, setLocalError] = useState("")
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [repeat, setRepeat] = useState(
        ""
    )
    const { register, handleSubmit, formState: {
        errors                                              // EXtrayendo errores del formulario
    } } = useForm();
    const { signup, isAuthenticated, error } = useAuth();    // TRAEME signup del context.

    useEffect(() => {
        if (isAuthenticated) {
            setPage("home")
            toPage()
        }                                                            // Redireccionamos al usuario si isAuthenticated = true

    }, [isAuthenticated])
    
    const onSubmit = handleSubmit( 
        (user) => {
        user.password == repeat ? signup(user) && setLocalError(""):            // EJECUTA signUp desde los values de los inputs.
        setLocalError("Contraseñas no coinciden")
    })

    const handleRedirection = () => {
        setPage("Iniciar")
        toPage()
    }
    return (
        <div className="flex justify-center m-10 w-98 ...">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <h2>PERFIL CREADO CORRECTAMENTE</h2>
            </Modal>
            <form className="flex flex-col min-w-[70%] p-2 bg-white rounded-lg ..." onSubmit={onSubmit}>
                <div className="flex justify-center m-2 ...">
                    <h1 className="text-xl font-semibold text-black ...">CREA TU PERFIL</h1>
                </div>

                <label htmlFor="name" className="pt-2 pl-1.5"><b>Nombre</b></label>
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register('name', { required: true, minLength: 4, maxLength: 90, pattern: /^[a-zA-ZÀ-ÿ\s]{4,90}$/ })}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />
                {
                    errors.name && (
                        <p className="text-red-500 text-xs">
                            Nombre requerido. Mínimo 4 caracteres.
                        </p>
                    )
                }

                <label htmlFor="lastName" className="pl-1.5"><b>Apellido</b></label>
                <input
                    type="text"
                    placeholder="Apellido"
                    {...register('lastName', { required: true, minLength: 4, maxLength: 90, pattern: /^[a-zA-ZÀ-ÿ\s]{4,90}$/ })}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />
                {
                    errors.lastName && (
                        <p className="text-red-500 text-xs">
                            Apellido requerido. Mínimo 4 caracteres.
                        </p>
                    )
                }

                <label htmlFor="email" className="pl-1.5"><b>Correo Electrónico</b></label>
                <input
                    type="text"
                    placeholder="ejemplo@gmail.com"
                    {...register('email', { required: true, minLength: 4, maxLength: 90, pattern: /^\S+@\S+\.\S+$/ })}
                    className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />
                {
                    errors.email && (
                        <p className="text-red-500 text-xs">
                            Correo inválido.
                        </p>
                    )
                }

                <label htmlFor="password" className="pl-1.5"><b>Contraseña</b></label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register('password', { required: true, minLength: 4, maxLength: 90, pattern: /^.{6,24}$/ })}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />
                {
                    errors.password && (
                        <p className="text-red-500 text-xs">
                            Contraseña demasiado corta.
                        </p>
                    )
                }
                <label htmlFor="repeat" className="pl-1.5"><b>Repetir contraseña</b></label>
                <input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeat"
                    value={repeat}
                    onChange={e => setRepeat(e.target.value)}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />
                {
                    localError && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center' >{localError}</div>
                }
                {
                    error != undefined ? error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center' >{error}</div> : <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center' >Datos invalidos</div>
                }
                <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                    Crear Perfil
                </button>
                <p>
                    ¿Ya tienes una cuenta? <a className="text-blue-500" onClick={handleRedirection}>Inicia sesión.</a>
                </p>
            </form>
        </div>
    );
}