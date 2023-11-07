/// IMPORT DE LOS COMPONENTES.
'use client';
import { useState, useEffect } from 'react'
import Home from './components/Home/Home'
import CreatePokemon from './components/CreatePokemon/CreatePokemon' 
import UpdatePokemon from './components/UpdatePokemon/UpdatePokemon'
import CardPokemons from './components/CardPokemons/CardPokemons'
import logo from './images/pokemon.png'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Search } from './components/Search/Search'
import { AuthProvider } from './components/Context/AuthContext';
import SingUp from './components/Registrate/Registrate';
import { Dropdown } from 'flowbite-react' 
import Registrate from './components/Registrate/Registrate';
import Iniciarsesion from './components/Iniciarsesion/Iniciarsesion';



function App() {

  const[productos, setProductos] = useState([]);
  const[tablaProductos, setTablaProductos] = useState([]);
  const[busqueda, setBusqueda] = useState("");
  const [opcionBusqueda, setOpcionBusqueda] = useState('nombre');
  const peticionesGet=async()=>{
    await axios.get("http://localhost:3000/products") //https://jsonplaceholder.typicode.com/users URL de API externa (pruebas)
    .then(response =>{
      setProductos(response.data);
      setTablaProductos(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrado(e.target.value)
  } 

  const filtrado = (paramBusqueda) => {
    const resultadosBusqueda = tablaProductos.filter((elemento) => {
      if (opcionBusqueda === 'nombre') {
        return elemento.nombre.toString().toLowerCase().includes(paramBusqueda.toLowerCase());
      } else if (opcionBusqueda === 'categoria') {
        return elemento.categoria.toString().toLowerCase().includes(paramBusqueda.toLowerCase());
      }
    });
    setProductos(resultadosBusqueda);
  }

  useEffect(()=>{
    peticionesGet();  
  },[])




  const [page,setPage]=useState('home') // Estado para la página actual. 
  const [id,setID]=useState('')
  const [content, setContent] = useState("")
  const getContent=()=>{ // Condicional que setea el estado "page" para que se renderice. 
    if (page==='home') {
      return <Home toPageUp={toPageUp}/>
    }else if(page==='create'){
      return <CreatePokemon/>
    }else if(page==='update'){
      return <UpdatePokemon idU={id} content={content}/>
    }else if(page === 'search'){
      return <Search  productos = {productos} toPageUp={toPageUp} />
    }else if(page==='Registrate') {
      return <Registrate page = {page} setPage = {setPage} />
    }else if(page==='Iniciar') {
      return <Iniciarsesion/>
    }
  }
  const toPage = page=>e=>{ // Función que cambia de vista. 
    e.preventDefault()
    window.history.pushState(null,"Create",`/${page}`)
    setPage(page)
  }

  const toPageUp=(page, id, data)=>e=>{ // Función que cambia de vista (editar)
    e.preventDefault()
    window.history.pushState(null,"Create",`/${page}/${id}`) // Crea una pagina con el estado page y el id. 
    setPage(page) // Setea estado
    setID(id) // Guarda id
    setContent(data) // Guarda data del fetch
  }

  const handleOpcionBusquedaChange = (e) => {
    setOpcionBusqueda(e.target.value);
  };

  return (
    // Contexto
    <AuthProvider>                              
      
    <div className='w-full'>
      <header className="flex bg-white h-14 w-full">
        <button onClick={toPage("home")}><img src={logo} alt="img_not_fund" className='ml-2 w-28 h-auto' /></button>
        {/* <button onClick={toPage("home")} className='rounded-lg shadow-lg bg-yellow-200 m-2  p-1 text-sm font-medium'>Inicio</button> */}
        {/* <button onClick={toPage("create")} className='rounded-lg shadow-lg bg-green-50 m-2 p-1 text-sm font-medium'>Crear</button> */}
        <input onFocus = {toPage("search")}className="w-32 md:w-44 lg:w-64 xl:w-64 2xl:w-64 flex mr-auto ml-auto  h-10 pl-2 pr-8 rounded-l-full rounded-r-full focus:outline-none mr-2 mt-2 pr-1 pt-1 max-w-5xl" type="text" onChange={handleChange} placeholder="Buscar..." />
        {/* <button className="btn btn-success" onClick={toPage("search")}><FontAwesomeIcon icon={faSearch}/></button> */}
        {/* <button className='border-2 border-black w-12 h-11 text-center rounded-lg m-2 p-1 text-sm font-medium'>Menú</button> */}
        <div className=' pt-1.5  mr-2'>
          <Dropdown label="Menú" dismissOnClick={false} className=''>
            <Dropdown.Item><button onClick={toPage("create")} className=''>Crear</button></Dropdown.Item>
            <Dropdown.Item><button onClick={toPage("home")} className=''>Inicio</button></Dropdown.Item>
            <Dropdown.Item><button onClick={toPage("Registrate")} className=''>Registrate</button></Dropdown.Item>
            <Dropdown.Item><button onClick={toPage("Iniciar")} className=''>Iniciar Sesión</button></Dropdown.Item>
          </Dropdown>
        </div>
      </header>
      <div className='items-center justify-center text-center mt-4 text-white' >
      <select onChange={handleOpcionBusquedaChange} >
            <option value="nombre">Nombres</option>
            <option value="categoria">Categorías</option>
      </select>
      </div>
      {getContent()}
    </div>
  
    </AuthProvider>
  )
}

export default App
