import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from "redux"

export default compose(
    withAuthRedirect
)(Dialogs)