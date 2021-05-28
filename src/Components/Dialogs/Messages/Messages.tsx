import { FC } from 'react';
import AddMessageContainer from './AddMessage/AddMessageContainer';
import s from './Messages.module.css'

type MessagesPropsType = {
    messagesElements: React.ReactNode
    sendMessage: (message: string) => void
}

const Messages: FC<MessagesPropsType> = props => {
    return (
        <div>
            <ul>
                { props.messagesElements }
            </ul>
            <AddMessageContainer sendMessage={props.sendMessage}/>
        </div>
    )
}

export default Messages