import s from './ContactItem.module.css'

const ContactItem = ({social, link}) => {
    if(!link){
        return null
    }
    return (
        <li className={s.li}> {social}: <a className={s.link} href={link}>{link}</a></li> 
    )
}

export default ContactItem