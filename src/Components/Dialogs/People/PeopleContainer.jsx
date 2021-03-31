import User from './User/User'
import People from './People'
import { connect } from 'react-redux'

const MapStateToProps = state => {
    return {
        usersElements: state.dialogsPage.users.map( el => <User name={el.name} url={el.id} key={el.id}/> )
    }
}

const PeopleContainer = connect(MapStateToProps)(People)

export default PeopleContainer