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
            setError("Por favor ingresa la imagen del Producto")
        } else if (data.nombre,data.descripcion,data.unidades,data.precio==="") {
            e.preventDefault()
            setError("Hay campos vacios, todos tienen que llenarse para crear un Producto")
        }else if (data.categoria.length===0) {
            e.preventDefault()
            setError("Por favor agrega las categoria de tu Producto")
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
			const { data: res } = await axios.put(`http://localhost:3000/updateProduct/${id.id}`, body); // Buscamos en la data de la respuesta con el id que viene de props (APP.JSX) y editamos.
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
        <form className="flex flex-col min-w-[70%] p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
            <div className="flex justify-center m-2 ...">
                <h1 className="text-xl font-semibold text-black...">EDITA TU PRODUCTO</h1>
            </div>
            <div className="sm:w-96">
                <div className="items-center justify-center cursor-pointer">
                    <input 
                    type="file" 
                    name="imagen"
                    onChange={handleImg}
                    className="mt-4 mb-4 cursor-pointer w-62"
                    
                    />
                </div>
            </div>
            <input
                type="text"
                placeholder="Nombre del Producto"
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
            <div className="ml-2 flex flex-basic">
                <label className="m-2"> Categoria:</label>
                <br />
                <select onChange={(e)=>handleSelect(e)} name="categoria" className="cursor-pointer" value={data.categoria} >   
                    <option value="Ropa">Ropa</option>
                    <option value="Tegnologia">Tegnologia</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Suplementos">Suplementos</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Articulos_del_hogar">Articulos del hogar</option>
                    <option value="Libros">Libros</option>
                    <option value="Articulos_de_belleza">Articulos de belleza</option>
                    <option value="Arte">Arte</option>
                </select>
            </div>
            <input
                type="text"
                placeholder="Precio"
                name="precio"
                onChange={handleChange}
                value={data.precio}
                className="h-10 mb-4 bg-slate-100 rounded-lg ..."
            />
            <input
                type="text"
                placeholder="Unidades"
                name="unidades"
                onChange={handleChange}
                value={data.unidades}
                
                className="h-10 mb-4 bg-slate-100 rounded-lg ..."
            />
            
            {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center '>{error}</div>}
            <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                ACTUALIZAR
            </button>
        </form>
    </div>
    )
}