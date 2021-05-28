import Link from './Link/Link'
import Sidebar from './Sidebar'
import { connect } from 'react-redux'
import { AppStateType } from '../../Redux/reduxStore'

const MapStateToProps = (state: AppStateType) => {
    return {
        sidebarLinks: state.sidebar.links.map( link => <Link key={link.id} to={link.url} text={link.text} /> ),
        friends: state.sidebar.friends
    }
}

const SidebarContainer = connect(MapStateToProps)(Sidebar)

export default SidebarContainer