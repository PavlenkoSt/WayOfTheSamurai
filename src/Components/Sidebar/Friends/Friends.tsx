import { FC } from 'react'
import Friend from './Friend/Friend'
import s from './Friends.module.css'
import { useSelector } from 'react-redux'
import { friendsSelector } from '../../../Redux/selectors/sidebarSelectors'


const Friends: FC = () => {
    const friends = useSelector(friendsSelector)
    const friendsElems = friends.map( friend => <Friend key={friend.id} name={friend.name}/>)

    return (
        <div>
            <h3 className={s.header}>Друзья</h3>
            <div className={s.friends}>
                {friendsElems}
            </div>
        </div>
    )
}

export default Friends