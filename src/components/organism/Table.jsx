import { TableRow } from "../molecules/TableRow"

//TableRow = {idRow, columns, isHeader, delete: deleteProduct, edit: editProduct}
export const Table = ({ rows, headers, delete:deleteProduct, edit:editProduct }) => {
    const removeColumnId= (data)=>{
        return data.slice(1);
    }
    return (
        <>
            <table className="custom-table">
                <thead className="table-header">
                    <TableRow columns={headers} isHeader={headers.length > 0} />
                </thead>
                <tbody className="table-body">
                    {
                        rows.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow idRow={row[0]} key={row[0]} columns={removeColumnId(row)} 
                                    delete={deleteProduct} edit={editProduct} />
                            ))
                        ) : (
                            <TableRow columns={headers.length} />
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
