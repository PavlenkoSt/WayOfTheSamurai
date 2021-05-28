import { FC } from 'react'
import s from './Friend.module.css'

type FriendPropsType = {
    name: string
}

const Friend: FC<FriendPropsType> = props => {
    return (
        <a href="#" className={s.item}>
            <div className={s.img}>
                <img src="https://placehold.it/200x200/333" alt="friend"/>
            </div>
            <div className={s.name}>
                {props.name}
            </div>
        </a>
    )
}

export default Friend