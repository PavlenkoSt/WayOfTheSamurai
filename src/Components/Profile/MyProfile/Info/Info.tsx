import { FC, FormEventHandler, useState } from 'react'
import { ProfileType } from '../../../../types/types'
import ContactItem from './ContactItem/ContactItem'
import EdtiProfileForm from './EditProfileForm/EditProfileForm'
import s from './Info.module.css'
import Status from './Status/Status'

type InfoPropsType = {
    profile: ProfileType | any
    isOwner: boolean
    myId: string
    status: string 
    updateStatus: (status: string, myId: string) => void
    editProfileInfo: (profileInfo: ProfileType, myId: string) => any

}

const Info: FC<InfoPropsType> = props => {
    const [editMode, editModeChange] = useState(false)

    const links = () => {
        const keys = Object.keys(props.profile.contacts)
        return keys.map( social => <ContactItem key={social} social={social} link={props.profile.contacts[social]} />) 
    }

    const isEmptyContacts = Object.values(props.profile.contacts).some(val => val)

    const onSubmit = (FormData: any) => {
        props.editProfileInfo(FormData, props.myId).then( () => editModeChange(false) )
    }

    return (
        <div className={s.info}>
            <div className={s.name}>{ props.profile.fullName }</div>
            <Status myId={props.myId} isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
            {
                editMode 
                ? <EdtiProfileForm contacts={props.profile.contacts} initialValues={props.profile} onSubmit={ onSubmit } editModeChange={editModeChange}/> 
                : <div> 
                    { props.isOwner && <button className={s.btn} onClick={ () => {editModeChange(true)}} >Редактировать информацию</button> }
                    <ul>
                        <li>Обо мне: <span className={s.point}>{props.profile.aboutMe}</span> </li>
                        <li>Ищу работу: <span className={s.point}>{props.profile.lookingForAJob ? 'Да' : 'Нет'}</span> </li>
                        { props.profile.lookingForAJob && <li> Профессиональные навыки: <span className={s.point}>{props.profile.lookingForAJobDescription}</span> </li>}
                        <li>
                            { isEmptyContacts && 
                            (
                                <div>
                                    <b>Контакты:</b>
                                    <ul className={s.contacts}>
                                        {
                                            links()
                                        }
                                    </ul>
                                </div>
                            )
                            }
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Info