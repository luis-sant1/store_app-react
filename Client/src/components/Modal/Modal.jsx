import "./modal.css"

const Modal = ({ children, isOpen, onClose }) => { // Función que maneja la toast-page
    const handlerStopPropagation= (e)=> e.stopPropagation();
    return (
        <div className={`modal ${isOpen && "is-open"}`} onClick={onClose} > {/*Cierra si se clickea fuera */}
            <div className="modal-container" onClick={handlerStopPropagation}> 
                <button className="modal-close" onClick={onClose}>X</button> 
                {children} 
            </div>
        </div>
    )
}
export default Modal