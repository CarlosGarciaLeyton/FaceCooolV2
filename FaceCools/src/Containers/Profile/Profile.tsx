import * as React from 'react';
import ImgProfile from '../../Components/ImgProfile';
import { IPostData } from '../../Models/PostsModel';
import { chunk } from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postThunk from "../../Thunks/Posts";
import * as userThunk from "../../Thunks/Users";
import { ThunkDispatch } from 'redux-thunk';
import services from '../../Services'
import { submit } from 'redux-form'
import { IState } from '../../Models/State';
import { IProfileImage } from '../../Models/ProfileImgModel';
import { ILike } from '../../Models/LikeModel';

const { auth } = services

interface IProfileProps {
    fetchPost: () => void
    loadUserInitialData: () => void
    submitIMGprofile: () => void
    handleProfileImageSubmit: (file: IProfileImage) => void
    fetched: boolean
    loading: boolean
    data: IPostData[][]
    profileImage: string
    fullName: string
    email: string
    userName: string
}


class Profile extends React.Component<IProfileProps> {

    constructor(props: IProfileProps) {
        super(props)
        const { fetchPost, fetched } = props
        if (fetched) {
            return
        }
        fetchPost()
    }

    public componentWillMount = async () => {
        const { loadUserInitialData } = this.props
        if(!auth.currentUser) {
            window.location.href = '/'
        }
        await loadUserInitialData()
    }

    public render() {
        const { data, submitIMGprofile, handleProfileImageSubmit, profileImage, fullName, email, userName } = this.props
        return (
            <div className={'container p-4 bg-light'}>
                <div className={'container d-flex mb-5'}>
                    <ImgProfile
                        onSubmit={handleProfileImageSubmit}
                        submitIMGprofile={submitIMGprofile}
                        profileImage={profileImage} />
                    <div className={'d-block'}>
                    <h3 className={'h3 ml-5 mt-5'}>{fullName}</h3>
                    <hr/>
                    <h5 className={'h5 ml-5 mt-2'}> Nombre de usuario: <text className={'text-primary'}>{userName}</text></h5>
                    <h6 className={'h6 ml-5 mt-2'}> Email de contacto: <text className={'text-info'}>{email}</text></h6>
                    </div>
                </div>
                <div className={'container'}>
                    {data.map((x, i) =>
                        <div key={i} className={'row'}>
                            {x.map(y =>
                                <div className={'col m-1'} key={y.imageURL}>
                                    <img className={'rounded card-img'} alt={'Responsive image'} src={y.imageURL} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    const { Posts: { data, fetched, fetching } } = state
    const { Users: { user } } = state
    const { profileImage: pi, userName, name, lastName, email } = user

    const profileImage = pi || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    const loading = fetching || fetched
    const fullName = name + ' ' + lastName

    const filtered = Object.keys(data).reduce((acc, el) => {
        if (data[el].userId !== userName) {
            return acc
        }
        return acc.concat(data[el])
    }, [] as IPostData[])

    return {
        fetched,
        loading,
        data: chunk(filtered, 3),
        profileImage,
        userName,
        fullName,
        email
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators({
    ...postThunk,
    ...userThunk,
    submitIMGprofile: () => submit('IMGprofile')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile);