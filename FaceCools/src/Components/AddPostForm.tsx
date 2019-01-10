import * as React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import Button from './Button';
import InputFile from './InputFile'
import { INewPost } from '../Models/NewPostModel';
import TextArea from './TextArea';

const AddPostForm: React.FunctionComponent<InjectedFormProps<INewPost>> = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name={'image'} component={InputFile}/>
            <Field placeholder={'Añade un comentario al post!'} name={'comment'} component={TextArea}/>
            <Button> Subir </Button>
        </form> 
    )
}

export default reduxForm<INewPost>({
    form: "addImg"
  })(AddPostForm)