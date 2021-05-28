import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import s from './Dialogs.module.css'
import MessagesContainer from './Messages/MessagesContainer'
import PeopleContainer from './People/PeopleContainer'

const Dialogs = () => {
    return (
        <div>
            <h2>Диалоги</h2>
            <div className={s.body}>
                <PeopleContainer />
                <MessagesContainer/>
            </div>
        </div>
    )
}


export default withAuthRedirect(Dialogs)