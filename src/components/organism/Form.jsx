import { InputForm } from "../molecules/InputForm";
import '../../styles/Form.css'


/**
 * Componente de formulario reutilizable para agregar o editar entidades.
 * Renderiza campos dinámicamente a partir del objeto fields y maneja acciones de submit y cancelación.
 * @component
 * @param {Object} props
 * @param {string} props.id - ID del formulario (para identificarlo en el DOM).
 * @param {Object} props.fields - Objeto con la configuración de los campos del formulario.
 * @param {Function} props.actionForm - Función que se ejecuta al enviar el formulario.
 * @param {Function} props.closeForm - Función que se ejecuta al cancelar el formulario.
 */
export const Form = ({ id, fields = [], actionForm, closeForm }) => {
    return (
        <>
            <form id={id} className="form">
                {
                    Object.entries(fields).map(([key, value], index) => (
                        <InputForm key={index}
                            text={value.text}
                            refInput={value.refInput}
                            description={value.description}
                            type={value.type} value={value.value}
                            error={value.error}
                            onChange={value.onChange}
                            onBlur={value.onBlur}
                        />
                    ))
                }
                <div className="form-buttons">
                    <button type="button" className="cancel-button" onClick={closeForm}>Cancelar</button>
                    <button type="button" className="submit-button" onClick={(e) => actionForm(e)}>Enviar</button>
                </div>
            </form>
        </>
    )
}
