import React from 'react';
import { auth, GoogleAuthProvider } from './firebase'; // Import auth and GoogleAuthProvider directly
import './Login.css';

function Login() {
  return (
    <div className='Login'>
      <div className='main'>
        <div className='loginBox'>

            <div className='signUpBox'>
                <div className='formBox'>
                    <h1>Sign Up</h1>
                    <form>
                        <div className='inputBox'>
                            <span class='icon'></span>
                            <input type="email" required></input>
                            <label>Email</label>                          
                        </div>
                        <div className='inputBox'>
                            <span class='icon'></span>
                            <input type="password" required></input>
                            <label>Password</label>
                        </div>
                        <button type='submit' class='btn' id='signupButton'>Sign Up</button>
                    </form>
                </div>
            </div>

            <div className='signInBox'>
                < div className='formBox'>
                    <h1>Login</h1>
                    <form>
                        <div className='inputBox'>
                            <span class='icon'></span>
                            <input type="email" required></input>
                            <label>Email</label>                          
                        </div>
                        <div className='inputBox'>
                            <span class='icon'></span>
                            <input type="password" required></input>
                            <label>Password</label>
                        </div>
                        <button type='submit' class='btn'id='loginButton'>Login</button>
                    </form>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
