import * as React from 'react';
import { ILike } from '../Models/LikeModel';

interface IPostProps {
    image: string
    comment: string
    likes: ILike
    userName: string
    like: () => void
    share: () => void
}

const Post: React.FunctionComponent<IPostProps> = (props) => {
    const { image, like, share, comment, likes, userName } = props;
    const likeNumber: number = Object.keys(likes).length
    return (
        <div>
            <img className="card-img-top" src={image} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{userName}</h5>
                <h4 className="card-text">{comment}</h4>
                <hr/>
                <button type={'button'} className="btn btn-light mr-2 btn-sm" onClick={like}>
                    <img style={{ width: '35px', height: '35px' }} src={require('../Utils/Images/like.ico')} />
                    <span className="badge badge-light">{likeNumber}</span>
                </button>
                <button type={'button'} className="btn btn-light btn-sm" onClick={share}>
                    <img style={{ width: '35px', height: '35px' }} src={require('../Utils/Images/share.ico')} />
                </button>
            </div>
        </div>
    );
}

export default Post;