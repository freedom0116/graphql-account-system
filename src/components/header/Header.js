import React from "react";
import './Header.css'
import { Link } from "react-router-dom";
import { useMutation } from 'react-apollo';
import { LOGOUT } from '../../graphql';
import { useHistory } from "react-router-dom";

export function Header () {
    const [logout] = useMutation(LOGOUT);
    let history = useHistory();

    const handleLogout = async () => {
        await logout();
        console.log(localStorage.getItem('accessToken'))
        localStorage.removeItem('accessToken');
        history.push('/');
    }

    return (
        <div className="header">
            <Link to="/">home</Link>
            <Link to="/login">login</Link>
            <Link to="/signup">register</Link>
            <button
                onClick={async () => handleLogout()}
            >
                logout
            </button>
        </div>
    );
}