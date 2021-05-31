import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader'
import Pagination from '../common/Pagination/Pagination'
import { FC, useEffect } from 'react'
import SearchPeopleForm from './SearchPeople/SearchPeopleForm'
import { useDispatch, useSelector } from 'react-redux'
import { currentPageSelector, totalCountSelector, usersCountOnPageSelector , portionsSizeSelector, filteredOptionsSelector, isFetchingSelector, usersSelector} from '../../Redux/selectors/usersSelectors'
import { getUsers, usersActions } from '../../Redux/usersReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

const Users: FC = () => {
    const dispatch = useDispatch()

    const totalCount = useSelector(totalCountSelector)
    const countOnPage = useSelector(usersCountOnPageSelector)
    const currentPage = useSelector(currentPageSelector)
    const portionsSize = useSelector(portionsSizeSelector)

    const filteredOptions = useSelector(filteredOptionsSelector)
    const isFetching = useSelector(isFetchingSelector)
    const users = useSelector(usersSelector)

    const onPaginationChange = (currentPage: number) => {
        dispatch(usersActions.setCurrentPage(currentPage))
        dispatch(getUsers(countOnPage, currentPage, filteredOptions))
    }

    useEffect(() => {
        dispatch(getUsers(countOnPage, currentPage, filteredOptions))
    }, [currentPage, filteredOptions])

    return (
        <div className={s.container}>
            <h2 className={s.header}>Люди</h2>
            <SearchPeopleForm />
            <Pagination
                totalCount={totalCount} 
                countOnPage={countOnPage} 
                currentPage={currentPage} 
                onPaginationChange={onPaginationChange}
                portionsSize={portionsSize}
            />
            <div className={s.users}>
                {
                    isFetching ? <Preloader/> : users.map(user => <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        status={user.status}
                        photo={user.photos.small}
                        followed={user.followed}
                    />)
                }
            </div>
        </div>
    )
}

export default withAuthRedirect(Users)