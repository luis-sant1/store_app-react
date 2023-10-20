export function Pagination({ productsPerPage, currentPage, setCurrentPage, total, data }) {

    const pageNumbers = [] // Número de páginas
    if (total != 0) {
        for (let i = 1; i <= Math.ceil(total / productsPerPage); i++) { // Calculamos el número de páginas según los productos que queremos mostrar por página.
            pageNumbers.push(i);
        }
    }

    const onPrevPage = () => {
        setCurrentPage(currentPage - 1);
    }
    const onNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const onSpecificPage = (n) => {
        setCurrentPage(n)
    }


    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <a className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`} onClick={onPrevPage}>Anterior</a>
            <a className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disabled' : ''}`} onClick={onNextPage}>Siguiente</a>
            <ul className="pagination-list">
                {
                    pageNumbers.map(noPage => (
                        <li key={noPage}>
                            <a className={`pagination-link ${noPage == currentPage ? 'is-current' : ''}`} onClick={() => onSpecificPage(noPage)}>{noPage}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}