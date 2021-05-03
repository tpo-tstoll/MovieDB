import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const Context = React.createContext();

export const ContextProvider = props => {

    let path = useLocation().pathname.substring(1)

    const [ movies, setMovies ] = useState([{
        id: '',
        title: '',
        overview: '',
        image: ''
    }])

    useEffect(() => {
        const getMovieList = async () => {
        let movieList = [];
        try {
           let response = await api.getMovies();
            for (let i = 0; i < 3; i++) {
                    let movie = {
                        id: response.data.results[i].id,
                        title: response.data.results[i].title,
                        overview: response.data.results[i].overview,
                        image: response.data.results[i].poster_path
                    };
                    movieList.push(movie);
            }
           await setMovies(movieList);
        } catch (error) {
            console.log(error);
        }
    }
    getMovieList();
    }, [])

    const [movieDetail, setMovieDetail] = useState({
        title: '',
        overview: '',
        image: '',
        runningTime: '',
        rating: '',
        director: '',
        actors: [],
        reviews: []
    });
    useEffect(() => {
        const getMoviedetail = async () => {
            try {
                let actors = [];
                let director;
                let reviews = [];
                let response1 = await api.getMovieDetail(path);
                let response2 = await api.getCast(path);
                let response3 = await api.getReviews(path);
                for (let i = 0; i < response2.data.crew.length; i++) {
                    if (response2.data.crew[i].job === 'Director')
                    director = response2.data.crew[i].name
                }
                for (let i = 0; i < 5; i++) {
                    actors.push(response2.data.cast[i].name)
                }
                  for (let i = 0; i < 2; i++) {
                      if (response3.data.results.length !== 0) {
                        let review = [
                            response3.data.results[i].content
                        ]
                        reviews.push(review);
                    }
                }
                console.log(response3);
                let movieDetail = {
                    title: response1.data.title,
                    overview: response1.data.overview,
                    image: response1.data.poster_path,
                    runningTime: response1.data.runtime,
                    rating: response1.data.vote_average,
                    director: director,
                    actors: actors,
                    reviews: reviews
                };
                await setMovieDetail(movieDetail);
                console.log(path)
            } catch (error) {
                console.log(error);
            }
    }
        getMoviedetail();
    }, [path])


    const value = {
        movies,
        movieDetail
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;