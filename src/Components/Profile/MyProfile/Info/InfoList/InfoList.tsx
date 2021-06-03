import React, { FC, ReactNode } from 'react'
import s from './InfoList.module.scss'

type InfoListPropsType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    isNotEmptyContacts: boolean
    links: () => ReactNode
}

const InfoList: FC<InfoListPropsType> = ({ aboutMe, lookingForAJob, lookingForAJobDescription, isNotEmptyContacts, links }) => {
    return (
        <ul>
            <li>Обо мне: <span className={s.point}>{aboutMe}</span> </li>
            <li>Ищу работу: <span className={s.point}>{lookingForAJob ? 'Да' : 'Нет'}</span> </li>
            { lookingForAJob && <li> Профессиональные навыки: <span className={s.point}>{lookingForAJobDescription}</span> </li>}
            <li>
                { isNotEmptyContacts && 
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
    )
}

export default InfoList
