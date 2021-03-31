import s from './MyPosts.module.css'
import AddPost from './AddPost/AddPost'

const MyPosts = props => {
    const onSubmit = newPost => {
        props.addNewPost(newPost.postText)
    }
    return (
        <div>
            <div className={s.posts}>
                <h3>Мои посты</h3>
                <AddPost onSubmit={onSubmit}/>
            </div>
            <div>
                { props.postsElements }
            </div>
        </div>
    )
}

export default MyPosts