import React, { useState, useEffect } from "react";
import { useModal } from "../Modal/useModal";
import Modal from "../Modal/Modal";
import { useForm } from 'react-hook-form'
import { useAuth } from "../Context/AuthContext";
import axios from 'axios'

export default function Registrate({page, setPage, idU, data}) {
    console.log(idU)
    const [error, setError] = useState("");    
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [repeat, setRepeat] = useState(
        ""
    )
        const editar = import.meta.env.VITE_FETCH_EDIT_USERS
    

    const { register, handleSubmit, formState: {
        errors                                          // Extrayendo errores del formulario
    } } = useForm();

    return (
        <div className="flex justify-center m-10 w-98 ...">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <h2>PERFIL ACTUALIZADO CORRECTAMENTE</h2>
            </Modal>
            <form className="flex flex-col p-2 bg-white rounded-lg min-w-[100%] md:min-w-[70%] ..." onSubmit={handleSubmit(async (values) => {
               try{
                const res = await axios.put(editar + idU, values);
                console.log( res )
               }catch(error){
                console.log(error)
               }
            })}>
                <div className="flex justify-center m-2 ...">
                    <h1 className="text-xl font-semibold text-black ...">ACTUALIZA TU PERFIL</h1>
                </div>

                <label htmlFor="name" className="pt-2 pl-1.5"><b>Nombre</b></label>
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register('name', { required: true, minLength: 4, maxLength: 90, pattern: /^[a-zA-ZÀ-ÿ\s]{4,90}$/ })}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />
                {
                    errors.name && <p>
                        Nombre requerido. Minimo 4 caracteres.
                    </p>
                }

                <label htmlFor="lastName" className="pl-1.5"><b>Apellido</b></label>
                <input
                    type="text"
                    placeholder="Apellido"
                    {...register('lastName', { required: true, minLength: 4, maxLength: 90, pattern: /^[a-zA-ZÀ-ÿ\s]{4,90}$/ })}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />

                <label htmlFor="email" className="pl-1.5"><b>Correo Electrónico</b></label>
                <input
                    type="text"
                    placeholder="Ejemplo@gmail.com"
                    {...register('email', { required: true, minLength: 4, maxLength: 90, pattern:  /^\S+@\S+\.\S+$/ })}
                    className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />

                <label htmlFor="password" className="pl-1.5"><b>Contraseña</b></label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register('password', { required: true, minLength: 4, maxLength: 90, pattern: /^.{6,24}$/ })}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />

                <label htmlFor="repeat" className="pl-1.5"><b>Repetir contraseña</b></label>
                <input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeat"
                    value={repeat}
                    onChange={e => setRepeat(e.target.value)}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />

                {/* aqui cree edl del nuemro de telefono y de direccion, comente l parte donde esta enviando los datos, kuis tu eres que qeu sabe a donde mandarlos, y tampoco se como colocarlos opcional */}

                <label htmlFor="number" className="pl-1.5"><b>Numero de Telefono (opcional)</b></label>
                <input
                    type="text"
                    placeholder="Numero de telefono"
                    {...register('email', { required: false, minLength: 4, maxLength: 90, pattern:  /^\S+@\S+\.\S+$/ })}
                    className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />

                <label htmlFor="number" className="pl-1.5"><b>Dirección (opcional)</b></label>
                <input
                    type="text"
                    placeholder="Dirección"
                    {...register('email', { required: false, minLength: 4, maxLength: 90, pattern:  /^\S+@\S+\.\S+$/ })}
                    className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                />

                {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center'>{error}</div>}
                <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                    Editar Usuario
                </button>
            </form>
        </div>
    );
}