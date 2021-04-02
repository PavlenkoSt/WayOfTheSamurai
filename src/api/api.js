import * as axios from 'axios'

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
            return instance.get(`auth/me`)
                .then(responce => responce.data)
        },
        login(email, password, isRemember = false, captcha = null){
            return instance.post(`auth/login`, { email, password, isRemember, captcha })
                .then(responce => responce.data)
        },
        logout(){
            return instance.delete(`auth/login`)
                .then(responce => responce.data)
        }
    },
    users: {
        getUsers(usersCountOnPage, currentPage){
            return instance.get(`users?count=${usersCountOnPage}&page=${currentPage}`)
                .then(responce => responce.data)
        },
        follow(id){
            return instance.post(`follow/${id}`)
                .then(responce => responce.data)
        },
        unfollow(id){
            return instance.delete(`follow/${id}`)
                .then(responce => responce.data)
        },
    },
    profile: {
        getProfile(id){
            return instance.get(`profile/${id}`)
                .then(responce => responce.data)
        },
        getStatus(userId){
            return instance.get(`profile/status/${userId}`)
                .then(responce => responce.data)
        },
        updateStatus(status){
            return instance.put(`profile/status`, { status })
        },
        setPhoto(photo){
            const formData = new FormData()
            formData.append('image', photo)
            return instance.put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': `multipart/form-data`
                }
            })
        },
        editProfileInfo(profileInfo){
            return instance.put(`/profile`, profileInfo)
        }
    },
    security: {
        getCaptchaUrl(){
            return instance.get(`security/get-captcha-url`)
        }
    }
}

export default DAL