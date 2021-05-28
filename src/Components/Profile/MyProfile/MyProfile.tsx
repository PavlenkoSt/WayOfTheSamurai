import s from './MyProfile.module.css'
import Avatar from './Avatar/Avatar'
import Info from './Info/Info'
import Preloader from '../../common/Preloader/Preloader'
import { FC } from 'react'
import { ProfileType } from '../../../types/types'

type MyProfilePropsType = {
    profile: any
    isOwner: boolean
    myId: string
    status: string
    setPhoto: (photo: any) => any
    updateStatus: (status: string, myId: string) => any
    editProfileInfo: (profileInfo: ProfileType, myId: string) => any

}

const MyProfile: FC<MyProfilePropsType> = props => {
    if(!props.profile){
        return <Preloader/>
    }

    return (
        <div className={s.profile}>
            <Avatar isOwner={props.isOwner} img={props.profile.photos.large} setPhoto={props.setPhoto}/>
            <Info 
                isOwner={props.isOwner}
                status={props.status}
                updateStatus={props.updateStatus}
                editProfileInfo={props.editProfileInfo}
                myId={props.myId}
                profile={props.profile}
            />
        </div>
    )
}

export default MyProfile