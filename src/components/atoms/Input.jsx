
export const Input = ({type, name, id, value,onChange, onBlur}) => {
    return (
        <>
            <input type={type} name={name} id={id} value={value} className={`input-${type} ${""}`} 
                onChange={onChange}
                onBlur={onBlur}
            />
        </>
    )
}
