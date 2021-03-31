import Friends from './Friends/Friends'
import s from './Sidebar.module.css'


const Sidebar = props => {
    return (
      <nav className={s.navbar}>
          <ul>
              {props.sidebarLinks}
          </ul>
          <Friends friends={props.friends}/>
      </nav>
    )
}

export default Sidebar