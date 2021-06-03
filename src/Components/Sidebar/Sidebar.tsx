import React, { FC } from 'react'
import Friends from './Friends/Friends'
import s from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import {  linksSelector } from '../../Redux/selectors/sidebarSelectors'
import Link from './Link/Link'

const Sidebar: FC = () => {

    const links = useSelector(linksSelector)
    const linksElems = links.map( link => <Link key={link.id} to={link.url} text={link.text} /> )

    return (
      <nav className={s.navbar}>
          <ul>
              {linksElems}
          </ul>
          <Friends/>
      </nav>
    )
}

export default Sidebar