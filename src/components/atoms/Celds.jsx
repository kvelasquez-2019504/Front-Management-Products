
export const Celds = ({content, children, styles, length}) => {
    return (
        <>
            <td className={"table-cell "+styles} colSpan={length ? length : 1}>
                {
                    content ? content : children
                }
            </td>
        </>
    )
}
