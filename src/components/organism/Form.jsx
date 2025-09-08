import { InputForm } from "../molecules/InputForm";
// InputForm= text,refInput,description, type, value, error, onChange, onBlur
export const Form = ({id, fields=[]}) => {
    console.log(fields);
    
  return (
    <>
        <form id={id} >
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
            <button type="submit" className="submit-button">Enviar</button>
            <button type="button" className="cancel-button">Cancelar</button>
        </form> 
    </>
  )
}
