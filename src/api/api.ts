import { FilteredOptionsType } from './../Redux/usersReducer';
import { ProfileType, PhotosForProfileType } from './../types/types';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a149094e-a55f-407f-83ce-762f3cd3f906'
    }
})

const DAL = {
    auth: {
        authMy(){
            return instance.get<BaseResponceType<AuthMeDataResponceType>>(`auth/me`).then(responce => responce.data)
        },
        login(email?: string, password?: string, isRemember = false, captcha: string | null = null){
            return instance.post<BaseResponceType>(`auth/login`, { email, password, isRemember, captcha }).then(responce => responce.data)
        },
        logout(){
            return instance.delete<BaseResponceType>(`auth/login`).then(responce => responce.data)
        }
    },
    users: {
        getUsers(usersCountOnPage: number, currentPage: number, filteredOptions: FilteredOptionsType){
            const term = filteredOptions.term ? `&term=${filteredOptions.term}` : ''
            return instance.get<UsersType>(`users?count=${usersCountOnPage}&page=${currentPage}${term}`).then(responce => responce.data)
        },
        follow(id: number){
            return instance.post<BaseResponceType>(`follow/${id}`).then(responce => responce.data)
        },
        unfollow(id: number){
            return instance.delete<BaseResponceType>(`follow/${id}`).then(responce => responce.data)
        },
    },
    profile: {
        getProfile(id: any){
            return instance.get<ProfileType>(`profile/${id}`).then(responce => responce.data)
        },
        getStatus(userId: any){
            return instance.get<string>(`profile/status/${userId}`).then(responce => responce.data)
        },
        updateStatus(status: string){
            return instance.put<BaseResponceType>(`profile/status`, { status })
        },
        setPhoto(photo: File){
            const formData = new FormData()
            formData.append('image', photo)
            return instance.put<BaseResponceType<any>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': `multipart/form-data`
                }
            })
        },
        editProfileInfo(profileInfo: ProfileType){
            return instance.put<any>(`/profile`, profileInfo)
        }
    },
    security: {
        getCaptchaUrl(){
            return instance.get<CaptchaResponseType>(`security/get-captcha-url`)
        }
    }
}

export default DAL


type BaseResponceType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
}

type AuthMeDataResponceType = {
    id: number
    email: string
    login: string
}

type UserType = {
    name: string
    id: number
    photos: PhotosForProfileType
    status: string
    followed: boolean
}

type UsersType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type CaptchaResponseType = {
    url: string
}

export enum ResultCodeEnum {
    success = 0,
    error = 1
}

export enum CaptchaEnum {
    captcha = 10
}
