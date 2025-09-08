
import {Input} from '../atoms/Input'
import {Label} from '../atoms/Label'

/**
 * Componente de campo de formulario reutilizable.
 * Renderiza un label, un input y un mensaje de error si existe.
 * @component
 * @param {Object} props
 * @param {string} props.text - Texto del label principal.
 * @param {string} props.refInput - Nombre y id del input.
 * @param {string} props.description - Descripción o ayuda para el campo.
 * @param {string} props.type - Tipo de input (text, number, etc).
 * @param {string|number} props.value - Valor actual del input.
 * @param {string} [props.error] - Mensaje de error a mostrar (opcional).
 * @param {function} props.onChange - Función para manejar cambios en el input.
 * @param {function} props.onBlur - Función para manejar el evento blur del input.
 */
export const InputForm = ({
    text, refInput, description, type, value, error, onChange, onBlur
}) => {
    return (
        <>
            <div className='input-form'>
                <Label text={text} refInput={refInput} description={description} />
                <Input type={type} name={refInput} id={refInput}
                    value={value} error={error} onChange={onChange} onBlur={onBlur} />
                {
                    error && (<Label style="error" text={text} refInput={refInput} description={error} />)
                }
            </div>
        </>
    )
}
