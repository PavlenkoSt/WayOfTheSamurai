import { ActionTypes } from './reduxStore';
import { AnyAction, Store } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { authUser } from './authReducer'

const SET_INITIALIZE = 'SET_INITIALIZE'

const initialValue = {
    initialized: false
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof appActions>

const appReducer = (state = initialValue, action:ActionType):InitialValueType => {
    switch(action.type){
        case SET_INITIALIZE: 
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const appActions = {
    setInitialize: () => ({ type: SET_INITIALIZE } as const)
}

export const initializeApp = (): ThunkAction<void, Store, unknown, AnyAction> => async (dispatch) => {
    await dispatch(authUser())
    dispatch(appActions.setInitialize())
}

export default appReducer