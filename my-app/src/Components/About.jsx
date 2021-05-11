import React, { useContext } from 'react';
import Context from '../context';

const About = () => {

    const { value } = useContext(Context);

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                {value.movies.slice(0,8).map(movie => {return <img className='tile'src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title} key={movie.id}></img>})}
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form--centered">
                                <h1 id="uc-heading">Welcome to The Movie Place!</h1>
                                <img src='moviepopcorn.jfif' /> <p />
                                <h4>Here you will find a large collection of past and upcoming films. You can read up about some of your favorites or
                                 find a new movie that peaks your interest. If you like our collection of films, be sure to sign up for a free account.
                                  Once signed up you will have the ability to curate your own list of favorite movies to return to again and again. So 
                                  grab some popcorn and rally your friends, and be sure to check here for all your movie needs.</h4>
                                  <p /> <h2> And as always, enjoy the film!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default About;