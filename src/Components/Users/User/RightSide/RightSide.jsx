import s from './RightSide.module.css'

const RightSide = props => {
    return (
        <div className={s.item}>
            <div className={s.info}>
                <div className={s.name}>
                    {props.name}
                </div>
                <div className={s.status}>
                    {props.status}
                </div>
            </div>
            <div className={s.location}>
            </div>
        </div>
    )
}

export default RightSide