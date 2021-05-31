import MyProfileContainer from './MyProfile/MyProfileContainer'
import MyPosts from './MyPosts/MyPosts'
import s from './Profile.module.css'

const Profile = () => {
    return (
        <div>
            <MyProfileContainer />
            <MyPosts />
        </div>
    )
}

export default Profile