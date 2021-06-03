import { FC } from 'react'
import s from './Modal.module.scss'

type ModalProps = {
    errorMessage: string
    errorStatusChange: (status: boolean) => void
}

const Modal: FC<ModalProps> = ({ errorMessage, errorStatusChange }) => {
    return (
        <div className={s.layout}>
            <div className={s.window}>
                <button onClick={() => errorStatusChange(false)} className={s.close}>&#10008;</button>
                <h2 className={s.header}>Что-то пошло не так {':('}</h2>
                <p className={s.text}>{errorMessage}</p>
                <button onClick={() => errorStatusChange(false)} className={s.ok}>Окей</button>
            </div>
        </div>
    )
}

export default Modal