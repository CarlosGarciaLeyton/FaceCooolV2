import * as React from 'react';

const Button: React.FunctionComponent = (props) => {
    return (
        <button {...props} className={'btn btn-outline-primary p-2'} />
    );
}

export default Button;