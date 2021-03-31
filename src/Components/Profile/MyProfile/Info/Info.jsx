import s from './Info.module.css'
import Status from './Status/Status'

const Info = props => {
    return (
        <div className={s.info}>
            <div className={s.name}>{ props.name }</div>
            <Status status={props.status} updateStatus={props.updateStatus}/>
            <ul>
                <li>Обо мне: <span className={s.point}>{props.about}</span> </li>
                <li>Ищу работу: <span className={s.point}>{props.work ? 'Да' : 'Нет'}</span> </li>
                <li><a className={s.link} href={props.facebook}>Facebook</a></li>
                <li><a className={s.link} href={props.instagram}>Instagram</a></li>
            </ul>
        </div>
    )
}

export default Info