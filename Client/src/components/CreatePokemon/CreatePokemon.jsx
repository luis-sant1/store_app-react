import React from "react";
import { useState } from "react";
import { useModal } from "../Modal/useModal"
import Modal from "../Modal/Modal";
import axios from "axios";

export default function CreatePokemon(){
    const [error,setError]=useState('')
    const [isOpenAlert, openAlert, closeAlert] = useModal(false);
    const [data, setData] = useState({ //ESTADO POR DEFECTO DE LA DATA
        imagen:null,
		nombre: "",
		descripcion: "",
        precio:"",
        categoria:"",
        unidades:""
	});

    const handleChange = ({ currentTarget: input }) => { // Entrada de datos en los inputs
		setData({ ...data, [input.name]: input.value });
		console.log(data)
	};
    function handleSelect(e){
        setData({
            ...data,
            categoria: e.target.value
        }) // Entrada de datos de los inputs (setea la categoria según option)
    }
    const handleImg = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.files[0] }); // Manejador de imagen.
	};


    const handleSubmit = async (e) => {
        if (data.imagen===null) {
            e.preventDefault()
            setError("Por favor ingresa la imagen del Producto")
        } else if (data.nombre,data.descripcion,data.precio,data.unidades==="") {
            e.preventDefault()
            setError("Hay campos vacios, todos tienen que llenarse para crear un Producto")
        }else if (data.categoria.length===0) {
            e.preventDefault()
            setError("Por favor agrega las categoria de tu Producto")
        }else{
            e.preventDefault();
        // console.log(data);
        let body = new FormData()
        data.imagen = data.imagen !== null && (body.append('imagen', data.imagen))
        data.nombre = data.nombre !== '' && (body.append('nombre', data.nombre))
        data.descripcion = data.descripcion !== '' && (body.append('descripcion', data.descripcion))
        data.precio = data.precio !== '' && (body.append('precio', data.precio))
        data.categoria = data.categoria.length !== 0 && (body.append('categoria', data.categoria))
        data.unidades = data.unidades !== '' && (body.append('unidades', data.unidades))

		try {
            console.log(body)
			const url = import.meta.env.VITE_FETCH_CREATE;
			const { data: res } = await axios.post(url, body); // HACEMOS POST DE DATA
            // console.log(res)
            openAlert()
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
                    <h2>PRODUCTO CREADO CORRECTAMENTE</h2>
                </Modal>
        <form className="flex flex-col min-w-[70%]  p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
            <div className="flex justify-center m-2 ...">
                <h1 className="text-xl font-semibold text-black ...">CREA TU PRODUCTO</h1>
            </div>
            
            <label htmlFor="" id="name" className="pt-2 pl-1.5"><b>Nombre del Producto</b></label>
            <input
                type="text"
                placeholder="Nombre del Producto"
                name="nombre"
                onChange={handleChange}
                value={data.nombre}
                className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="name"
            />
            <label htmlFor="" id="description" className="pl-1.5"><b>Descripcion</b></label>
            <input
                type="text"
                placeholder="Descripcion..."
                name="descripcion"
                onChange={handleChange}
                value={data.descripcion}   
                className="h-11 col-span-2 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="description"
            />
            <div className="ml-2 flex flex-basic">
                <label className="m-2 pl-1.5"><b>Categoria:</b></label>
                <br />
                <select onChange={(e)=>handleSelect(e)} name="categoria" className="cursor-pointer" value={data.categoria} >   
                    <option value="Ropa">Ropa</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Suplementos">Suplementos</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Articulos_del_hogar">Articulos del hogar</option>
                    <option value="Libros">Libros</option>
                    <option value="Articulos_de_belleza">Articulos de belleza</option>
                    <option value="Arte">Arte</option>
                </select>
            </div>
            <label htmlFor="" id="price" className="pt-2 pl-1.5"><b>Precio</b></label>
            <input
                type="text"
                placeholder="Precio"
                name="precio"
                onChange={handleChange}
                value={data.precio}
                
                className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="price"
            />
            <label htmlFor="" id="units" className="pl-1.5"><b>Unidades</b></label>
            <input
                type="text"
                placeholder="Unidades"
                name="unidades"
                onChange={handleChange}
                value={data.unidades}
                className="h-11 mb-4 p-1 border-gray-300 border-2 bg-slate-100 rounded-2xl ..."
                id="units"
            />

            <label htmlFor="" id="img" className="pl-1.5"><b>Selecciona la imagen de tu producto</b></label>
            <div className=" sm:w-96 cursor-pointer">
                <div className="pl-1.5 items-center justify-center cursor-pointer">
                    <input 
                    type="file" 
                    name="imagen"
                    onChange={handleImg}
                    className=" mt-4 mb-4 cursor-pointer w-62"
                    id="img"
                    />
                </div>
            </div>

            {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center'>{error}</div>}
            <button type="submit" className="m-4 bg-green-50 h-10 rounded-full text-white font-semibold text-white-500 ...">
                Crear
            </button>
        </form>
    </div>
    )
}