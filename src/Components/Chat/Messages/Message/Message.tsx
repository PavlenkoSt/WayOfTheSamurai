import React, { FC } from 'react'
import user from '../../../../assets/user.png'
import s from './Message.module.scss'

type MessagePropsType = {
    username: string
    photo: string
    message: string
}

const Message: FC<MessagePropsType> = ({ username, photo, message }) => {
    return (
        <div className={s.main}>
            <div className={s.header}>
                <img className={s.img} src={photo ? photo : user} alt="avatar"/>
                <span className={s.name}>{username}</span>
            </div>
            <div className={s.message}>
                {message}
            </div>
        </div>
    )
}

export default Message
