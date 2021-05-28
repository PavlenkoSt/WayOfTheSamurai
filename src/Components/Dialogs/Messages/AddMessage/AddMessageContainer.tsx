import { FC } from 'react'
import AddMessage from './AddMessage'

type OwnProperty = {
    sendMessage: (message: string) => void
}

const AddMessageContainer: FC<OwnProperty> = props => {

    const onSubmit = (message: any ) => {
        props.sendMessage(message.message)
    }

    return (
        <AddMessage onSubmit={onSubmit} />
    )
}

export default AddMessageContainer
