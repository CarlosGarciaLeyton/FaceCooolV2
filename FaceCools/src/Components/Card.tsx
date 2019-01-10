import * as React from 'react';

const Card: React.FunctionComponent = (props) => {
    const { children } = props;
    return (
        <div className={'card shadow'}>
            {children}
        </div>
    );
}


export default Card;