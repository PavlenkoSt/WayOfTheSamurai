import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dialogsActions } from '../../../Redux/dialogsReducer'
import { messagesSelector } from '../../../Redux/selectors/dialogsSelectors'
import AddMessage from './AddMessage/AddMessage'
import Item from './Item/Item'

const Messages: FC = () => {

    const dispatch = useDispatch()

    const onSubmit = (message: any ) => {
        dispatch(dialogsActions.sendMessage(message.message))
    }

    const messages = useSelector(messagesSelector)
    const messagesElems = messages.map( el => <Item name={el.name} message={el.message} key={el.id}/> )

    return (
        <div>
            <ul>
                { messagesElems }
            </ul>
            <AddMessage onSubmit={onSubmit}/>
        </div>
    )
}

export default Messages