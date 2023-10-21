/// IMPORT DE LOS COMPONENTES.
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
function App() {

  const[productos, setProductos] = useState([]);
  const[tablaProductos, setTablaProductos] = useState([]);
  const[busqueda, setBusqueda] = useState("");

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

  const filtrado = (ParamBusqueda) =>{
    var resultadosBusqueda = tablaProductos.filter((elemento)=>{
      if(elemento.nombre.toString().toLowerCase().includes(ParamBusqueda.toLowerCase())
      || elemento.precio.toString().toLowerCase().includes(ParamBusqueda.toLowerCase())
    ){
      return elemento;
    }
    })
    setProductos(resultadosBusqueda);
    console.log(productos)
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
      return <Search />
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

  return (
    <div>
      <header className="grid grid-cols-5 bg-white h-14">
        <img src={logo} alt="img_not_fund" className='ml-4 w-28 h-auto' />
        <button onClick={toPage("home")} className='rounded-lg shadow-lg bg-yellow-200 m-2  p-1 text-sm font-medium'>Inicio</button>
        <button onClick={toPage("create")} className='rounded-lg shadow-lg bg-green-50 m-2 p-1 text-sm font-medium'>Crear</button>
        <input className="w-64 h-10 pl-2 pr-8 rounded-l-full focus:outline-none m-2 p-1" type="text" onChange={handleChange} placeholder="Buscar..." />
        <button className="btn btn-success" onClick={toPage("search")}><FontAwesomeIcon icon={faSearch}/></button>
      </header>
      
      {getContent()}
    </div>
  )
}

export default App
