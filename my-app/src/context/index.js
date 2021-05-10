import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
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
        email: '',
        password: '',
        userId: '',
    });

    useEffect(() => {
        if (user.authenticated) {
            Cookies.set('loggedIn', 'true', {expires: 1})
            Cookies.set('username', value.user.userName, {expires: 1})
            Cookies.set('email', value.user.email, {expires: 1});
            Cookies.set('pass', value.user.password, {expires: 1});
            Cookies.set('id', value.user.userId, {expires: 1});
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (Cookies.get('loggedIn') === 'true') {
            setUser({
                authenticated: true,
                email: Cookies.get('email'),
                userName: Cookies.get('username'),
                password: Cookies.get('pass'),
                userId: Cookies.get('id')
            })
        }
    }, [])

    const [favorites, setFavorites] = useState([{
        listId: '',
        movieId: '',
        title: '',
        image: ''
    }]);

    useEffect(() => {
        if (value.user.authenticated) {
        const favoriteList = [];
        const getFavoriteList = async () => {
            let response = await api.getFavorites(value.user.email, value.user.password);
            for (let i = 0; i < response.data.length; i++) {
                let favorite = {
                    listId: response.data[i].id,
                    movieId: response.data[i].movieId,
                    title: response.data[i].title,
                    image: response.data[i].image
                }
                favoriteList.push(favorite);
            }
            await value.setFavorites(favoriteList);
        }
        getFavoriteList();
    }
    // eslint-disable-next-line
    }, [path])

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
    const [validationError, setValidationError] = useState(null);
    const asyncHandler = async cb => {
        try {
            await cb()
        } catch (error) {
            const { response: { status, data, data: { errors } } } = error;
            switch (status) {
                case 400:
                    setValidationError(errors);
                    break;
                case 401:
                    setError(data);
                    break;
                default:
                    history.push('/error');
                    break;
            }
        }
    }

     //reset validation errors on path change
     useEffect(() => {
        setError(null);
        setValidationError(null);
    }, [path])




    const value = {
        movies,
        movieDetail,
        searchResults,
        upcoming,
        user,
        error,
        favorites,
        validationError,
        setUpcoming,
        setSearchResults,
        setMovieDetail,
        setUser,
        asyncHandler,
        setError,
        setFavorites
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;