import s from './Avatar.module.css'
import userPhoto from './../../../../assets/user.png'
import React from 'react'

const Avatar = props => {
    const setPhoto = e => {
        if(e.target.files.length){
            props.setPhoto(e.target.files[0])
        }
    }
    const ref = React.createRef()
    const activateInput = () => {
        ref.current.click()
    }
    return (
        <div>
            <div className={s.avatar}>
                <img src={ props.img ? props.img : userPhoto } alt="avatar"/>
            </div>
                {props.isOwner && <button className={s.btn} onClick={activateInput}>Изменить фото</button>}
            <input className={s.input} type='file' ref={ref} onChange={ setPhoto } />
        </div>
    )
}

export default Avatar