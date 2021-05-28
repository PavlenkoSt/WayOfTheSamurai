import User from './User/User'
import People from './People'
import { connect } from 'react-redux'
import { AppStateType } from '../../../Redux/reduxStore'

const MapStateToProps = (state: AppStateType) => ({
    usersElements: state.dialogsPage.users.map( el => <User name={el.name} url={el.id} key={el.id}/> )
})

export default connect(MapStateToProps)(People)

 