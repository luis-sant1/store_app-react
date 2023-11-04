import  CardPokemons from "../CardPokemons/CardPokemons"

export function Search({ productos }) {
    return (
        <div className="w-auto flex flex-wrap place-items-center mt-8 pb-4 mb-8">
            {productos?.map((e) => ( // Pasamos por cada uno de los productos, colocamos una key y traemos la data. 
                <CardPokemons key={e._id} data={e} /> // 
            ))}
        </div>
    )
}