import {Head} from '../atoms/Head'
import {Celds} from '../atoms/Celds'

export const TableRow = ({idRow, columns, isHeader, 
    delete: deleteProduct, edit: editProduct}) => {
  return (
    <>
        <tr className={isHeader ? "header-row" : "data-row"}>
        {
            isHeader ? (
                <>
                    {
                        columns.map((column, index) => (
                            <Head key={index} content={column} />
                        ))
                    }
                </>
            ) : (
                <>
                    {
                        columns.length > 0 ? (
                            columns.map((column, index) => (
                                index==(columns.length-1) ? (
                                    <Celds key={index}>
                                        <div className="actions">
                                            <button className="delete-button" 
                                            onClick={(event)=>{deleteProduct(idRow)}}>
                                                Eliminar
                                            </button>
                                            <button className="edit-button" 
                                            onClick={(event)=>{editProduct(idRow)}}>
                                                Editar
                                            </button>
                                        </div>
                                    </Celds>
                                ):(
                                    <Celds key={index} content={column} />
                                )
                            ))
                        ): <Celds content={"No hay datos disponibles"} length={columns} />
                    }
                </>
            )
        }
        </tr>
    </>
  )
}
