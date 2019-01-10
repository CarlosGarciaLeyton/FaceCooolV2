import { UserActionTypes } from "../Utils/ActionTypes";
import { IUser } from "../Models/UserModel";

const setProfileImage = (payload: string) => ({
    type: UserActionTypes.SET_PROFILE_IMAGE,
    payload 
})

const loadUserData = (payload: IUser) => ({
    type: UserActionTypes.LOAD_USER_DATA,
    payload
})

const userError = (error: string) => ({
    type: UserActionTypes.USER_ERROR,
    error
})

const userStart = () => ({
    type: UserActionTypes.USER_START
})

export { setProfileImage, loadUserData, userError, userStart }