import { connect } from "react-redux"
import UsersAPI from "./UsersAPI"
import { setTotalCount, setCurrentPage, getUsers, unfollowUser, followUser} from './../../Redux/usersReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from "redux"

const mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        usersCountOnPage: state.usersPage.usersCountOnPage,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        portionsSize: state.usersPage.portionsSize,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}

const mapDispatchToProps = { setTotalCount, setCurrentPage, getUsers, unfollowUser, followUser }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersAPI)