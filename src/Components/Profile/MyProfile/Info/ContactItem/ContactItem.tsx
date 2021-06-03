import { FC } from 'react'
import s from './ContactItem.module.scss'

type ContactItemPropsType = {
    social: string
    link: string
}

const ContactItem: FC<ContactItemPropsType> = ({social, link}) => {
    if(!link){
        return null
    }
    return (
        <li className={s.li}> {social}: <a className={s.link} href={link}>{link}</a></li> 
    )
}

export default ContactItem