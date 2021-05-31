import MyProfile from './MyProfile/MyProfile'
import MyPosts from './MyPosts/MyPosts'
import s from './Profile.module.css'

const Profile = () => {
    return (
        <div>
            <MyProfile />
            <MyPosts />
        </div>
    )
}

export default Profile