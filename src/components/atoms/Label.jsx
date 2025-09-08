export const Label = ({text,refInput,description}) => {
    return (
        <>
            <label htmlFor={refInput}>{description}</label>
        </>
    )
}
