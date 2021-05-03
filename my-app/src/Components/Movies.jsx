import React, { useEffect } from 'react';
import api from '../utils/api';


const Movies = () => {

    useEffect(() => {
        const getMovieList = async () => {
        try {
           let response = await api.getMovies();
           let movie = {
               title: response.data.title,
               overview: response.data.overview,
               image: response.data.poster_path
           }
           console.log(movie);
        } catch (error) {
            console.log(error);
        }
    }
    getMovieList();
    }, [])

    return (
        <div>
            
        </div>
    );
}

export default Movies;