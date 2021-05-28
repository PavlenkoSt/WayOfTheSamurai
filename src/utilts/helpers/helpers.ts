export const changeFollowedStatus = (usersArr: any, actionId: any, followedStatus: any) => {
    return usersArr.map((user: any) => {
        if(user.id === actionId){
            user.followed = followedStatus
        }
        return user
    })
}