// // Componente de registrar ususrio

// import React, { useState } from "react";
// import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
// import { useModal } from "../Modal/useModal";
// import Modal from "../Modal/Modal";
// import axios from "axios";
// import { Select } from 'flowbite-react';

// export default function Registrate() {
//     const [error, setError] = useState("");
//     const [isOpenAlert, openAlert, closeAlert] = useModal(false);
//     const [data, setData] = useState({
//         name: "",
//         lastName: "",
//         email: "",
//         password: "",
//         repeat: ""
//     });

//     const handleChange = ({ currentTarget: input }) => {
//         setData({ ...data, [input.name]: input.value }); /// Aquí habías puesto input.firtsname y es input.name (name es un atributo de input.)
//     };

//     // Validacion  de los formularios

//     const validateForm = () => {
//         if (
//             data.name === "" ||
//             data.lastName === "" ||
//             data.email === "" ||
//             data.password === "" ||
//             data.repeat === ""
//         ) {
//             setError("Todos los campos son obligatorios.");
//             return false;
//         } else if (!ValidateName(name)) {
//             setError("Por favor, ingrese un nombre valido (Solo letras de 4 a 90 digítos)")
//             return false;
//         }else if (!ValidateLastname(lastName)) {
//             setError("Por favor, ingrese un apellido valido (Solo letras de 4 a 90 digítos)")
//             return false;
//         }else if (!ValidateEmail(email)) {
//             setError("Por favor, ingrese un correo electrónico válido")
//             return false;
//         }else if (!ValidatePassword(password)) {
//             setError("Por favor, ingrese una contraseña valida (de 6 a 24 dígitos)")
//             return false;
//         } else if (data.password !== data.repeat) {
//             setError("Las contraseñas no coinciden.");
//             return false;
//         }
//         return true;
//     };


    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             let body = new FormData();
//             data.name !== "" && body.append('Nombre', data.name);
//             data.lastName !== "" && body.append('Apellido', data.lastName);
//             data.email !== "" && body.append('Correo electrónico', data.email);
//             data.password !== "" && body.append('Contraseña', data.password);
//             data.repeat !== "" && body.append('Repetir contraseña', data.repeat);

//             try {
//                 const url = import.meta.env.VITE_FETCH_REGISTER;
//                 const { data: res } = await axios.post(url, body);
//                 openAlert();
//             } catch (error) {
//                 if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                     setError(error.response.data.messageError);
//                 }
//             }
//         }
//     };



//     function ValidateEmail(email) {
//       // Validar que el correo electrónico tenga el formato correcto
//       const emailRegex = /^\S+@\S+\.\S+$/;
//       return emailRegex.test(email);
//     }
    
//     function ValidateName(name) {
//         // Validar que el Nombre tenga el formato correcto
//         const nameRegex = /^[a-zA-ZÀ-ÿ\s]{4,90}$/;
//         return nameRegex.test(name);
//       }
    
//     function ValidateLastname(lastName) {
//         // Validar que el Apellido tenga el formato correcto
//         const lastNameRegex = /^[a-zA-ZÀ-ÿ\s]{4,90}$/;
//         return lastNameRegex.test(lastName);
//       }
    
//     function ValidatePassword(password) {
//         // Validar que la contraseña tenga el formato correcto
//         const passwordRegex = /^.{6,24}$/;
//         return passwordRegex.test(password);
//       }

//     return (
//         <div className="flex justify-center m-10 w-98 ...">
//             <Modal isOpen={isOpenAlert} onClose={closeAlert}>
//                 <h2>PERFIL CREADO CORRECTAMENTE</h2>
//             </Modal>
//             <form className="flex flex-col min-w-[70%] p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
//                 <div className="flex justify-center m-2 ...">
//                     <h1 className="text-xl font-semibold text-black ...">CREA TU PERFIL</h1>
//                 </div>

//                 <label htmlFor="name" className="pt-2 pl-1.5"><b>Nombre</b></label>
//                 <input
//                     type="text"
//                     placeholder="Nombre"
//                     name="name" // esto de acá es name
//                     value={data.firstname}
//                     onChange={handleChange}
                    
//                     className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
//                     id="name"
//                 />

//             <label htmlFor="" id="lastName" className=" pl-1.5"><b>Apellido</b></label>
//             <input
//                 type="text"
//                 placeholder="Nombre"
//                 name="lastName"
//                 onChange={handleChange}
//                 value={data.lastName}
                
//                 className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
//                 id="lastName"
//             />

//             <label htmlFor="" id="email" className="pl-1.5"><b>Correo Electronico</b></label>
//             <input
//                 type="text"
//                 placeholder="Ejemplo@gmail.com"
//                 name="email"
//                 onChange={handleChange}
//                 value={data.email}   
                
//                 className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
//                 id="email"
//             />
            
//             <label htmlFor="" id="password" className=" pl-1.5"><b>Contaseña</b></label>
//             <input
//                 type="password"
//                 placeholder="Contraseña"
//                 name="password"
//                 onChange={handleChange}
//                 value={data.password}
                
                
//                 className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
//                 id="password"
//             />
//             <label htmlFor="" id="repeat" className="pl-1.5"><b>Repetir contraseña</b></label>
//             <input
//                 type="password"
//                 placeholder="Repetir contraseña"
//                 name="repeat"
                
//                 className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
//                 id="repeat"
//             />
               

//                 {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center'>{error}</div>}
//                 <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
//                     Crear Perfil
//                 </button>
//             </form>
//         </div>
//     );
// }






import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useModal } from "../Modal/useModal";
import Modal from "../Modal/Modal";
import axios from "axios";
import { Select } from 'flowbite-react';

export default function Registrate() {

    // estas constante y la primera funcion handlechage son literalmente las mismas que las de create poquemo, solo que adaptada a los datos del registro
    const [error, setError] = useState("");
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [data, setData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeat: ""
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

// esta es la fincion de validar el formulario

    const validateForm = () => {
        const { name, lastName, email, password, repeat } = data;
    
        if (!ValidateName(name)) {
            setError("Por favor, ingrese un nombre válido (Solo letras de 4 a 90 dígitos)");
            return false;
        } else if (!ValidateLastname(lastName)) {
            setError("Por favor, ingrese un apellido válido (Solo letras de 4 a 90 dígitos)");
            return false;
        } else if (!ValidateEmail(email)) {
            setError("Por favor, ingrese un correo electrónico válido");
            return false;
        } else if (!ValidatePassword(password)) {
            setError("Por favor, ingrese una contraseña válida (de 6 a 24 dígitos)");
            return false;
        } else if (password!== repeat) {
            console.log("Las contraseñas no coinciden.");
            setError("Las contraseñas no coinciden.");
            return false;
        } else if (name === "" || lastName === "" || email === "" || password === "" || repeat === "") {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        return true;
    };

  
    
    // esta funcion tambiennes una copia de la de create pokemon y adaptada a los datos de el registro, si no me equivioco esta es la funcion que encia los datos a la base de datos

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let body = new FormData();
            data.name !== "" && body.append('Nombre', data.name);
            data.lastName !== "" && body.append('Apellido', data.lastName);
            data.email !== "" && body.append('Correo electrónico', data.email);
            data.password !== "" && body.append('Contraseña', data.password);
            data.repeat !== "" && body.append('Repetir contraseña', data.repeat);

            try {
                const url = import.meta.env.VITE_FETCH_REGISTER;
                const { data: res } = await axios.post(url, body);
                openAlert();
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.messageError);
                }
            }
        }
    }

// estas son las funciones de los tipos de caracteries que aceptan los formularios 

    function ValidateEmail(email) {
              // Validar que el correo electrónico tenga el formato correcto
              const emailRegex = /^\S+@\S+\.\S+$/;
              return emailRegex.test(email);
            }
            
            function ValidateName(name) {
                // Validar que el Nombre tenga el formato correcto
                const nameRegex = /^[a-zA-ZÀ-ÿ\s]{4,90}$/;
                return nameRegex.test(name);
              }
            
            function ValidateLastname(lastName) {
                // Validar que el Apellido tenga el formato correcto
                const lastNameRegex = /^[a-zA-ZÀ-ÿ\s]{4,90}$/;
                return lastNameRegex.test(lastName);
              }
            
            function ValidatePassword(password) {
                // Validar que la contraseña tenga el formato correcto
                const passwordRegex = /^.{6,24}$/;
                return passwordRegex.test(password);
              }

            //   los datos de estan guardando en el value de los input con el data."el nombre de dato" al igual que como se hace en el create pokemon
            // en resumen este codigo es una "copia" de como funciona el create pokemon

    return (
        <div className="flex justify-center m-10 w-98 ...">
            <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                <h2>PERFIL CREADO CORRECTAMENTE</h2>
            </Modal>
            <form className="flex flex-col min-w-[70%] p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
                <div className="flex justify-center m-2 ...">
                    <h1 className="text-xl font-semibold text-black ...">CREA TU PERFIL</h1>
                </div>

                <label htmlFor="name" className="pt-2 pl-1.5"><b>Nombre</b></label>
                <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="name"
                />

                <label htmlFor="lastName" className="pl-1.5"><b>Apellido</b></label>
                <input
                    type="text"
                    placeholder="Apellido"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="lastName"
                />

                <label htmlFor="email" className="pl-1.5"><b>Correo Electrónico</b></label>
                <input
                    type="text"
                    placeholder="Ejemplo@gmail.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="email"
                />

                <label htmlFor="password" className="pl-1.5"><b>Contraseña</b></label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="password"
                />

                <label htmlFor="repeat" className="pl-1.5"><b>Repetir contraseña</b></label>
                <input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeat"
                    value={data.repeat}
                    onChange={handleChange}
                    className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                    id="repeat"
                />

                {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center'>{error}</div>}
                <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                    Crear Perfil
                </button>
            </form>
        </div>
    );
}
