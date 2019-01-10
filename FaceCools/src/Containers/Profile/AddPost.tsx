import * as React from 'react'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import * as postThunk from "../../Thunks/Posts";
import { IState } from '../../Models/State';
import AddPostForm from '../../Components/AddPostForm'
import { INewPost } from '../../Models/NewPostModel';

interface IAddPost {
    addPost: (post: INewPost) => void
    added: boolean
    error: string
}

class AddPost extends React.Component<IAddPost> {
    public render() {
        const { addPost, added, error } = this.props
        const successAlert = added ? <div className="alert alert-success" role="alert">{'Post añadido correctamente'}</div> : ''
        const errorAlert = error != '' ? <div className="alert alert-error" role="alert">{error}</div> : ''
        return (
            <div>
                <button 
                type="button" 
                className="btn mb-4 bnt-outline-info mr-4 rounded-circle " 
                style={{ zIndex: 1, position: 'fixed', bottom: '0px', right: '0px', backgroundColor: '#e3f2fd'}} 
                data-toggle="modal" 
                data-target='#Modal'>
                <img src={require('../../Utils/Images/add.ico')}/>
                </button>
                <div className="modal fade" id="Modal" tabIndex={-1} role="dialog" aria-labelledby="ModalLabel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLabel"> Subir un nuevo post </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className={'modal-body p-2'}>
                                <AddPostForm onSubmit={addPost}/>
                                <hr/>
                                {successAlert}
                                {errorAlert}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    const { Posts: { added, error } } = state
    return {
        added,
        error
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) =>
    bindActionCreators({
        ...postThunk
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)