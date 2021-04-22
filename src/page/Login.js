import './Page.css'
import React, { useState, useRef } from "react";
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-apollo';
import { LOGIN } from '../graphql';
import { useHistory } from "react-router-dom";

export function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [login] = useMutation(LOGIN);
    let history = useHistory();

    const passwordRef = useRef();

    const passwordFocus = input => {
        if(input === 'Enter')
            passwordRef.current.focus();
    }

    const sendLogin = async input => {
        if(input === 'Enter') {
            await handleLogin();
        }
    }

    const handleLogin = async () => {
        try{                        
            let token = await login({ 
                variables: {
                    input: {                            
                        email: email,
                        password: password
                    }
                }
            })
            
            localStorage.setItem('accessToken', token.data.login);
            props.setIsLogin(true);
            history.push('/');
        } catch {
            setShowErrorMsg(true)
        }
    }

    return (
        <div className="login">
            {!showErrorMsg ? <div></div> : <div>Check your email and password</div>}
            <TextField 
                label="Email" 
                variant="outlined"
                value={email}
                style={{ margin: '10px' }}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => passwordFocus(e.key)}
             />
             <TextField 
                label="Password" 
                variant="outlined"
                value={password}
                style={{ margin: '10px' }}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={async e => sendLogin(e.key)}
                inputRef={passwordRef}
              />
            <button 
                style={{ margin: '10px' }}
                onClick={async () => handleLogin()}
            >
                go to home
            </button>
        </div>
    );
}