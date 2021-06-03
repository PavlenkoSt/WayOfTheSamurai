import s from './MyProfile.module.scss'
import Avatar from './Avatar/Avatar'
import Info from './Info/Info'
import Preloader from '../../common/Preloader/Preloader'
import { FC, useEffect } from 'react'
import { Redirect, RouteComponentProps, useHistory, withRouter } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileSelector } from '../../../Redux/selectors/profileSelectors'
import { idSelector } from '../../../Redux/selectors/authSelectors'
import { getProfile, getUserStatus } from '../../../Redux/profileReducer'

type MyProfilePropsType = {
    match: any
}

const MyProfile: FC<MyProfilePropsType & RouteComponentProps> = ({ match }) => {

    const dispatch = useDispatch()

    const isOwner = !match.params.userId
    const profile = useSelector(userProfileSelector)
    const myId = useSelector(idSelector)

    useEffect(() => {
        if(match.params.userId || myId){
            dispatch(getProfile(match.params.userId, myId))
            dispatch(getUserStatus(match.params.userId, myId))
        }
    }, [match.params.userId, myId])

    if(!match.params.userId && !myId ){
        return <Redirect to='/login'/>
    }

    if(!profile){
        return <Preloader/>
    }

    return (
        <div className={s.profile}>
            <Avatar 
                isOwner={isOwner} 
                img={profile?.photos?.large}
            />
            <Info 
                isOwner={isOwner}
                profile={profile}
                myId={myId}
            />
        </div>
    )
}

export default withRouter(MyProfile)