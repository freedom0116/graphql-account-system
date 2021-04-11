import './Page.css'
import React, { useState, useRef } from "react";
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-apollo';
import { REGISTER } from '../graphql';
import { useHistory } from "react-router-dom";

export function Register () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [register] = useMutation(REGISTER);
    let history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const emailFocus = input => {
        if(input === 'Enter')
            emailRef.current.focus();
    }

    const passwordFocus = input => {
        if(input === 'Enter')
            passwordRef.current.focus();
    }

    const sendRegister = async input => {
        if(input === 'Enter') {
            await handleRegister()
        }
    }

    const handleRegister = async () => {
        try{                        
            let token = await register({ 
                variables: {
                    input: {    
                        name: name,                  
                        email: email,
                        password: password
                    }
                }
            })

            localStorage.setItem('accessToken', token.data.createAccount);
            history.push('/');
        } catch {
            setShowErrorMsg(true)
        }
    }

    return (
        <div className="login">
            {!showErrorMsg ? <div></div> : <div>Check your email and password</div>}
            <TextField 
                label="Name" 
                variant="outlined"
                value={name}
                style={{ margin: '10px' }}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => emailFocus(e.key)}
             />
            <TextField 
                label="Email" 
                variant="outlined"
                value={email}
                style={{ margin: '10px' }}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => passwordFocus(e.key)}
                inputRef={emailRef}
             />
             <TextField 
                label="Password" 
                variant="outlined"
                value={password}
                style={{ margin: '10px' }}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={async e => sendRegister(e.key)}
                inputRef={passwordRef}
              />
            <button 
                style={{ margin: '10px' }}
                onClick={async () => handleRegister()}
            >
                go to home
            </button>
        </div>
    );
}