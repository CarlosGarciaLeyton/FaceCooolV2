import * as React from 'react'
import Input from './Input'
import Button from './Button'
import { Link } from 'react-router-dom'
import { InjectedFormProps, reduxForm, Field } from 'redux-form'
import { ILogin } from '../Models/LoginModel'


const LoginForm: React.FunctionComponent<InjectedFormProps<ILogin>> = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder='Correo' label='Correo' name='email' type='email' component={Input} required />
            <Field placeholder='Contraseña' label='Contraseña' name='password' type='password' component={Input} required/>
            <Button>Login</Button>
            <Link to='/Register' className={'ml-2 card-link align-text-bottom'}> Registrate </Link>
        </form>
    );
}

export default reduxForm<ILogin>({
    form: 'login',
})(LoginForm)