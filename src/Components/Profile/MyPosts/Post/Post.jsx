import s from './Post.module.css'

const Post = props => {
    return (
        <div className={s.post}>
            <div className={s.avatar_sm}>
                <img src="https://www.indiewire.com/wp-content/uploads/2014/12/avatar.jpeg" alt="avatar"/>
            </div>
            <span className={s.text}>{props.message}</span>
        </div>
    )
}

export default Post