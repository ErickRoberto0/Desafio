import style from './input.module.css';

const Input = ({ type, name, placeholder, handleOnChange, value }) => {
    return (
        <div className={style.form_control}>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value} 
            />
        </div>
    )
}

export default Input;