import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';
const Auth = props => {
  const [loginClass, setLoginClass] = useState('login-container')
  const [registerClass, setRegisterClass] = useState('register-container')
    return(
        <main>
          <div className='auth-container'>
            <div className={loginClass}>
              <h3>Login</h3>
              <div className='login-row'>
                <p>Email: </p>
                <input type='text'/>
              </div>
              <div className='login-row'>
                <p>Password: </p>
                <input type='password'/>
              </div>
              <div className='login-row'>
                <button onClick={() => {
                  setLoginClass('login-container left')
                  setRegisterClass('register-container left')
                }}>Register</button>
                <button>Login</button>
              </div>
            </div>
            <div className={registerClass}>
              <h3>Register</h3>
              <div className='login-row'>
                <p>Email: </p>
                <input type='text'/>
              </div>
              <div className='login-row'>
                <p>Password: </p>
                <input type='password'/>
              </div>
              <div className='login-row'>
                <button onClick={() => {
                  setLoginClass('login-container')
                  setRegisterClass('register-container')
                }}>back to Login</button>
                <button>Register</button>
              </div>
            </div>
          </div>
        </main>
    );
}
export default connect(null, {getUser})(Auth);