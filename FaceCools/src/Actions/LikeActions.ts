import { FetchActionsTypes, LikeActionTypes } from "../Utils/ActionTypes";
import { ILike } from "../Models/LikeModel";

const fetchStart = () => ({
    type: FetchActionsTypes.START
})

const fetchLikes = (payload: ILike) => ({
    type: FetchActionsTypes.SUCCESS,
    payload
})

const addLike = (payload: ILike) => ({
    type: LikeActionTypes.ADD_LIKE,
    payload
})

export { fetchStart, fetchLikes, addLike }