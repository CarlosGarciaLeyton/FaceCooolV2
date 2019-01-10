import * as React from 'react'
import {
  Field, InjectedFormProps, reduxForm, WrappedFieldInputProps, WrappedFieldProps
} from 'redux-form'
import { IProfileImage } from '../Models/ProfileImgModel';

interface ISubmitProps {
  submitIMGprofile: () => void
  profileImage: string
}

const handleChange = (submitIMGprofile: () => void, input: WrappedFieldInputProps) =>
  async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { onChange } = input
    const { files } = e.target
    if (files) {
      const file: File = files[0]
      await onChange(file)
      submitIMGprofile()
    }
  }

const RenderField: React.FunctionComponent<WrappedFieldProps & ISubmitProps> = ({ input, submitIMGprofile, profileImage }) => (
    <div>
      <input
        onChange={handleChange(submitIMGprofile, input)}
        type="file"
        accept={'.jpg'}
        className={'d-none'}
        id="profileImage"
        value=''
      />
      <label htmlFor="profileImage">
        <img src={profileImage} className={'rounded-circle'} style={{width: '200px', height: '200px'}} />
      </label>
    </div>
  );


const ImgProfile: React.FunctionComponent<InjectedFormProps<IProfileImage, ISubmitProps> & ISubmitProps> = (props) => {
    const { handleSubmit, submitIMGprofile, profileImage } = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="IMGprofile"
          profileImage={profileImage}
          component={RenderField}
          submitIMGprofile={submitIMGprofile}
        />
      </form>
    );
  }

export default reduxForm<IProfileImage, ISubmitProps>({
  form: "IMGprofile"
})(ImgProfile)

