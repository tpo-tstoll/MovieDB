import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../utils/api';

const Context = React.createContext();

export const ContextProvider = props => {

    const history = useHistory();
    const path = useLocation().pathname;

    //Create movies state to contain array of movies
    const [ movies, setMovies ] = useState([{
        id: '',
        title: '',
        overview: '',
        image: ''
    }])

    //useEffect to get a list of movies, and set movies state
    useEffect(() => {
        const getMovieList = async () => {
        let movieList = [];
        try {
           let response = await api.getMovies();
            for (let i = 0; i < 15; i++) {
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

    //State that holds the top 4 upcoming movies from each of the next 3 months
    const [ upcoming, setUpcoming ] = useState([{
        id: '',
        title: '', 
        release: ''
    }]);

    //Use effect to determine the next 3 months begining and end date, then complete api calls with the info
	useEffect(() => {
        const getPremiers = async () => {
            let movieList = [];
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
            let d = new Date();
			try {
                for(let i = 0; i < 3; i++) {
                    let firstDay = new Date(d.getFullYear(), d.getMonth() + i, 1).toLocaleDateString("en-ZA", options).replaceAll('/','-');
                    let lastDay = new Date(d.getFullYear(), d.getMonth() + i + 1 , 0).toLocaleDateString("en-ZA", options).replaceAll('/','-');
                    let response = await api.getUpcoming(firstDay, lastDay);
                        for (let j = 0; j < 4; j++) {
                            let movie = {
                                id: response.data.results[j].id,
                                title: response.data.results[j].title,
                                release: response.data.results[j].release_date
                            }
                        movieList.push(movie);
                        }
                }
                await setUpcoming(movieList);
			} catch (error) {
				console.log(error);
			}
		}
    	getPremiers();
    }, [])

    //State for search resuts
    const [ searchResults, setSearchResults ] = useState([{
        id: '',
        title: '',
        year: '',
        image: ''
    }])

    const [user, setUser] = useState({
        authenticated: false,
        userName: '',
    });

    //State that contains details on a specific movie
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

    const [error, setError] = useState([]);

    const asyncHandler = async cb => {
        try {
            await cb()
        } catch (error) {
            const { response: { data, data: { errors } } } = error;
                    setError(data);
            }
        }

     //reset validation errors on path change
     useEffect(() => {
        setError(null);
    }, [path])




    const value = {
        movies,
        movieDetail,
        searchResults,
        upcoming,
        user,
        error,
        setUpcoming,
        setSearchResults,
        setMovieDetail,
        setUser,
        asyncHandler,
        setError
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;