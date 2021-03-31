import Post from './Post/Post'
import MyPosts from './MyPosts'
import {addNewPost} from '../../../Redux/profileReducer'
import { connect } from 'react-redux'

const MapStateToProps = state => {
    return {
        postsElements: state.profilePage.posts.map( el => <Post message={el.message} key={el.id}/> ),
    }
}

const MapDispatchToProps = { addNewPost }

export default connect(MapStateToProps, MapDispatchToProps)(MyPosts)