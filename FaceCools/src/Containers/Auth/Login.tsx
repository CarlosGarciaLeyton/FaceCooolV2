import * as React from 'react'
import { connect } from 'react-redux'
import Card from '../../Components/Card'
import Container from '../../Components/Container'
import Title from '../../Components/Title'
import LoginForm from '../../Components/LoginForm'
import { login as loginThunk } from '../../Thunks/Users'
import { ILogin } from '../../Models/LoginModel'
import { ThunkDispatch } from 'redux-thunk'
import { IState } from '../../Models/State'

interface ILoginProps {
    login: (a: ILogin) => void
    error: string
}

class Login extends React.Component<ILoginProps> {

    public render() {
        const { login, error } = this.props
        const errorAlert = error != '' ?
            <div className="card-footer p-2">
                <div className={'alert alert-danger'} role="alert">
                    {error}
                </div>
            </div> : ''
        return (
            <Container>
                <Card>
                    <div className={'card-header'}>
                        <Title> Inicio de Sesión </Title>
                    </div>
                    <div className={'card-body'}>
                        <LoginForm onSubmit={login} />
                    </div>
                    {errorAlert}
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => {
    const { Users: { error } } = state
    return {
        error
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    login: (payload: ILogin) => dispatch(loginThunk(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
