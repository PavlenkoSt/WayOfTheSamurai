import AddMessage from './AddMessage'

const AddMessageContainer = props => {
    const onSubmit = message => {
        props.sendMessage(message.message)
    }
    return (
        <AddMessage onSubmit={onSubmit} />
    )
}

export default AddMessageContainer
