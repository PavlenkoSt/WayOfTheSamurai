import Link from './Link/Link'
import Sidebar from './Sidebar'
import { connect } from 'react-redux'

const MapStateToProps = state => {
    return {
        sidebarLinks: state.sidebar.links.map( link => <Link key={link.id} to={link.url} text={link.text} /> ),
        friends: state.sidebar.friends
    }
}

const MapDispatchToProps = dispatch => {
    return {
        
    }
}

const SidebarContainer = connect(MapStateToProps, MapDispatchToProps)(Sidebar)

export default SidebarContainer