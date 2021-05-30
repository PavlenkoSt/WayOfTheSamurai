import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader'
import Pagination from '../common/Pagination/Pagination'
import { FC } from 'react'
import { UserType } from '../../types/types'
import SearchPeopleForm from './SearchPeople/SearchPeopleForm'
import { FilteredOptionsType } from '../../Redux/usersReducer'

type UsersPropsType = {
    users: Array<UserType>
    usersCountOnPage: number
    totalCount: number
    currentPage: number
    portionsSize: number
    isFetching: boolean
    followingProgress: Array<number>
    unfollowUser: (id: number) => void
    followUser: (id: number) => void
    onPaginationChange: (page: number) => void
    setFilteredOptions: (filteredOptions: FilteredOptionsType) => void
}

const Users: FC<UsersPropsType> = props => {
    return (
        <div className={s.container}>
            <h2 className={s.header}>Люди</h2>
            <SearchPeopleForm
                setFilteredOptions={props.setFilteredOptions}
            />
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