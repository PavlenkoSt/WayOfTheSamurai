import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader'
import Pagination from '../common/Pagination/Pagination'


const Users = props => {
    return (
        <div className={s.container}>
            <h2 className={s.header}>Люди</h2>
            <Pagination
                totalCount={props.totalCount} 
                countOnPage={props.usersCountOnPage} 
                currentPage={props.currentPage} 
                onPaginationChange={props.onPaginationChange}
                portionsSize={props.portionsSize}
            />
            <div className={s.users}>
                {
                    props.isFetching ? <Preloader/> : props.users.map(user => <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        status={user.status}
                        photo={user.photos.small}
                        followed={user.followed}
                        followingProgress={props.followingProgress}
                        unfollowUser={props.unfollowUser}
                        followUser={props.followUser}
                    />)
                }
            </div>
        </div>
    )
}

export default Users