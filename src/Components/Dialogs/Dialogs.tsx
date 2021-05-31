import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import s from './Dialogs.module.css'
import Messages from './Messages/Messages'
import People from './People/People'

const Dialogs = () => {
    return (
        <div>
            <h2>Диалоги</h2>
            <div className={s.body}>
                <People />
                <Messages/>
            </div>
        </div>
    )
}


export default withAuthRedirect(Dialogs)