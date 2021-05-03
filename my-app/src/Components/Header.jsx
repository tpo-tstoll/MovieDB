import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <header className="site-header">
            <div className="container">
                <NavLink to="index.html" id="branding">
                    <img src="logo.png" alt="" className="logo"></img>
                    <div className="logo-copy">
                        <h1 className="site-title">The Movie Place</h1>
                        <small className="site-description">Tommy knows movies</small>
                    </div>
                </NavLink>

                <div className="main-navigation">
                    <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
                    <ul className="menu">
                        <li className="menu-item current-menu-item"><NavLink to="index.html">Home</NavLink></li>
                        <li className="menu-item"><NavLink to="about.html">About</NavLink></li>
                        <li className="menu-item"><NavLink to="review.html">Movie reviews</NavLink></li>
                        <li className="menu-item"><NavLink to="joinus.html">Join us</NavLink></li>
                        <li className="menu-item"><NavLink to="contact.html">Contact</NavLink></li>
                    </ul>

                    <form action="#" className="search-form">
                        <input type="text" placeholder="Search..."></input>
                        <button><i className="fa fa-search"></i></button>
                    </form>
                </div>

                <div className="mobile-navigation"></div>
        </div>
    </header>
    );
}
 
export default Header;