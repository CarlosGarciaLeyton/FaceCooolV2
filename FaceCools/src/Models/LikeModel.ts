import { firestore } from 'firebase'

export interface ILike {
    [key: string] : ILikeData
}

export interface ILikeData {
    createdAt: firestore.Timestamp
    postId: string
    userId: string
}