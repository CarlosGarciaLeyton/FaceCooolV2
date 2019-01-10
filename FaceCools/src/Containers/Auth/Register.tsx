import * as React from 'react';
import Card from '../../Components/Card'
import Container from '../../Components/Container';
import Title from '../../Components/Title';
import RegisterForm from '../../Components/RegisterForm';
import { connect } from 'react-redux';
import { register as registerThunk } from '../../Thunks/Users';
import { ThunkDispatch } from 'redux-thunk';
import { IState } from '../../Models/State';
import { IUser } from '../../Models/UserModel';

interface IRegisterProps {
    register: (a: IUser) => void
    error: string
}

class Register extends React.Component<IRegisterProps> {

    public render() {
        const { register, error } = this.props
        const errorAlert = error != '' ?
            <div className="card-footer p-2">
                <div className={'alert alert-danger'} role="alert">
                    {error}
                </div>
            </div> : ''
        return (
            <Container>
                <div>
                    <Card>
                        <div className={'card-header'}>
                            <Title> Registro </Title>
                        </div>
                        <div className={'card-body'}>
                            <RegisterForm onSubmit={register} />
                        </div>
                        {errorAlert}
                    </Card>
                </div>
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
    register: (payload: IUser) => dispatch(registerThunk(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);