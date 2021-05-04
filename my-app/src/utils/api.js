import axios from 'axios';
require("dotenv").config();

const apiKey = process.env.REACT_APP_API_KEY;

export default {

    getMovies: async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        return response;
    },

    getMovieDetail: async (path) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${path}?api_key=${apiKey}&language=en-US&append_to_response=credits,reviews`);
        return response;
    },
}
