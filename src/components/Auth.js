import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';
import {useInputValue} from '../hooks/useInputValue';

const Auth = props => {
  const [loginClass, setLoginClass] = useState('login-container')
  const [registerClass, setRegisterClass] = useState('register-container')

  const [{first_name, last_name, email, password, phone_number, address, birth_date, religious_preference, blood_type}, setValues, resetValues]=useInputValue({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number:'',
    address: '',
    birth_date: '',
    religious_preference: '',
    blood_type: ''
  })

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

            {/* Register */}

              <h3>Register</h3>
              <form
              onSubmit={e=>{
                e.preventDefault()
                axios.post(`/auth/register`, {first_name, last_name, email, password, phone_number, address, birth_date, religious_preference, blood_type}).then(results=>{
                    {props.getUser(results.data)}
                    resetValues()              
            })
                    .catch(err=>console.log(err))}
            }>
              <div className='login-row'>
                <p>First Name: </p>
                <input 
                type='text'
                name='first_name'
                placeholder='First Name' 
                value={first_name}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Last Name: </p>
                <input 
                type='text'
                name='last_name' 
                placeholder='Last Name'
                value={last_name}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Email: </p>
                <input 
                type='text'
                name='email' 
                placeholder='Email Address'
                value={email}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Password: </p>
                <input 
                type='password'
                name='password' 
                placeholder='Password' 
                value={password}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Phone Number: </p>
                <input 
                type='text'
                name='phone_number' 
                placeholder='Phone Number'
                value={phone_number}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Address: </p>
                <input 
                type='text'
                name='address' 
                placeholder='Address'
                value={address}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Birth Date: </p>
                <input 
                type='text'
                name='birth_date' 
                placeholder='Birth Date'
                value={birth_date}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Religious Preference: </p>
                <input 
                type='text'
                name='religious_preference' 
                placeholder='Religious Preference'
                value={religious_preference}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <p>Blood Type: </p>
                <input 
                type='text'
                name='blood_type' 
                placeholder='Blood Type'
                value={blood_type}
                onChange={setValues}
                />
              </div>
              <div className='login-row'>
                <button onClick={() => {
                  setLoginClass('login-container')
                  setRegisterClass('register-container')
                }}>back to Login</button>
                <button
                type='submit'>Register</button>
              </div>
              </form>
            </div>
          </div>
        </main>
    );
}
export default connect(null, {getUser})(Auth);