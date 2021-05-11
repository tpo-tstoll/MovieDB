import React, { useContext, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api.js';
import ValidationError from './ValidationError'

const SignUp = () => {

    const { value } = useContext(Context);

    const history = useHistory();

    const firstNameInput = useRef('');
    const lastNameInput = useRef('');
    const emailInput = useRef('');
    const passwordInput = useRef('');
    const confirmPasswordInput = useRef('');

    //Function to create new user, sign in, and set state
    const createUser = async () => {
        const encodedPassword = btoa(passwordInput.current.value);
        await api.postCreateUser(firstNameInput.current.value, lastNameInput.current.value, emailInput.current.value, passwordInput.current.value);
        
        const response = await api.getUser(emailInput.current.value, encodedPassword);

        value.setUser({
            authenticated: true,
            userName: response.data.name,
            email: response.data.email,
            password: encodedPassword,
            userId: response.data.id
        }); 

        history.push('/');
    }

    //Validate password and confirm password inputs
    const validatePassword = () => {
        if (passwordInput.current.value === confirmPasswordInput.current.value) {
            confirmPasswordInput.current.setCustomValidity('');
        } else {
            confirmPasswordInput.current.setCustomValidity("Passwords do not match");
        }
    }

    //Execute sign up function
    const onSubmit = async (e) => {
        e.preventDefault();
        value.asyncHandler(createUser);
    }

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                {value.movies.slice(0,8).map(movie => {return <img className='tile'src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title} key={movie.id}></img>})}
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form--centered">
                                <h2 id="uc-heading">Sign Up</h2>
                                {value.validationError ? <ValidationError /> : null}
                                <form className="signinform" onSubmit={onSubmit}>
                                    <label htmlFor="firstName">First Name:</label><p />
                                    <input id="firstName" name="firstName" type="text" className="signinform" ref={firstNameInput} /><p />
                                    <label htmlFor="lastName">Last Name:</label><p />
                                    <input id="lastName" name="lastName" type="text" className="signinform" ref={lastNameInput} /><p />
                                    <label htmlFor="emailAddress">Email Address:</label><p />
                                    <input id="emailAddress" name="emailAddress" type="email" className="signinform" ref={emailInput} /><p />
                                    <label htmlFor="password">Password:</label><p />
                                    <input id="password" name="password" type="password" onChange={validatePassword} className="signinform" ref={passwordInput} /><p />
                                    <label htmlFor="confirmPassword">Confirm Password:</label><p />
                                    <input id="confirmPassword" name="confirmPassword" type="password" onKeyUp={validatePassword} className="signinform" ref={confirmPasswordInput} /><p />
                                    <div className="buttonsDiv">
                                        <button className="buttons" type="submit">Sign Up</button>
                                        <NavLink to="/"><button className="buttons">Cancel</button></NavLink>
                                    </div>
                                </form>
                                <p className="txt-footer">Already have a user account? <br/>Click here to <NavLink className="signup-link" to='/signin'>sign in!</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default SignUp;