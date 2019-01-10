import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

const TextArea: React.FunctionComponent<WrappedFieldProps> = (props) => {
    const { input } = props
    return (
        <textarea {...input} {...props} className={'form-control mb-3'} rows={4} />
    );
}

export default TextArea;