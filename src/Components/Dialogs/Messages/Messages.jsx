import AddMessageContainer from './AddMessage/AddMessageContainer';
import s from './Messages.module.css'

const Messages = props => {
    return (
        <div>
            <ul>
                { props.messagesElements }
            </ul>
            <AddMessageContainer newMessageText={props.newMessageText} sendMessage={props.sendMessage}/>
        </div>
    )
}

export default Messages