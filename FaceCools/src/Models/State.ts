import { IPost } from './PostsModel'
import { IUser } from './UserModel';
import { ILike } from './LikeModel';

export interface IPosts {
  data: IPost
  fetched: boolean
  fetching: boolean
  added: boolean
  error: string
}

export interface IUsers {
  user: IUser
  error: string
}

export interface ILikes {
  likes: ILike
  fetched: boolean
  fetching: boolean
}

export interface IState {
  Posts: IPosts
  Users: IUsers
  Likes: ILikes
}
