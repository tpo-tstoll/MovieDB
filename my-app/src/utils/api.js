import axios from 'axios';


export default {

    getMovies: async () => {
        const response = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=533e7be9234474900fca15570cfb9ae4');
        return response;
    }

}