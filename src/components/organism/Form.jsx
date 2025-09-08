import { InputForm } from "../molecules/InputForm";
import '../../styles/Form.css'
// InputForm= text,refInput,description, type, value, error, onChange, onBlur
export const Form = ({id, fields=[], actionForm, closeForm}) => {
  return (
    <>
        <form id={id} className="form">
            {
                Object.entries(fields).map( ([key, value], index) => (
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
                <button type="button" className="submit-button" onClick={(e)=>actionForm(e)}>Enviar</button>
            </div>
        </form> 
    </>
  )
}
