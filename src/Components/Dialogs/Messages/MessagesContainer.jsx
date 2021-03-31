import Item from './Item/Item'
import Messages from './Messages'
import {connect} from 'react-redux'
import {sendMessage} from '../../../Redux/dialogsReducer'

const MapStateToProps = state => {
    return {
        messagesElements: state.dialogsPage.messages.map( el => <Item name={el.name} message={el.message} key={el.id}/> ),
        newMessageText: state.dialogsPage.newMessageText
    }
}

const MapDispatchToProps = {sendMessage}

export default connect(MapStateToProps, MapDispatchToProps)(Messages)