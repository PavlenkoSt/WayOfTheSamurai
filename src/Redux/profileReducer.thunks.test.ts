import DAL from "../api/api"
import { editProfileInfo, getProfile, getUserStatus, profileActions, setPhoto, updateStatus } from "./profileReducer"

jest.mock('../api/api')
const mockedDAL = DAL as jest.Mocked<typeof DAL>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


it('getProfile thunk', async () => {
    const thunk = getProfile(0, '2')

    const result = {
        resultCode: 0,
        errors: [],
        data: {
            profile: 'some profile data'
        }
    }

    //@ts-ignore
    mockedDAL.profile.getProfile.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(profileActions.getUserProfile(result))
})

it('getUserStatus thunk', async () => {
    const thunk = getUserStatus(0, '2')

    const result = 'some status'

    //@ts-ignore
    mockedDAL.profile.getStatus.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(profileActions.setStatus(result))
})

it('updateStatus thunk', async () => {
    const thunk = updateStatus('some status', '1')

    const result = {
        errors: [],
        data: {
            profile: 'some profile data',
            resultCode: 0
        }
    }

    //@ts-ignore
    mockedDAL.profile.updateStatus.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(profileActions.setStatus('some status'))
})

it('setPhoto thunk', async () => {
    const thunk = setPhoto('some photo file')

    const result = {
        errors: [],
        data: {
            data: {
                photos: 'some photo file'
            },
            resultCode: 0
        }
    }

    //@ts-ignore
    mockedDAL.profile.setPhoto.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)

    //@ts-ignore
    expect(dispatchMock).toHaveBeenCalledWith(profileActions.setPhotoSuccess('some photo file'))
})

it('editProfileInfo thunk', async () => {
    const thunk = editProfileInfo({}, '2')

    const result = {
        errors: [],
        data: {
            data: {},
            resultCode: 0
        }
    }

    //@ts-ignore
    mockedDAL.profile.getProfile.mockReturnValue(Promise.resolve(result))
    //@ts-ignore
    mockedDAL.profile.editProfileInfo.mockReturnValue(Promise.resolve({data: { resultCode: 0 }}))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(profileActions.getUserProfile(result))
})