import s from './Avatar.module.css'
import userPhoto from './../../../../assets/user.png'
import React, { useEffect, useState } from 'react'
import Preloader from '../../../common/Preloader/Preloader'

const Avatar = props => {
    const [loadingStatus, loadingStatusChange] = useState(false)
    useEffect( () => {
        loadingStatusChange(false)
    }, [props.img])
    
    const setPhoto = e => {
        if(e.target.files.length){
            loadingStatusChange(true)
            props.setPhoto(e.target.files[0])
        }
    }
    const ref = React.createRef()
    const activateInput = () => {
        ref.current.click()
    }
    return (
        <div>
            <div className={s.avatar} style={loadingStatus ? {paddingBottom: '50px'} : {}}>
                { loadingStatus ? <Preloader/>  : <img src={ props.img ? props.img : userPhoto } alt="avatar"/> }
            </div>
                {props.isOwner && <button className={s.btn} onClick={activateInput}>Изменить фото</button>}
            <input className={s.input} type='file' ref={ref} onChange={ setPhoto } />
        </div>
    )
}

export default Avatar