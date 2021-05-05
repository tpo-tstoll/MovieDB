import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const Context = React.createContext();

export const ContextProvider = props => {
    //locate path and store to variable
    let path = useLocation().pathname.substring(1)

    //State for search resuts
    const [ searchResults, setSearchResults ] = useState([{
        id: '',
        title: '',
        year: '',
        image: ''
    }])

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
			let firstDay = new Date(d.getFullYear(), d.getMonth(), 1).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let lastDay = new Date(d.getFullYear(), d.getMonth() + 1 , 0).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let nextFirstDay = new Date(d.getFullYear(), d.getMonth() + 1, 1).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let nextLastDay = new Date(d.getFullYear(), d.getMonth() + 2 , 0).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let finalFirstDay = new Date(d.getFullYear(), d.getMonth() + 2, 1).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			let finalLastDay = new Date(d.getFullYear(), d.getMonth() + 3 , 0).toLocaleDateString("en-ZA", options).replaceAll('/','-');
			try {
				let response = await api.getUpcoming(firstDay, lastDay);
					for (let i = 0; i < 4; i++) {
						let movie = {
							id: response.data.results[i].id,
							title: response.data.results[i].title,
							release: response.data.results[i].release_date
						}
						movieList.push(movie);
					}
				let response2 = await api.getUpcoming(nextFirstDay, nextLastDay);
					for (let i = 0; i < 4; i++) {
					let movie = {
						id: response2.data.results[i].id,
						title: response2.data.results[i].title,
						release: response2.data.results[i].release_date
					}
					movieList.push(movie);
				}
				let response3 = await api.getUpcoming(finalFirstDay, finalLastDay);
					for (let i = 0; i < 4; i++) {
						let movie = {
							id: response3.data.results[i].id,
							title: response3.data.results[i].title,
							release: response3.data.results[i].release_date
						}
						movieList.push(movie);
					}
				await value.setUpcoming(movieList);
			} catch (error) {
				console.log(error);
			}
		}
    	getPremiers();
    }, [])

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

    //Perform API call to get needed movie info, set state based upon responses
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
                //Loop through actors and return first 5
                if (response.data.credits.cast.length !== 0) {
                    for (let i = 0; i < response.data.credits.cast.length && i < 5; i++) {
                        actors.push(response.data.credits.cast[i].name)
                    }
                }
                //If reviews exist, return 2
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
                await setMovieDetail(movieDetail); 
            } catch (error) {
                console.log(error);
            }
    }
        getMoviedetail();
    }, [path])


    const value = {
        movies,
        movieDetail,
        searchResults,
        upcoming,
        setUpcoming,
        setSearchResults
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;