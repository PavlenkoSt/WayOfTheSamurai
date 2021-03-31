export const changeFollowedStatus = (usersArr, actionId, followedStatus) => {
    return usersArr.map(user => {
        if(user.id === actionId){
            user.followed = followedStatus
        }
        return user
    })
}