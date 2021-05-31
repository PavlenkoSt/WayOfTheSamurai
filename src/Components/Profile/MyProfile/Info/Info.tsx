import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProfileInfo } from '../../../../Redux/profileReducer'
import { ProfileType } from '../../../../types/types'
import ContactItem from './ContactItem/ContactItem'
import EdtiProfileForm from './EditProfileForm/EditProfileForm'
import s from './Info.module.css'
import InfoList from './InfoList/InfoList'
import Status from './Status/Status'

type InfoPropsType = {
    profile: ProfileType | any
    isOwner: boolean
    myId: string
}

const Info: FC<InfoPropsType> = ({ profile, myId, isOwner }) => {
    const [editMode, editModeChange] = useState(false)

    const dispatch = useDispatch()

    const links = () => {
        const keys = Object.keys(profile.contacts)
        return keys.map( social => <ContactItem key={social} social={social} link={profile.contacts[social]} />) 
    }

    const isNotEmptyContacts = Object.values(profile.contacts).some(val => val)

    const onSubmit = async (FormData: any) => {
        await dispatch(editProfileInfo(FormData, myId))
        editModeChange(false)
    }

    return (
        <div className={s.info}>
            <div className={s.name}>{ profile.fullName }</div>
            <Status 
                myId={myId} 
                isOwner={isOwner} 
            />
            {
                editMode 
                ? <EdtiProfileForm 
                    contacts={profile.contacts} 
                    initialValues={profile} 
                    onSubmit={onSubmit} 
                    editModeChange={editModeChange}
                /> 
                : <div> 
                    { isOwner && <button className={s.btn} onClick={ () => {editModeChange(true)}}>Редактировать информацию</button> }
                    <InfoList
                        aboutMe={profile.aboutMe}
                        lookingForAJob={profile.lookingForAJob}
                        lookingForAJobDescription={profile.lookingForAJobDescription}
                        isNotEmptyContacts={isNotEmptyContacts}
                        links={links}
                    />
                </div>
            }
        </div>
    )
}

export default Info