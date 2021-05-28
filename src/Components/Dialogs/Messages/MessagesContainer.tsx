import Item from './Item/Item'
import Messages from './Messages'
import {connect} from 'react-redux'
import { dialogsActions} from '../../../Redux/dialogsReducer'
import { AppStateType } from '../../../Redux/reduxStore'

type MapStatePropsType = {
    messagesElements: JSX.Element[]
}

type MapDispatchProps = {
    sendMessage: (message: string) => void
}

const MapStateToProps = (state: AppStateType) => {
    return {
        messagesElements: state.dialogsPage.messages.map( el => <Item name={el.name} message={el.message} key={el.id}/> ),
    }
}

export default connect<MapStatePropsType, MapDispatchProps, {}, AppStateType>(MapStateToProps, {sendMessage: dialogsActions.sendMessage})(Messages)