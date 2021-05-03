import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api';


const Movies = () => {

    const {value} = useContext(Context);
    let movieList = [];

    useEffect(() => {
        const getMovieList = async () => {
        try {
           let response = await api.getMovies();
            for (let i = 0; i < 3; i++) {
                    let movie = {
                        title: response.data.results[i].title,
                        overview: response.data.results[i].overview,
                        image: response.data.results[i].poster_path
                    };
                    movieList.push(movie);
            }
           //console.log(movieList);
           await value.setMovies(movieList);
        } catch (error) {
            console.log(error);
        }
    }
    getMovieList();
    }, [])

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                    <div className="row">
                        <div class="col-sm-6 col-md-3">
                            <div class="latest-movie">
                                <ul>
                                    {value.movies.map(movie => {
                                       return <li><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img>{movie.overview}<p /></li>
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