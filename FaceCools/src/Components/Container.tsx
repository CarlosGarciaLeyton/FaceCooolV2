import * as React from 'react';


const style = ({
    height: 'calc(100vh - 20px)',
    width: 'calc(100vw - 30px)',
}) as React.CSSProperties

const Container: React.FunctionComponent = (props) => {
    const { children } = props;
    return (
        <div style={style} className={'container p-4 d-flex justify-content-center align-items-center'}>
            {children}
        </div>
    );
}

export default Container;