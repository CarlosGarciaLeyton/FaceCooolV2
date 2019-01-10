import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { IState } from '../Models/State'

const style = {
    backgroundColor: '#e3f2fd',
} as React.CSSProperties

interface INavBarProps {
    profileImage: string
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
    const { profileImage } = props

    return (
        <nav style={style} className={'navbar sticky-top navbar-light'}>
            <Link to='/app/newsfeed'>
                <img className={'md-2 align-baseline'} style={{ width: '35px', height: '35px' }} src={require('../Utils/Images/logo.ico')} />
                <span className={'navbar-brand align-bottom'}> FaceCool </span>
            </Link>
            <Link to='/app/profile' className={'nav-item nav-link float-right'} >
                <img className={'md-2 align-baseline rounded-circle'} style={{ width: '40px', height: '40px' }} src={profileImage} />
            </Link>
        </nav>
    );
}

const mapStateToProps = (state: IState) => {
    const { Users: { user } } = state
    const { profileImage: pi } = user
    const profileImage = pi || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    return {
        profileImage
    }
}


export default connect(mapStateToProps)(NavBar);