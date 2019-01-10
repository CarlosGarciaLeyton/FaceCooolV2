import * as React from 'react'
import Post from '../../Components/Post'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { bindActionCreators } from 'redux'
import * as postThunk from "../../Thunks/Posts"
import { IPost } from '../../Models/PostsModel'
import { IState } from '../../Models/State'
import * as userThunk from "../../Thunks/Users"
import { auth } from '../../Services/Firebase'

interface INewsFeedProps {
    fetchPost: () => void
    loadUserInitialData: () => void
    like: (a: string) => void
    share: (a : string) => void
    fetched: boolean
    loading: boolean
    data: IPost
}

class NewsFeed extends React.Component<INewsFeedProps> {

    constructor(props: INewsFeedProps) {
        super(props)
        const { fetchPost, fetched } = props
        if (fetched) {
            return
        }
        fetchPost()
    }

    public componentWillMount = async() => {
        const { loadUserInitialData } = this.props
        if(!auth.currentUser) {
            window.location.href = '/'
        }
        await loadUserInitialData()
    }

    public render() {
        const { data } = this.props
        return (
            <div className={'container p-4 justify-content-center'}>
                {Object.keys(data).map(x => {
                    const post = data[x]
                    return <div key={x} className={'card shadow mr-auto ml-auto mb-4 '} >
                    <Post 
                            like={this.handleLike(x)}
                            share={this.handleShare(x)}
                            image={post.imageURL}
                            comment={post.comment}
                            likes={post.likes}
                            userName={post.userId}
                    />
                    </div>
                })}
            </div>
        );
    }

    private handleLike = (id: string) => () => {
        const { like, fetchPost } = this.props
        like(id)
        fetchPost()
    }
     private handleShare= (id: string) => () => {
        const { share } = this.props
        share(id)}
}

const mapStateToProps = (state: IState) => {
    const { 
        Posts: { data, fetched, fetching },
        Users: { user }
    } = state
    const { userName } = user
    const loading = fetching || fetched
    if (!auth.currentUser) {
        return
    }
    
    const peoplePost: IPost = Object.keys(data)
                                .filter(key => data[key].userId != userName)
                                .reduce((obj, key) => {
                                    obj[key] = data[key]
                                    return obj
                                },{} as IPost)
    return {
        fetched,
        loading,
        data: peoplePost
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => 
bindActionCreators({
    ...postThunk,
    ...userThunk
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);