import React from "react";
import './Header.css'
import { Link } from "react-router-dom";
import { useMutation } from 'react-apollo';
import { LOGOUT } from '../../graphql';
import { useHistory } from "react-router-dom";

export function Header (props) {
    const [logout] = useMutation(LOGOUT);
    let history = useHistory();

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('accessToken');
        props.setIsLogin(false);
        history.push('/');
    }

    return (
        <div className="header">
            <Link to="/">home</Link>
            {!props.isLogin ?
                <div className="header-left">
                    <Link to="/login">login</Link>
                    <Link to="/signup">register</Link>
                </div> :                 
                <button
                    onClick={async () => handleLogout()}
                >
                    logout
                </button>     
            }
        </div>
    );
}