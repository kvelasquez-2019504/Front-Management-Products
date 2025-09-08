
export const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage,onItemsPerPageChange }) => {
  return (
     <>
        <div className="pagination">
            <button className="prev-button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
            <span className="pag-details">{currentPage} de {totalPages}</span>
            <select name="page" id="page" className="items-per-page" onChange={onItemsPerPageChange}>
                {
                    [5, 10, 20, 50, 75, 100].map((num) => (
                        <option key={num} value={num} selected={num === itemsPerPage || num === 5}>{num} por página</option>
                    ))
                }
            </select>
            <button className="next-button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
    </>
  )
};