import profileReducer, {addNewPost, getUserProfile, setStatus, removePost} from './profileReducer'

const state = {
    posts: [
        {id: 1, message: "Привет, это новая социальная сеть! Ура!"},
        {id: 2, message: "Почему меня никто не любит?"},
    ],
    userProfile: null,
    status: ''
}

it('posts lenth should be increment', () => {
    const action = addNewPost('test')
    const modernizedStatePosts = profileReducer(state, action)
    expect(modernizedStatePosts.posts.length).toBe(3)
})

it('added post text should be correct', () => {
    const action = addNewPost('test')
    const modernizedStatePosts = profileReducer(state, action)
    expect(modernizedStatePosts.posts[2].message).toBe('test')
})

it('posts length should be decrement', () => {
    const action = removePost(1)
    const modernizedStatePosts = profileReducer(state, action)
    expect(modernizedStatePosts.posts.length).toBe(1)
})

it('posts length shoudnt be changed', () => {
    const action = removePost(1000)
    const modernizedStatePosts = profileReducer(state, action)
    expect(modernizedStatePosts.posts.length).toBe(2)
})

it('userProfile should be setted', () => {
    const action = getUserProfile('Marinka')
    const modernizedStateUserProfile = profileReducer(state, action)
    expect(modernizedStateUserProfile.userProfile).toBe('Marinka')
})

it('status should be setted', () => {
    const action = setStatus('its status')
    const modernizedStateStatus = profileReducer(state, action)
    expect(modernizedStateStatus.status).toBe('its status')
})