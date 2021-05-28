import DAL from "../api/api"
import { getProfile, profileActions } from "./profileReducer"

jest.mock('../api/api')
const mockedDAL = DAL as jest.Mocked<typeof DAL>


it('thunk should be return profile', async () => {
    const thunk = getProfile(0, '2')
    const dispatchMock = jest.fn()

    const result = {
        resultCode: 0,
        errors: [],
        data: {
            profile: 'some profile data'
        }
    }

    //@ts-ignore
    mockedDAL.profile.getProfile.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, jest.fn(), {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(profileActions.getUserProfile(result))
})