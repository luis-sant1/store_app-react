export function Pagination({ productsPerPage, currentPage, setCurrentPage, numberProducts}) {
    const pageNumbers = [ ] // Número de páginas
    for(let i = 0; i<= Math.ceil(numberProducts / productsPerPage); i++){ // Calculamos el número de páginas según los productos que queremos mostrar por página.
        pageNumbers.push(i);
    }


    


    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <a className="pagination-previous">Previous</a>
            <a className="pagination-next">Next page</a>
            <ul className="pagination-list">
                
                <li>
                    <a className="pagination-link" aria-label="Goto page 1">1</a>
                </li>
                {pageNumbers.map(noPage => {
                    
                })}
                {/* <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                </li> */}

                <li>
                    <a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
                </li>

            </ul>
        </nav>
    )
}