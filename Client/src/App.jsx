import { useState } from 'react'
import Home from './components/Home/Home'
import CreatePokemon from './components/CreatePokemon/CreatePokemon' 
import UpdatePokemon from './components/UpdatePokemon/UpdatePokemon'
import logo from './images/pokemon.png'

function App() {
  const [page,setPage]=useState('home')
  const [id,setID]=useState('')
  const [content, setContent] = useState("")
  const getContent=()=>{
    if (page==='home') {
      return <Home toPageUp={toPageUp}/>
    }else if(page==='create'){
      return <CreatePokemon/>
    }else if(page==='update'){
      return <UpdatePokemon idU={id} content={content}/>
    }
  }
  const toPage = page=>e=>{
    e.preventDefault()
    window.history.pushState(null,"Create",`/${page}`)
    setPage(page)
  }
  const toPageUp=(page, id, data)=>e=>{
    e.preventDefault()
    console.log(id)
    window.history.pushState(null,"Create",`/${page}/${id}`)
    setPage(page)
    setID(id)
    setContent(data)
  }

  return (
    <div>
      <header className="grid grid-cols-3 bg-white h-14">
        <img src={logo} alt="img_not_fund" className='ml-4 w-14 h-14' />
        <button onClick={toPage("home")} className='rounded-lg shadow-lg bg-yellow-200 m-2  p-1 text-sm font-medium'>Inicio</button>
        <button onClick={toPage("create")} className='rounded-lg shadow-lg bg-green-50 m-2 p-1 text-sm font-medium'>Crear</button>
      </header>
      {getContent()}
    </div>
  )
}

export default App
