
import React from "react";
import CardPokemons from '../CardPokemons/CardPokemons'

export default function FavProducs({ favoritos, data }) {
  // Verificar si data es un array
  if (!Array.isArray(data)) {
    return <div>No se ha proporcionado un array de datos válido.</div>;
  }

  // UTILIZAMOS  UN BUCLE FOR PARA REALIZAR LA FILTRACION 
  // En este ejemplo, estamos recorriendo el array data y comprobando si el id de cada elemento está incluido en el array favoritos. Si es así, agregamos ese elemento a favoritosData. Al final, favoritosData contendrá solo los elementos que son favoritos.

  const favoritosData = [];
  
  for (let i = 0; i < data.length; i++) {
    if (favoritos.includes(data[i].id)) {
      favoritosData.push(data[i]);
    }
  }

  return (
    <div>
      <h2>Tarjetas Favoritas</h2>
      {favoritosData.map((item) => (
        <CardPokemons key={item.id} data={item} />
      ))}
    </div>
  );
}



// otra forma en la que el me lo explico

// import React from "react";

// export default function Favoritos({ favoritos, data }) {
//   const favoritosData = data.filter((item) => favoritos.includes(item.id));

//   return (
//     <div>
//       <h2>Tarjetas Favoritas</h2>
//       {favoritosData.map((item) => (
//         <CardPokemons key={item.id} data={item} />
//       ))}
//     </div>
//   );
// }



