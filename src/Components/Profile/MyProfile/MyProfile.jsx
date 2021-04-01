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
                name={props.profile.fullName} 
                about={props.profile.aboutMe}
                work={props.profile.lookingForAJob}
                facebook={props.profile.contacts.facebook}
                instagram={props.profile.contacts.instagram}
                status={props.status}
                updateStatus={props.updateStatus}
                />
        </div>
    )
}

export default MyProfile