import s from './People.module.css'

const People = props => {
    return (
        <div className={s.people}>
            <ul>
                { props.usersElements }
            </ul>
        </div>
    )
}

export default People