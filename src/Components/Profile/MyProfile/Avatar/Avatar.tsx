import s from './Avatar.module.css'
import userPhoto from './../../../../assets/user.png'
import React, { FC, LegacyRef, useEffect, useState } from 'react'
import Preloader from '../../../common/Preloader/Preloader'
import { useDispatch } from 'react-redux'

type AvatarPropsType = {
    isOwner: boolean
    img?: string 
}

const Avatar: FC<AvatarPropsType> = ({ isOwner, img }) => {
    const [loadingStatus, loadingStatusChange] = useState(false)

    const dispatch = useDispatch()

    useEffect( () => {
        loadingStatusChange(false)
    }, [img])
    
    const setPhoto = (e: any) => {
        if(e.target.files && e.target.files.length){
            loadingStatusChange(true)
            dispatch(setPhoto(e.target.files[0]))
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
                { loadingStatus ? <Preloader/>  : <img src={ img ? img : userPhoto } alt="avatar"/> }
            </div>
                {isOwner && <button className={s.btn} onClick={activateInput}>Изменить фото</button>}
            <input className={s.input} type='file' ref={ref as LegacyRef<HTMLInputElement> | undefined} onChange={ setPhoto } />
        </div>
    )
}

export default Avatar