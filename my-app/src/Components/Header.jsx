import React, { useContext, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import api from '../utils/api'
import Context from "../context"

const Header = () => {

    const {value} = useContext(Context);

    const searchInput = useRef('');
    const history = useHistory();

    //onSubmit function to set stateful component with results from user search input
    const onSubmit = async (e) => {
        e.preventDefault();
        let resultArray = [];
        history.push(`/search/${searchInput.current.value}`)
        for (let j=1; j <= 6; j++) {
            let response = await api.getSearchResults(searchInput.current.value, j);
            for (let i = 0; i < response.data.results.length; i++ ) {
                let results = {
                    id: response.data.results[i].id ? response.data.results[i].id : null,
                    title: response.data.results[i].title ? response.data.results[i].title : null,
                    year: response.data.results[i].release_date ? response.data.results[i].release_date : null,
                    image: response.data.results[i].poster_path ? response.data.results[i].poster_path : null
                }
                resultArray.push(results)
            }
        }
        value.setSearchResults(resultArray);
        searchInput.current.value = null;
    }

    return (
        <header className="site-header">
            <div className="container">
                <NavLink to="/" id="branding">
                    <img src="logo.png" alt="" className="logo"></img>
                    <div className="logo-copy">
                        <h1 className="site-title">The Movie Place</h1>
                        <small className="site-description">Tommy knows movies</small>
                    </div>
                </NavLink>

                <div className="main-navigation">
                    <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
                    <ul className="menu">
                        <li className="menu-item current-menu-item"><NavLink to="/">Home</NavLink></li>
                        <li className="menu-item"><NavLink to="about.html">About</NavLink></li>
                        <li className="menu-item"><NavLink to="review.html">Movie reviews</NavLink></li>
                        <li className="menu-item"><NavLink to="joinus.html">Join us</NavLink></li>
                        <li className="menu-item"><NavLink to="contact.html">Contact</NavLink></li>
                    </ul>
                    <form action='/search' onSubmit={onSubmit} className="search-form">
                        <input type="text" placeholder="Search..." ref={searchInput}/>
                        <button><i className="fa fa-search" /> Go</button>
					</form>
                </div>

                <div className="mobile-navigation"></div>
        </div>
    </header>
    );
}
 
export default Header;