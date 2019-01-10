import * as React from 'react';

const style = {
    color: '#555'
}

const Title: React.FunctionComponent = (props) => {
    return (
        <h2 {...props} className={'h2 text-center'} />
    );
}

export default Title;