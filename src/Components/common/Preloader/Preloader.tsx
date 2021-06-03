import { FC } from 'react'
import s from './Preloader.module.scss'

const Preloader: FC = () => {
    return (
        <div className={s.ldsHourglass}></div>
    )
}

export default Preloader