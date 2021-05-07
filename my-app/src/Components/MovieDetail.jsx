import React, { useContext, useEffect} from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api';


const MovieDetail = () => {

    const {value} = useContext(Context);

    const history = useHistory();
    //Locate movie id that is stored in path, removes intial '/'
    let path = useLocation().pathname.substring(7)

    //Function to go back 1 page in browser
    const goBack = () => {
        history.goBack();
    }

    //Function to get movie data based upon path/id, and set state conditionally with response data
    useEffect(() => {
        const getMoviedetail = async () => {
            try {
                let actors = [];
                let director;
                let reviews = [];
                let response = await api.getMovieDetail(path);
                 //Loop through response, if director is returned, set director variable
                for (let i = 0; i < response.data.credits.crew.length; i++) {
                    if (response.data.credits.crew[i].job === 'Director')
                    director = response.data.credits.crew[i].name
                }
                //Loop through actors if actors are returned and push actors to array up to a total of 5
                if (response.data.credits.cast.length !== 0) {
                    for (let i = 0; i < response.data.credits.cast.length && i < 5; i++) {
                        actors.push(response.data.credits.cast[i].name)
                    }
                }
                //If reviews exist, return up to 2
                if (response.data.reviews.results.length !== 0) {
                    for (let i = 0; i < response.data.reviews.results.length && i < 2; i++) {
                        let review = [
                            response.data.reviews.results[i].content
                        ]
                        reviews.push(review);
                        }
                }
                //set movie detail object that is used to update state
                let movieDetail = {
                    title: response.data.title ? response.data.title : null,
                    overview: response.data.overview ? response.data.overview : null,
                    image: response.data.poster_path ? response.data.poster_path : null,
                    runningTime: response.data.runtime ? response.data.runtime : null,
                    rating: response.data.vote_average ? response.data.vote_average : null,
                    director: director,
                    actors: actors,
                    reviews: reviews
                };
                await value.setMovieDetail(movieDetail); 
            } catch (error) {
                console.log(error);
            }
    }
        getMoviedetail();
    }, [])

    // eslint-disable-next-line
    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                    <div className="breadcrumbs">
                        <NavLink to='/'>Home</NavLink>
                        <span> {value.movieDetail.title}</span>
                        <button onClick={goBack} className="goBack">Go Back</button>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-6">
                                <figure className="movie-poster"><img src={value.movieDetail.image ? `https://image.tmdb.org/t/p/original${value.movieDetail.image}` : '1.jpg'} alt={value.movieDetail.title}></img></figure>
                            </div>
                            <div className="col-md-6">
                                <h2 className="movie-title">{value.movieDetail.title}</h2>
                                <div className="movie-summary">
                                    <p>{value.movieDetail.overview}</p>
                                </div>
                                <ul className="movie-meta">
                                    <li><strong>Rating:</strong> 
                                        {value.movieDetail.rating ? <span className="starring"><strong> {value.movieDetail.rating}</strong> out of 10</span> 
                                        : 
                                        <span className="starring"> Sorry! No Ratings Yet</span>
                                        
                                        }
                                    </li>
                                    <li><strong>Length:</strong> {value.movieDetail.runningTime}</li>
                                </ul>
                                <ul className="starring">
                                    <li key={value.movieDetail.director}><strong>Director:</strong> {value.movieDetail.director ? value.movieDetail.director : "Sorry no director was located for this film"} </li>
                                    <li key={path}><strong>Stars:</strong> {value.movieDetail.actors.length > 0 ? value.movieDetail.actors.map(actor => { return <>{actor} | </>}) : "Sorry no actors were located for this film"} </li>
                                </ul>
                                <hr />
                                <div className="entry-content">
                                    <h3>Reviews:</h3>
                                    {value.movieDetail.reviews.length > 0 ? 
                                        value.movieDetail.reviews.map(review => {
                                            return <><p key={review}>- {review}</p></>
                                        })
                                        :
                                        <h3>Sorry No Reviews Exist For This Film!</h3>
                                        }
							    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MovieDetail;