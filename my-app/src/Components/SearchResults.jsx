import React, { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const SearchResults = () => {

    const {value} = useContext(Context);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 5
        }
      };

    return (
        <main className="main-content">
        <div className="container">
            <div className="page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="slider">
                        <h2>Search Results: {value.searchResults.length}</h2>
                            <Carousel responsive={responsive} showDots={true}>
                                {value.searchResults.map(movie => {
                                   return <ul className="slides"> <li className='col-md-12 search-col-centered' key={movie.id}><NavLink to={`/${movie.id}`}><img src={movie.image ? `https://image.tmdb.org/t/p/original${movie.image}` : '/1.jpg'} alt={movie.title}></img></NavLink></li>
                                   <li className="col-md-12 search-col-centered"><NavLink to={`/${movie.id}`}><h1 className='maintitle'>{movie.title.length > 35 ? `${movie.title.substring(0,35)}...` : movie.title}</h1>
                                   <h3 className='maintitle'>Year: {movie.year ? movie.year.substring(0,4) : 'No Year Available'}</h3></NavLink></li></ul>
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default SearchResults;
