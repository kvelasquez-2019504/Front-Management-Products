
export const Celds = ({content, children, styles}) => {
    return (
        <>
            <td className={"table-cell "+styles}>
                {
                    content ? content : children
                }
            </td>
        </>
    )
}
