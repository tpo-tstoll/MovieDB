import React, { useContext, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { motion } from "framer-motion";
import Context from '../context';
import api from '../utils/api'

const SignIn = () => {

    const { value } = useContext(Context);

    const history = useHistory();

    const emailInput = useRef('');
    const passwordInput = useRef('');
    
    const divVariant = {
        hidden: { x: "100vw", opacity: 0, transition: { staggerChildren: 4 } },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                type: "spring",
                stiffness: 35,
                ease: "easeOut",
                duration: 0.25
            }
        }
    };

    //Function to Sign in user and set user state
    const userSignIn = async () => {
        const encodedPassword = btoa(passwordInput.current.value)
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

    //Submit fuction to execute sign in function
    const onSubmit = e => {
        e.preventDefault();
        value.asyncHandler(userSignIn);
    }

    return (
        <main className="main-content">
            <div className="container">
            <div className="page">
                {value.movies.slice(0,8).map(movie => {return <img className='tile'src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title} key={movie.id}></img>})}
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <motion.div
                                variants={divVariant}
                                initial="hidden"
                                animate="show"
                                className="form--centered"
                            >  
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
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;