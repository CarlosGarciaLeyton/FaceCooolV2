import { firestore } from 'firebase'
import { ILike } from './LikeModel'

export interface IPost {
    [key: string]: IPostData
}

export interface IPostData {
    comment: string
    userId: string
    createdAt: firestore.Timestamp
    imageURL: string
    likes: ILike
}