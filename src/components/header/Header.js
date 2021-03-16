import React from "react";
import './Header.css'
import { Link } from "react-router-dom";

export function Header () {

    return (
        <div className="header">
            <Link to="/">home</Link>
            <Link to="/login">login</Link>
            <Link to="/signup">register</Link>
        </div>
    );
}