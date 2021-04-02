import s from './MyProfile.module.css'
import Avatar from './Avatar/Avatar'
import Info from './Info/Info'
import Preloader from '../../common/Preloader/Preloader'

const MyProfile = props => {
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