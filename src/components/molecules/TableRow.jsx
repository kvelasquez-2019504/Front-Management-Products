import {Head} from '../atoms/Head'
import {Celds} from '../atoms/Celds'



/**
 * Fila de tabla reutilizable para mostrar encabezados o datos.
 * Si es encabezado, renderiza celdas de título. Si es fila de datos, renderiza celdas y acciones.
 * @component
 * @param {Object} props
 * @param {string|number} props.idRow - Identificador único de la fila (usado para acciones).
 * @param {Array} props.columns - Array de valores a mostrar en la fila.
 * @param {boolean} props.isHeader - Indica si la fila es de encabezado.
 * @param {Function} props.delete - Función para eliminar el elemento (solo en filas de datos).
 * @param {Function} props.edit - Función para editar el elemento (solo en filas de datos).
 */
export const TableRow = ({ idRow, columns, isHeader, delete: deleteProduct, edit: editProduct }) => {
    return (
        <>
            <tr className={isHeader ? "header-row" : "data-row"}>
                {
                    isHeader ? (
                        // Renderiza encabezados de columna
                        <>
                            {columns.map((column, index) => (
                                <Head key={index} content={column} />
                            ))}
                        </>
                    ) : (
                        // Renderiza celdas de datos y acciones
                        <>
                            {
                                columns.length > 0 ? (
                                    columns.map((column, index) => (
                                        index === (columns.length - 1) ? (
                                            <Celds key={index}>
                                                <div className="actions">
                                                    <button className="delete-button"
                                                        onClick={() => { deleteProduct(idRow) }}>
                                                        Eliminar
                                                    </button>
                                                    <button className="edit-button"
                                                        onClick={() => { editProduct(idRow) }}>
                                                        Editar
                                                    </button>
                                                </div>
                                            </Celds>
                                        ) : (
                                            <Celds key={index} content={column} />
                                        )
                                    ))
                                ) : <Celds content={"No hay datos disponibles"} length={columns} />
                            }
                        </>
                    )
                }
            </tr>
        </>
    )
}
