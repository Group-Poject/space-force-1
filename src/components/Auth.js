import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';
const Auth = props => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const login = () => {
        axios.post('/auth/login', {email: emailInput, password: passwordInput})
        .then(res => {props.getUser(res.data)
        props.history.push('/homemain')})
        .catch(err => {window.alert('Email/password incorrect')});
    }
    const register = () => {
        axios.post('/auth/register', {email: emailInput, password: passwordInput})
        .then(res => {props.getUser(res.data)
        window.alert('Register accepted, please login')})
        .catch(err => {window.alert('Email/password exists')});
    }
    return(
        <main>
          Login
        {/* <div className='login-box'>
            <input type='text' placeholder='Email' className='login-input'
                value={emailInput} onChange={(e) => setEmailInput(e.target.value)}
            />
            <input type='password' placeholder='Password' className='login-input' 
                value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
            />
            <div className='flex-login-buttons'>
            <button className='login-button' onClick={() => login()}>Login</button>
            <p className='or-word'>Or</p>
            <button className='register-button' onClick={() => register()}>Register</button>
            </div>
        </div> */}
        </main>
    );
}
export default connect(null, {getUser})(Auth);