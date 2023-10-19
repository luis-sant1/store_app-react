import { useState, useEffect } from 'react'
import Home from './components/Home/Home'
import CreatePokemon from './components/CreatePokemon/CreatePokemon' 
import UpdatePokemon from './components/UpdatePokemon/UpdatePokemon'
import logo from './images/pokemon.png'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function App() {

  const[registros, setRegistro] = useState([]);
  const[tablaRegistros, setTablaregistros] = useState([]);
  const[busqueda, setBusqueda] = useState("");

  const peticiones = async()=>{
    await axios.get("mongodb+srv://santiagomuchacholuma:M8X9XqX80bGHCjuB@cluster0.rrktmix.mongodb.net/"/*Colocar url de la base de datos*/).then(response=>{
      console.log(response.data);
      setTablaregistros(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange = e =>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

 const filtrado = (ParamBusqueda) =>{
    var ResultadosBusqueda = tablaRegistros.filter((elemento)=>{
      if(elemento.nombre.toString().toLowerCase().includes(ParamBusqueda.toLowerCase())
      || elemento.nombre.toString().toLowerCase().includes(ParamBusqueda.toLowerCase())
    ){
      return elemento;
    }
    })
    setRegistro(ResultadosBusqueda);
  }

  useEffect(()=>{
    peticiones();
  },[])

  const [page,setPage]=useState('home')
  const [id,setID]=useState('')
  const getContent=()=>{
    if (page==='home') {
      return <Home toPageUp={toPageUp}/>
    }else if(page==='create'){
      return <CreatePokemon/>
    }else if(page==='update'){
      return <UpdatePokemon id={id}/>
    }
  }
  const toPage = page=>e=>{
    e.preventDefault()
    window.history.pushState(null,"Create",`/${page}`)
    setPage(page)
  }
  const toPageUp=(page,id)=>e=>{
    e.preventDefault()
    console.log(id)
    window.history.pushState(null,"Create",`/${page}/${id}`)
    setPage(page)
    setID(id)
  }
  return (
    <div>
      <header className="grid grid-cols-6 bg-white h-14">
        <img src={logo} alt="img_not_fund" className='ml-4 w-14 h-14' />
        <button onClick={toPage("home")} className='rounded-lg shadow-lg bg-red-400 m-2 p-1 text-sm font-medium'>Inicio</button>
        <button onClick={toPage("create")} className='rounded-lg shadow-lg bg-yellow-300 m-2 p-1 text-sm font-medium'>Crear</button>
        <input class="w-64 h-10 pl-2 pr-8 rounded-l-full focus:outline-none m-2 p-1" type="text" onChange={handleChange} placeholder="Buscar..." />
        <button className="btn btn-success"><FontAwesomeIcon icon={faSearch}/></button>
      </header>
      {getContent()}
    </div>
  )
}

export default App
