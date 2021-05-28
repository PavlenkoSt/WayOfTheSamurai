import Post from './Post/Post'
import MyPosts from './MyPosts'
import { profileActions } from '../../../Redux/profileReducer'
import { connect } from 'react-redux'
import { AppStateType } from '../../../Redux/reduxStore'

const MapStateToProps = (state: AppStateType) => ({
    postsElements: state.profilePage.posts.map( el => <Post message={el.message} key={el.id}/> ),
})

const MapDispatchToProps = { addNewPost: profileActions.addNewPost }

export default connect(MapStateToProps, MapDispatchToProps)(MyPosts)