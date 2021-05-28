import s from './Profile.module.css'
import MyProfileContainer from './MyProfile/MyProfileContainer'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = () => {
    return (
        <div>
            <MyProfileContainer />
            <MyPostsContainer />
        </div>
    )
}

export default Profile