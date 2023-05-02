import { useEffect, useState } from 'react'
import styles from './Input.module.css'

const Input = ({ type, name, id, className, initialValue, onChange, placeholder, required, disabled }) => {
    const [value, setValue] = useState("");

    const handleChange = ({ target }) => {
        setValue(target.value)
        onChange && onChange(target.value)
    }

    useEffect(() => {
        initialValue && setValue(initialValue)
    }, [initialValue])

    return (
        <div className={ styles.inputComponent }>
            <input type={ type }
                id={ id }
                className={ className ? className : "" }
                onChange={ handleChange }
                value={ value }
                name={ name }
                placeholder={ placeholder && placeholder }
                required={ required && required }
                disabled={ disabled && disabled }
            />
        </div>
    )
}

export default Input