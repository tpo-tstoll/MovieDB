import React, { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context';


const Movies = () => {

    const {value} = useContext(Context);


    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                    <div className="row">
                        <div className="col-md-9">
							<div className="slider">
								<ul className="slides">
                                    {value.movies.map(movie => {
                                       return <li className='col-md-4' key={movie.id}><NavLink to={`/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img>
                                       <h1 className='maintitle'>{movie.title}</h1></NavLink>
                                       {movie.overview}<p /></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
);
}

export default Movies;