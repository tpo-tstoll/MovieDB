import axios from 'axios';
require("dotenv").config();

const apiKey = process.env.REACT_APP_API_KEY;

// eslint-disable-next-line
export default {

    getMovies: async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        return response;
    },

    getMovieDetail: async (path) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${path}?api_key=${apiKey}&language=en-US&append_to_response=credits,reviews`);
        return response;
    },

    getSearchResults: async (search, page) => {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&include_adult=false}&page=${page}&append_to_response=genre`);
        return response;
    },

    getUpcoming: async (firstDay, lastDay) => {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&primary_release_date.gte=${firstDay}&primary_release_date.lte=${lastDay}&with_release_type=3%7C2`);
        return response;
    },

    getUser: async ( email, password) => {
        const decodedPassword = atob(password);
        const response = await axios.get(`http://localhost:5000/api/users`, {
            auth: {
                username: email,
                password: decodedPassword
            }
        });
        return response;
    },

    postCreateUser: async ( firstName, lastName, emailAddress, password) => {

        const response = await axios.post(`http://localhost:5000/api/users`, {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: password
        });
        return await response;

    },

    getFavorites: async ( email, password) => {
        const decodedPassword = atob(password);
        const response = await axios.get(`http://localhost:5000/api/movies`, {
            auth: {
                username: email,
                password: decodedPassword
            }
        });
        return response;
    },

    postFavorite: async ( email, password, favorite) => {
        const decodedPassword = atob(password);
        const response = await axios.post(`http://localhost:5000/api/movies`,
            favorite,
            {
                auth: {
                  username: email,
                  password: decodedPassword
                }
            }
        ); 
        return response;
    },

    removeFavorite: async ( email, password, path) => {
        const decodedPassword = atob(password);
        const response = await axios.delete(`http://localhost:5000/api/movies/${path}`,
            {
                auth: {
                  username: email,
                  password: decodedPassword
                }
            }
        ); 
        return response;
    }
}
