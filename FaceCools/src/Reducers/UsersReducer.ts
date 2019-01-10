import { AnyAction } from "redux";
import { UserActionTypes } from "../Utils/ActionTypes";
import { IUser } from "../Models/UserModel";
import { IUsers } from "../Models/State";

const user: IUser = {
    email: '',
    lastName: '',
    name: '',
    password: '',
    userName: ''
}

const initialState: IUsers = {
    user: user,
    error: ''
}

export default function reducer(state: IUsers = initialState, action: AnyAction) {
    switch (action.type) {
        case UserActionTypes.USER_START: 
            return {
                ...state,
                error: ''
            }
        case UserActionTypes.SET_PROFILE_IMAGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImage: action.payload
                }
            }
        case UserActionTypes.LOAD_USER_DATA:
            return {
                ...state,
                user: {
                    ...action.payload
                    }
            }
        case UserActionTypes.USER_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}