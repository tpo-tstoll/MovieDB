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
                            <ul className="slides">
                                {value.searchResults.map(movie => {
                                   return <li className='col-md-4' key={movie.id}><NavLink to={`/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img>
                                   <p /><h4 className='maintitle'>{movie.title}</h4></NavLink>
                                   <p className='maintitle'><strong>Year: </strong>{movie.year.substring(0,4)}</p></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default SearchResults;
