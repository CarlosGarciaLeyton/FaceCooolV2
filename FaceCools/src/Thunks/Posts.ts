import { Dispatch } from "redux";
import * as PostActions from '../Actions/PostActions'
import { IServices } from '../Services'
import { IPost } from "../Models/PostsModel";
import { download } from "../Utils/Utils";
import { IState } from "../Models/State";
import { INewPost } from '../Models/NewPostModel'
import { ILike } from "../Models/LikeModel";

export const fetchPost = () =>
    async (dispatch: Dispatch, getState: () => IState, { db, storage }: IServices) => {
        dispatch(PostActions.fetchStart())
        try {
            const snaps = await db.collection('posts').get()
            const posts: any = {}
            snaps.forEach(x => posts[x.id] = x.data())

            const imgIds = await Promise.all(Object.keys(posts)
                .map(async x => {
                    const ref = storage.ref(`posts/${x}.jpg`)
                    const url = await ref.getDownloadURL()
                    return [x, url]
                }))

            const keyedImages: any = {}
            imgIds.forEach(x => keyedImages[x[0]] = x[1])

            const snapsLike = await db.collection('likes').get()
            const likes: any = {}
            snapsLike.forEach(x => likes[x.id] = x.data())


            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageURL: keyedImages[x],
                likes: Object.keys(likes)
                    .filter(key => likes[key].postId === x)
                    .reduce((obj, key) => {
                        obj[key] = likes[key]
                        return obj
                    }, {} as ILike)
            })
            dispatch(PostActions.fetchSuccess(posts))

        } catch (error) {
            dispatch(PostActions.fetchError(error))
        }
    }

export const like = (id: string) =>
    async (dispatch: Dispatch, getState: () => IState, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        const path = `/api/posts/${id}/like`
        await fetch(path, {
            headers: {
                authorization: token
            }
        })
    }

export const share = (id: string) =>
    async (dispatch: Dispatch, getState: () => IState, { auth, db, storage }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        const path = `/api/posts/${id}/share`
        const result = await fetch(path, {
            headers: {
                authorization: token
            }
        })

        const url = await storage.ref(`posts/${id}.jpg`).getDownloadURL()
        const blob = await download(url).catch(() => console.error('error a la descarga de la imagen'))
        const { id: postId }: { id: string } = await result.json().catch(() => console.error('error a la subida'))
        const ref = storage.ref(`posts/${postId}.jpg`)
        await ref.put(blob)
        const imageURL = await ref.getDownloadURL()
        const snap = await db.collection('posts').doc(postId).get()

        dispatch(PostActions.addPost({
            [snap.id]: {
                ...snap.data(),
                imageURL
            }
        } as IPost))
    }

export const addPost = (post: INewPost) =>
    async (dispatch: Dispatch, getState: () => IState, { auth, db, storage }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        if (!post.image.type.match('image/jpeg')) {
            dispatch(PostActions.fetchError('Error! El formato de la imagen no es correcto.'))
            return
        }
        dispatch(PostActions.fetchStart())
        try {
            const token = await auth.currentUser.getIdToken()
            const path = `/api/posts/add`
            const result = await fetch(path, {
                headers: {
                    authorization: token,
                }
            }).catch((error) => console.error(error))
            if (result) {
                const { id: postId }: { id: string } = await result.json().catch(() => console.error('falla el json de envio'))
                const ref = storage.ref(`posts/${postId}.jpg`)
                await ref.put(post.image)
                const imageURL = await ref.getDownloadURL().catch()
                await db.collection('posts').doc(postId).update({
                    comment: post.comment ? post.comment : ''
                })
                const snap = await db.collection('posts').doc(postId).get().catch()

                dispatch(PostActions.addPost({
                    [snap.id]: {
                        ...snap.data(),
                        imageURL,
                        comment: post.comment
                    }
                } as IPost))
            }
        } catch (error) {
            dispatch(PostActions.fetchError('falla'))
        }

    }
