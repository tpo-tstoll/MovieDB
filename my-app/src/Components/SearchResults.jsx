import React, { useContext, useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api';
import ReactPaginate  from 'react-paginate';

const SearchResults = () => {

    const {value} = useContext(Context);

    let path = useLocation().pathname.substring(8);

    //Get page count
    useEffect( ()=> {
        const pageCount = async () => {
            let response = await api.getSearchResults(path, 1);
            value.setButtonCount(response.data.total_pages);
        }
        pageCount();
    },[path])

    //Handle Page Change
    const changePage = async (e) => {
        let pageNumber = e.selected +1 ;
        let resultsArr = [];
        let response = await api.getSearchResults(path, pageNumber);
        for(let i = 0; i < response.data.results.length; i++){
            let movieResults = {
                id: response.data.results[i].id,
                title: response.data.results[i].title,
                year: response.data.results[i].release_date,
                image: response.data.results[i].poster_path,
            }
            resultsArr.push(movieResults)
        }
        value.setSearchResults(resultsArr);
    }

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
                                   return <>
                                   <li className='col-md-3 search-col' key={movie.id}><NavLink to={`/movie/${movie.id}`}><img src={movie.image ? `https://image.tmdb.org/t/p/original${movie.image}` : '/1.jpg'} alt={movie.title}></img>
                                   <h4 className="search-year">Released: {movie.year ? movie.year.substring(0,4) : 'No Year Available'}</h4>
                                   <h2 className="maintitle search-title">{movie.title.length > 35 ? `${movie.title.substring(0,35)}...` : movie.title}</h2></NavLink></li></>
                                })}
                            </ul>                            
                        </div>
                        <ReactPaginate 
                                PreviousLabel={'Previous'}
                                nextLabel={'Next'}
                                pageCount = {value.buttonCount}
                                onPageChange={changePage}
                                containerClassName={'paginationBttns'}
                                previousLinkClassName={'previousBttn'}
                                nextLinkClassName={'nextBttn'}
                                disabledClassName={'paginationDisabled'}
                                activeClassName={'paginationActive'}
                            /> 
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default SearchResults;
