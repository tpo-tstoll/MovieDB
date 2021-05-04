import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="site-footer">
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">About Us</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia tempore vitae mollitia nesciunt saepe cupiditate</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">Recent Review</h3>
                        <ul className="no-bullet">
                            <li><NavLink to="#">Lorem ipsum dolor</NavLink></li>
                            <li><NavLink to="#">Sit amet consecture</NavLink></li>
                            <li><NavLink to="#">Dolorem respequem</NavLink></li>
                            <li><NavLink to="#">Invenore veritae</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">Help Center</h3>
                        <ul className="no-bullet">
                            <li><NavLink to="#">Lorem ipsum dolor</NavLink></li>
                            <li><NavLink to="#">Sit amet consecture</NavLink></li>
                            <li><NavLink to="#">Dolorem respequem</NavLink></li>
                            <li><NavLink to="#">Invenore veritae</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">Join Us</h3>
                        <ul className="no-bullet">
                            <li><NavLink to="#">Lorem ipsum dolor</NavLink></li>
                            <li><NavLink to="#">Sit amet consecture</NavLink></li>
                            <li><NavLink to="#">Dolorem respequem</NavLink></li>
                            <li><NavLink to="#">Invenore veritae</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">Social Media</h3>
                        <ul className="no-bullet">
                            <li><NavLink to="#">Facebook</NavLink></li>
                            <li><NavLink to="#">Twitter</NavLink></li>
                            <li><NavLink to="#">Google+</NavLink></li>
                            <li><NavLink to="#">Pinterest</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">Newsletter</h3>
                        <form action="#" className="subscribe-form">
                            <input type="text" placeholder="Email Address" />
                        </form>
                    </div>
                </div>
            </div>

            <div className="colophon">Copyright 2014 Company name, Designed by Themezy. All rights reserved</div>
        </div> 
    </footer>
    )
}

export default Footer;