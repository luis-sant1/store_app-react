import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import UpdatePokemon from './components/UpdatePokemon/UpdatePokemon';
import CardPokemons from './components/CardPokemons/CardPokemons';
import logo from './images/pokemon.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Search } from './components/Search/Search';

function App() {
  const [productos, setProductos] = useState([]);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [opcionBusqueda, setOpcionBusqueda] = useState('nombre');

  const peticionesGet = async () => {
    await axios
      .get('http://localhost:3000/products')
      .then((response) => {
        setProductos(response.data);
        setTablaProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrado(e.target.value);
  };

  const filtrado = (paramBusqueda) => {
    const resultadosBusqueda = tablaProductos.filter((elemento) => {
      if (opcionBusqueda === 'nombre') {
        return elemento.nombre.toString().toLowerCase().includes(paramBusqueda.toLowerCase());
      } else if (opcionBusqueda === 'categoria') {
        return elemento.categoria.toString().toLowerCase().includes(paramBusqueda.toLowerCase());
      }
    });

    setProductos(resultadosBusqueda);
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  const [page, setPage] = useState('home');
  const [id, setID] = useState('');
  const [content, setContent] = useState('');

  const getContent = () => {
    if (page === 'home') {
      return <Home toPageUp={toPageUp} />;
    } else if (page === 'create') {
      return <CreatePokemon />;
    } else if (page === 'update') {
      return <UpdatePokemon idU={id} content={content} />;
    } else if (page === 'search') {
      return <Search productos={productos} />;
    }
  };

  const toPage = (page) => (e) => {
    e.preventDefault();
    window.history.pushState(null, 'Create', `/${page}`);
    setPage(page);
  };

  const toPageUp = (page, id, data) => (e) => {
    e.preventDefault();
    window.history.pushState(null, 'Create', `/${page}/${id}`);
    setPage(page);
    setID(id);
    setContent(data);
  };

  const handleOpcionBusquedaChange = (e) => {
    setOpcionBusqueda(e.target.value);
  };

  return (
    <div className="w-full">
      <header className="grid grid-cols-5 bg-white h-14 w-full">
        <img src={logo} alt="img_not_fund" className="ml-4 w-28 h-auto" />
        <button
          onClick={toPage('home')}
          className="rounded-lg shadow-lg bg-yellow-200 m-2 p-1 text-sm font-medium"
        >
          Inicio
        </button>
        <button
          onClick={toPage('create')}
          className="rounded-lg shadow-lg bg-green-50 m-2 p-1 text-sm font-medium"
        >
          Crear
        </button>
        <div className="relative flex items-center">
          <input
            className="rounded-l-lg border-r-0 border-transparent bg-transparent focus:outline-none text-gray-600 py-2 pl-2 pr-8 leading-tight focus:border-transparent"
            type="text"
            onChange={handleChange}
            placeholder="Buscar"
          />
          <select
            className="absolute right-0 top-0 mt-2 mr-2 bg-white text-gray-600 py-2 px-4 border border-gray-300 rounded-r-lg focus:outline-none"
            onChange={handleOpcionBusquedaChange}
          >
            <option value="nombre">Nombres</option>
            <option value="categoria">Categorías</option>
          </select>
          <button className="absolute right-12 top-0 mt-2 mr-2" onClick={toPage('search')}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </header>

      {getContent()}
    </div>
  );
}

export default App;