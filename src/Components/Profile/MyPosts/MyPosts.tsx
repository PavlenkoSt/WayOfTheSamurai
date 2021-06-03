import s from './MyPosts.module.scss'
import AddPost from './AddPost/AddPost'
import { FC, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postsSelector } from '../../../Redux/selectors/profileSelectors'
import Post from './Post/Post'
import { profileActions } from '../../../Redux/profileReducer'

type FormDataType = {
    postText: string
}

const MyPosts: FC = () => {

    const dispatch = useDispatch()

    const posts = useSelector(postsSelector)
    const postsElems = posts.map( el => <Post message={el.message} key={el.id}/> )

    const onSubmit = (newPost: FormDataType) => {
        dispatch(profileActions.addNewPost(newPost.postText))
    }

    return (
        <div>
            <div className={s.posts}>
                <h3>Мои посты</h3>
                <AddPost onSubmit={onSubmit}/>
            </div>
            <div>
                { postsElems }
            </div>
        </div>
    )
}

export default MyPosts