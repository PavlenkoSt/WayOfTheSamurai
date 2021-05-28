import s from './Avatar.module.css'
import userPhoto from './../../../../assets/user.png'
import React, { ChangeEvent, FC, LegacyRef, useEffect, useState } from 'react'
import Preloader from '../../../common/Preloader/Preloader'

type AvatarPropsType = {
    isOwner: boolean
    img: string
    setPhoto: (photo: any) => void
}

const Avatar: FC<AvatarPropsType> = props => {
    const [loadingStatus, loadingStatusChange] = useState(false)

    useEffect( () => {
        loadingStatusChange(false)
    }, [props.img])
    
    const setPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length){
            loadingStatusChange(true)
            props.setPhoto(e.target.files[0])
        }
    }

    const ref = React.createRef<HTMLDivElement>()
    
    const activateInput = () => {
        if(ref.current){
            ref.current.click()
        }
    }

    return (
        <div>
            <div className={s.avatar} style={loadingStatus ? {paddingBottom: '50px'} : {}}>
                { loadingStatus ? <Preloader/>  : <img src={ props.img ? props.img : userPhoto } alt="avatar"/> }
            </div>
                {props.isOwner && <button className={s.btn} onClick={activateInput}>Изменить фото</button>}
            <input className={s.input} type='file' ref={ref as LegacyRef<HTMLInputElement> | undefined} onChange={ setPhoto } />
        </div>
    )
}

export default Avatar