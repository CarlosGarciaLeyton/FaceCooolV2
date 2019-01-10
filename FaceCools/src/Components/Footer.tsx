import * as React from 'react';

const footer = {
    display: 'flex',
    backgroundColor: '#fac',
    marginLeft: '-15px',
    marginBottom: '-10px',
    width: 'calc(100% + 30px)'
} as React.CSSProperties

const button = {
    flex: '1',
    textAlign: 'center',
    padding: '10px 15px',
    cursor: 'pointer'
} as React.CSSProperties

interface iFooterProps {
    like: () => void
    share: () => void
}

const Footer: React.FunctionComponent<iFooterProps> = (props) => {
    const { like, share } = props
    return (
        <div style={footer}>
            <div style={button} onClick={like}>Like</div>
            <div style={button} onClick={share}>Compartir</div>
        </div>
    );
}

export default Footer;