import React, { useContext, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Context from '../context';
import api from '../utils/api'

const SignIn = () => {

    const history = useHistory();

    const { value } = useContext(Context);

    const emailInput = useRef('');
    const passwordInput = useRef('');

    const userSignIn = async () => {
        const encodedPassword = btoa(passwordInput.current.value)
        const response = await api.getUser(emailInput.current.value, encodedPassword);

        value.setUser({
            authenticated: true,
            userName: response.data.name,
            email: response.data.email,
            password: encodedPassword
        }); 

        history.goBack();
    }

    const onSubmit = e => {
        e.preventDefault();
        value.asyncHandler(userSignIn);
    }

    return (
        <main className="main-content">
            <div className="container">
            <div className="page">
                {value.movies.slice(0,8).map(movie => {return <img className='tile'src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img>})}
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form--centered">
                                <h2>Sign In</h2>
                                {value.error ? <h3 className="errors" id="error">{value.error}</h3> : null}
                                <form className="signinform" onSubmit={onSubmit}>
                                    <label htmlFor="emailAddress">Email Address: </label><p />
                                    <input id="emailAddress" name="emailAddress" type="email" className="signinform" ref={emailInput} /><p />
                                    <label htmlFor="password">Password: </label><p />
                                    <input id="password" name="password" type="password" className="signinform" ref={passwordInput} />
                                    <div className="buttonsDiv">
                                        <button className="buttons" type="submit">Sign In</button>
                                        <NavLink to="/"><button className="buttons">Cancel</button></NavLink>
                                    </div>
                                </form>
                                <p className="txt-footer">Don't have a user account? <br /> Click here to <NavLink className="signup-link" to="/signup">sign up</NavLink>!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;