import React, { FC, ReactNode } from 'react'
import Friends from './Friends/Friends'
import s from './Sidebar.module.css'
import { FriendsType } from '../../Redux/sidebarReducer'

type SidebarPropsType = {
    sidebarLinks: ReactNode
    friends: Array<FriendsType>
}

const Sidebar: FC<SidebarPropsType> = props => {
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