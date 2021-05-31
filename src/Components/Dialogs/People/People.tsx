import { FC } from 'react'
import { useSelector } from 'react-redux'
import { usersSelector } from '../../../Redux/selectors/dialogsSelectors'
import s from './People.module.css'
import User from './User/User'

const People: FC = () => {

    const users = useSelector(usersSelector)
    const usersElems = users.map( el => <User name={el.name} url={el.id} key={el.id}/> )
    
    return (
        <div className={s.people}>
            <ul>
                { usersElems }
            </ul>
        </div>
    )
}

export default People