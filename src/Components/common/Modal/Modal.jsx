import s from './Modal.module.css'

const Modal = props => {
    return (
        <div className={s.layout}>
            <div className={s.window}>
                <button onClick={() => props.errorStatusChange(false)} className={s.close}>&#10008;</button>
                <h2 className={s.header}>Что-то пошло не так {':('}</h2>
                <p className={s.text}>{props.errorMessage}</p>
                <button onClick={() => props.errorStatusChange(false)} className={s.ok}>Окей</button>
            </div>
        </div>
    )
}

export default Modal