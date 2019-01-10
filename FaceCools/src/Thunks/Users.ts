import { Dispatch } from "redux";
import { IServices } from '../Services'
import { ILogin } from '../Models/LoginModel';
import * as UserActions from '../Actions/UserActions'
import { IState } from "../Models/State";
import { IProfileImage } from "../Models/ProfileImgModel";
import { IUser } from "../Models/UserModel";



export const login = ({ email, password }: ILogin) => async (dispatch: Dispatch, getState: () => IState, { auth }: IServices) => {
    dispatch(UserActions.userStart())
    await auth.signInWithEmailAndPassword(email, password).catch(
        (e: Error) => {
            console.log(e.message)
            dispatch(UserActions.userError(e.message))
            return
        })
}

export const register = ({ email, password, userName, lastName, name }: IUser) => async (dispatch: Dispatch, getState: () => IState, { auth, db }: IServices) => {
    dispatch(UserActions.userStart())
    const userCredential = await auth.createUserWithEmailAndPassword(email, password).catch(
        (e: Error) => { 
            dispatch(UserActions.userError(e.message))
            return
        })
    if(!userCredential) {
        return
    }
    const { user } = userCredential
    const id = user ? user.uid : undefined
    const doc = db.collection('users').doc(id)
    await doc.set({
        role: 'user',
        userName: '@' + userName,
        name: name,
        lastName: lastName,
    })
    window.location.href = '/'
}

export const loadUserInitialData = () =>
    async (dispatch: Dispatch, getState: IState, { auth, storage, db }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const storageRef = storage.ref()
        const currentUser = auth.currentUser
        const { uid } = currentUser
        const { email } = currentUser
        const imageRef = storageRef
            .child('profileImages')
            .child(`${uid}.jpg`)
        const url = await imageRef.getDownloadURL().catch( () => console.error('No tiene imagen de perfil') )
        const snap = await db.collection('users').doc(uid).get()
        const userData = snap.data()
        if(userData) {
            const user: IUser = {
                email: email ? email : '',
                name: userData.name,
                lastName: userData.lastName,
                password: '',
                userName: userData.userName,
                profileImage: url
            }
            dispatch(UserActions.loadUserData(user))
        }
    }

export const handleProfileImageSubmit = (profileImage: IProfileImage) =>
    async (dispatch: Dispatch, getState: () => IState, { auth, storage }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        if(!profileImage.IMGprofile.type.match('image/jpeg') ) {
            console.error('Formato de imagen de perfil incorrecto')
            return
        }
        const storageRef = storage.ref()
        const { uid } = auth.currentUser
        const response = await storageRef
            .child('profileImages')
            .child(`${uid}.jpg`)
            .put(profileImage.IMGprofile)

        const url = await response.ref.getDownloadURL()
        dispatch(UserActions.setProfileImage(url))
    }