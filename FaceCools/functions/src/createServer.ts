import * as express from 'express'
import * as admin from 'firebase-admin'

interface IRequest extends express.Request {
    user: {
        uid: string
        email: string
        role: string
        userName: string
    }
}

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const auth = admin.auth()

export default () => {
    const app = express()
    app.use(async (req, res, next) => {
        const token = req.headers.authorization
        try {
            const { uid, email } = await auth.verifyIdToken(token)
            const snap = await db.collection('users').doc(uid).get()
            const user = snap.data()
            Object.assign(req, {
                user: {
                    ...user,
                    uid,
                    email,
                }
            })
            next()
        } catch (error) {
            res.status(403).send('Error al Autorizar')
        }
    })


    app.get(`/api/posts/:postId/like`, async (req: IRequest, res) => {
        const { userName } = req.user
        const { postId } = req.params
        
        const snaps = await db.collection('likes')
            .where('userId', '==', userName)
            .where('postId', '==', postId)
            .limit(1)
            .get()
        const result: { id?: string } = {}
        snaps.forEach(x => Object.assign(result, { ...x.data(), id: x.id }))
        if (result.id) {
            await db.collection('likes').doc(result.id).delete()
        }
        if (!result.id) {
            await db.collection('likes').doc().set({
                userId: userName,
                postId,
                createdAt: new Date(),
            })
        }

        res.sendStatus(204)
    })

    app.get(`/api/posts/:postId/share`, async (req: IRequest, res) => {
        const { userName } = req.user
        const { postId } = req.params

        const snap = await db.collection('posts').doc(postId).get()
        const post = snap.data()

        const result = await db.collection('posts').add({
            ...post,
            userId: userName,
            comment: 'Compartido de ' + post.userId, 
            createdAt: new Date()
        })

        res.send({ id: result.id })
    })

    app.get(`/api/posts/add`, async (req: IRequest, res) => {
        const { userName } = req.user

        const result = await db.collection('posts').add({
            userId: userName,
            createdAt: new Date()
        }).catch(() => console.error('No crea bien!'))
        if(!result) {
            res.send(404)
            return
        }
        res.send({ id: result.id })
    })

    return app
}
