import React, { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context';


const SearchResults = () => {

    const {value} = useContext(Context);

    return (
        <main className="main-content">
        <div className="container">
            <div className="page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="slider">
                        <h2>Search Results:</h2>
                                {value.searchResults.map(movie => {
                                   return <ul className="slides"> <li className='col-md-3' key={movie.id}><NavLink to={`/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img></NavLink></li>
                                   <li className="col-md-4 col-centered"><NavLink to={`/${movie.id}`}><h1 className='maintitle'>{movie.title}</h1>
                                   <h3 className='maintitle'>Year: {movie.year.substring(0,4)}</h3></NavLink></li></ul>
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default SearchResults;
