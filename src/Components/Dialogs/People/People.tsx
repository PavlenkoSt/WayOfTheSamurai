import { FC } from 'react'
import s from './People.module.css'

type PeoplePropsType = {
    usersElements: React.ReactNode
}

const People: FC<PeoplePropsType> = props => {
    return (
        <div className={s.people}>
            <ul>
                { props.usersElements }
            </ul>
        </div>
    )
}

export default People