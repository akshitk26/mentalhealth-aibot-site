import React, { useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import {auth} from './firebase'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';

function Login() {

    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
            console.log('User created: ', user);
            const newUser = userCredential.user;

            setUser(newUser);

            //redierct to profile page after successful signup
            console.log('redirecting to profile page')
            navigate('/profile');
        }   catch (error) {
            console.log(error.message);
        }
    };

    const login = async (e) => { 
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            const loggedInUser = userCredential.user;

            setUser(loggedInUser);

            //redierct to profile page after successful signup
            console.log('redirecting to profile page')
            navigate('/profile')
        }   catch (error) {
            console.log(error.message);
        }
     };

     const [user, setUser] = useState(null);
     const auth = getAuth();
 
     useEffect(() => {
         // Check authentication status when the component mounts
         const unsubscribe = onAuthStateChanged(auth, (user) => {
           setUser(user);
         });
     
         // Clean up the subscription when the component unmounts
         return () => unsubscribe();
       }, [auth]);

  return (
    <div className='Login'>
      <div className='main'>

      {user ? (
                <div className='signedInMsg'>
                    <p>You're already logged in! If you want to sign out, head to the profile page and click 'Sign Out'.</p>
                </div>
            ) : (
                <div>
                    <div className='loginBox'>
                        <div className='signUpBox'>
                            <div className='formBox'>
                                <h1>Sign Up</h1>
                                <form onSubmit={register}>

                                    <div className='inputBox'>
                                        <span class='icon'></span>
                                        <input type="email" required
                                            onChange={(event) => {
                                                setSignupEmail(event.target.value)
                                                }}>        
                                        </input>
                                        <label>Email</label>                          
                                    </div>

                                    <div className='inputBox'>
                                        <span class='icon'></span>
                                        <input type="password" required 
                                            onChange={(event) => {
                                                setSignupPassword(event.target.value)
                                                }}>
                                        </input>
                                        <label>Password</label>
                                    </div>

                                    <button type='submit' class='btn' id='signupButton' onClick={register}>Sign Up</button>
                                </form>
                            </div>
                        </div>

                        <div className='signInBox'>
                            < div className='formBox'>
                                <h1>Login</h1>
                                <form onSubmit={login}>

                                    <div className='inputBox'>
                                        <span class='icon'></span>
                                        <input type="email" required
                                            onChange={(event) => {
                                                setLoginEmail(event.target.value)
                                                }}></input>
                                        <label>Email</label>                          
                                    </div>

                                    <div className='inputBox'>
                                        <span class='icon'></span>
                                        <input type="password" required
                                        onChange={(event) => {
                                            setLoginPassword(event.target.value)
                                            }}></input>
                                        <label>Password</label>
                                    </div>

                                    <button type='submit' class='btn'id='loginButton' onClick={login}>Login</button>
                                </form>
                            </div>
                        </div>
        </div>
                </div>
            )}

        
      </div>
    </div>
  );
}

export default Login;
