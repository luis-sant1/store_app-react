import React from "react";
import { useState } from "react";
import axios from "axios";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";

export default function UpdatePokemon(props){
    console.log(props)
    const id=props
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [error,setError]=useState('')
    const [data, setData] = useState({
        imagen:null,
		nombre: "",
		descripcion: "",
        unidades:"",
        categoria:[],
        precio:""
	});

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		console.log(data)
	};
    function handleSelect(e){
        setData({
            ...data,
            categoria: e.target.value
        })
    }
    const handleImg = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.files[0] });
		// console.log(data)
	};


    const handleSubmit = async (e) => {
        if (data.imagen===null) {
            e.preventDefault()
            setError("Por favor ingresa la imagen del Pokemon")
        } else if (data.nombre,data.descripcion,data.unidades,data.precio==="") {
            e.preventDefault()
            setError("Hay campos vacios, todos tienen que llenarse para crear un Pokemon")
        }else if (data.categoria.length===0) {
            e.preventDefault()
            setError("Por favor agrega las categoria de tu Pokemon")
        }else{
            e.preventDefault();
        console.log(data);
        let body = new FormData()
        data.imagen = data.imagen !== null && (body.append('imagen', data.imagen))
        data.nombre = data.nombre !== '' && (body.append('nombre', data.nombre))
        data.descripcion = data.descripcion !== '' && (body.append('descripcion', data.descripcion))
        data.unidades = data.unidades !== '' && (body.append('unidades', data.unidades))
        data.categoria = data.categoria.length !== 0 && (body.append('categoria', data.categoria))
        data.precio = data.precio !== '' && (body.append('precio', data.precio))

		try {
            console.log(body)
			const url = `http://localhost:3000/updateProduct/${id}`
			const { data: res } = await axios.post(url, body);
            console.log(res)
            openAlert("Pokemon actualizado")
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 404 &&
				error.response.status <= 500
			) {
				setError(error.response.data.messageError);
			}
		}
        }
        
	};
    return(
        <div className="flex justify-center m-10 w-98 ...">
                <Modal isOpen={isOpenAlert} onClose={closeAlert}>
                    <h2>POKEMON ACTUALIZADO CORRECTAMENTE</h2>
                </Modal>
        <form className="flex flex-col min-w-[70%] bg-slate-200 p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
            <div className="flex justify-center m-2 ...">
                <h1 className="text-xl font-semibold ...">EDITA TU POKEMON</h1>
            </div>
            <div className="items-center justify-center">
                <input 
                type="file" 
                name="imagen"
                onChange={handleImg}
                />
            </div>
            <input
                type="text"
                placeholder="Nombre del Pokemon"
                name="nombre"
                onChange={handleChange}
                value={data.nombre}
                className="h-10 col-span-2 mb-4 bg-slate-100 rounded-lg ..."
            />
            <input
                type="text"
                placeholder="Descripcion..."
                name="descripcion"
                onChange={handleChange}
                value={data.descripcion}   
                className="h-10 col-span-2 mb-4 bg-slate-100 rounded-lg ..."
            />
            <div className="select">
                <label> Categoria:</label>
                <br />
                <select onChange={(e)=>handleSelect(e)} name="categoria" value={data.categoria} >   
                <option value="Bicho">Bicho</option>
                    <option value="Dragón">Dragón</option>
                    <option value="Eléctrico">Eléctrico</option>
                    <option value="Hada">Hada</option>
                    <option value="Lucha">Lucha</option>
                    <option value="Fuego">Fuego</option>
                    <option value="Volador">Volador</option>
                    <option value="Fantasma">Fantasma</option>
                    <option value="Planta">Planta</option>
                    <option value="Tierra">Tierra</option>
                    <option value="Hielo">Hielo</option>
                    <option value="Normal">Normal</option>
                    <option value="Veneno">Veneno</option>
                    <option value="Psíquico">Psíquico</option>
                    <option value="Roca">Roca</option>
                    <option value="Acero">Acero</option>
                    <option value="Agua">Agua</option>
                </select>
            </div>
            <input
                type="text"
                placeholder="Generación"
                name="unidades"
                onChange={handleChange}
                value={data.unidades}
                
                className="h-10 ml-2 m-2 bg-slate-100 rounded-lg ..."
            />
            <input
                type="text"
                placeholder="Precio"
                name="precio"
                onChange={handleChange}
                value={data.precio}
                className="h-10 ml-2 m-2 bg-slate-100 rounded-lg ..."
            />
            {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center text-center'>{error}</div>}
            <button type="submit" className="m-4 bg-yellow-300 h-10 rounded-full text-white font-semibold text-white-500 ...">
                ACTUALIZAR
            </button>
        </form>
    </div>
    )
}