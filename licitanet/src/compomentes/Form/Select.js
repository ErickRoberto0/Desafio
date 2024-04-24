import style from './Select.module.css';

const Select = ({ name, text, options, handleOnChange, value }) => {
    return (
        <div className={style.form_control}>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>{text}</option>
                {options && options.map((option) => (  
                    <option value={option.cod} key={option.cod}>{option.nome}</option>
                ))}
            </select>
        </div>
    )
}

export default Select;
