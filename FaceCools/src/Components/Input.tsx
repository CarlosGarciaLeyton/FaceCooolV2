import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

interface IInputProps {
    placeholder?: string
    label: string
}

const Input: React.FunctionComponent<WrappedFieldProps & IInputProps> = (props) => {
    const { input, label } = props
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">{label}</span>
            </div>
            <input {...input} {...props} className="form-control" />
        </div>
    )
}

export default Input;