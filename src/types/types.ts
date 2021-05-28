export type PostsType = {
    id: number,
    message: string
}

export type ContactsForProfileType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosForProfileType = {
    small: string
    large: string
}

export type ProfileType = {
    userId?: number 
    lookingForAJob?: boolean 
    lookingForAJobDescription?: string 
    fullName?: string 
    contacts?: ContactsForProfileType 
    photos?: PhotosForProfileType 
}

export type GetUsersType = {
    totalCount: number
    items: Array<ProfileType>
    error: null | string
}

export type UserType = {
    name: string
    id: number
    photos: PhotosForProfileType
    status: string | null
    followed: boolean
}