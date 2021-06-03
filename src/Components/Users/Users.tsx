import s from './Users.module.scss'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader'
import Pagination from '../common/Pagination/Pagination'
import { FC, useEffect } from 'react'
import SearchPeopleForm from './SearchPeople/SearchPeopleForm'
import { useDispatch, useSelector } from 'react-redux'
import { currentPageSelector, totalCountSelector, usersCountOnPageSelector , portionsSizeSelector, filteredOptionsSelector, isFetchingSelector, usersSelector} from '../../Redux/selectors/usersSelectors'
import { getUsers, usersActions } from '../../Redux/usersReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { useHistory } from 'react-router'
import queryString from 'query-string'

type QueryType = {
    page?: string
    term?: string
    friend?: string
}

const Users: FC = () => {
    const dispatch = useDispatch()

    const history = useHistory()

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
        const queryObj: QueryType = {}

        if(currentPage !== 1){
            queryObj.page = currentPage.toString()
        }

        if(filteredOptions.friend !== 'all'){
            queryObj.friend = filteredOptions.friend
        }

        if(filteredOptions.term){
            queryObj.term = filteredOptions.term
        }

        if(queryObj.page || queryObj.term || queryObj.friend){
            history.push(`/users?${queryString.stringify(queryObj)}`)
        }

    }, [currentPage, filteredOptions])

    useEffect(() => {
        const query = queryString.parse(history.location.search.substr(1))

        if(query.page) dispatch(usersActions.setCurrentPage(+query.page))

        if(query.term || query.friend){
            dispatch(usersActions.setFilteredOptions({ 
                term: query.term ? query.term.toString() : '', 
                friend: query.friend ? query.friend.toString() : 'all' 
            }))
        }

    }, [history.location.search])

    useEffect(() => {
        dispatch(getUsers(countOnPage, currentPage, filteredOptions))
    }, [currentPage, filteredOptions])

    return (
        <div className={s.container}>
            <h2 className={s.header}>Люди</h2>
            <SearchPeopleForm />
            <Pagination
                onPaginationChange={onPaginationChange}
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