export const Label = ({style,refInput,description}) => {
    return (
        <>
            <label htmlFor={refInput} className={style}>{description}</label>
        </>
    )
}
