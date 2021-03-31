import s from './Avatar.module.css'
import userPhoto from './../../../../assets/user.png'

const Avatar = props => {
    return (
        <div className={s.avatar}>
            <img src={ props.img ? props.img : userPhoto } alt="avatar"/>
        </div>
    )
}

export default Avatar