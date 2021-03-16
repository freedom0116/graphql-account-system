import './Page.css'
import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-apollo';
import { LOGIN } from '../graphql';
import { useHistory } from "react-router-dom";

export function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [login, { error, data }] = useMutation(LOGIN);
    let history = useHistory();

    useEffect(() => {
        console.log(data);
    }, [data])
    
    useEffect(() => {
        console.log(error, "1")
    }, [error])

    return (
        <div className="login">
            {!showErrorMsg ? <div></div> : <div>Check your email and password</div>}
            <TextField 
                label="Email" 
                variant="outlined"
                value={email}
                style={{ margin: '10px' }}
                onChange={e => setEmail(e.target.value)}
             />
             <TextField 
                label="Password" 
                variant="outlined"
                value={password}
                style={{ margin: '10px' }}
                onChange={e => setPassword(e.target.value)}
              />
            <button 
                style={{ margin: '10px' }}
                onClick={async () => {
                    try{                        
                        await login({ 
                            variables: {
                                input: {                            
                                    email: email,
                                    password: password
                                }
                            }
                        })

                        history.push('/');
                    } catch {
                        setShowErrorMsg(true)
                    }
                }}
            >
                go to home
            </button>
        </div>
    );
}