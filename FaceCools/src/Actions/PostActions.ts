import { FetchActionsTypes, PostActionTypes } from "../Utils/ActionTypes";
import { IPost } from "../Models/PostsModel";

const fetchStart = () => ({
    type: FetchActionsTypes.START
})

const fetchSuccess = (payload: IPost) => ({
    type: FetchActionsTypes.SUCCESS,
    payload
})

const fetchError = (error: string) => ({
    type: FetchActionsTypes.ERROR,
    error
})

const addPost = (payload: IPost) => ({
    type: PostActionTypes.ADD_POST,
    payload
})

export { fetchStart, fetchSuccess, fetchError, addPost };