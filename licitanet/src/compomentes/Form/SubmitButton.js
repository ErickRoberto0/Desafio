import style from './SubmitButton.module.css';

const SubmitButton = ({ text, onClick}) => {
    return (
        <div>
            <button className={style.btn} onClick={onClick}>{text}</button>
        </div>
    )
}

export default SubmitButton;