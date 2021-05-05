import React, { useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Context from '../context';


const MovieDetail = () => {

    const {value} = useContext(Context);

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

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
                                <figure className="movie-poster"><img src={`https://image.tmdb.org/t/p/original${value.movieDetail.image}`} alt={value.movieDetail.title}></img></figure>
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
                                    <li><strong>Director:</strong> {value.movieDetail.director} </li>
                                    <li><strong>Stars:</strong> {value.movieDetail.actors.map(actor => { return <>{actor} | </>})} </li>
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