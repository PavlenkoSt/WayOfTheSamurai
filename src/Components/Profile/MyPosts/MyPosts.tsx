import s from './MyPosts.module.css'
import AddPost from './AddPost/AddPost'
import { FC, ReactNode } from 'react'

type MyPostsPropsType = {
    postsElements: ReactNode
    addNewPost: (text: string) => void
}

type FormDataType = {
    postText: string
}

const MyPosts: FC<MyPostsPropsType> = props => {

    const onSubmit = (newPost: FormDataType) => {
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