
import {Input} from '../atoms/Input'
import {Label} from '../atoms/Label'
//Label={text,refInput,description}
//Input={type, name, id, value, error,onChange, onBlur}
export const InputForm = (
        {text,refInput,description, type, value, error, onChange, onBlur}
    ) => {
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
