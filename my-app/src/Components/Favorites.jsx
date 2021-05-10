import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Context from '../context';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Favorites = () => {

    const {value} = useContext(Context);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 5
        }
      };

      const carouselItems =[]

      const addPagination = () => {
        const numOfButtons = Math.ceil(value.favorites.length/5);
      
        for (let i=1; i <= numOfButtons; i++) {
            carouselItems.push(i);
        };
      }

    const CustomDot = ({ onClick, ...rest }) => {
        const {
            index,
            active,
        } = rest;
        addPagination();
        return (
            <button
            className={`pagination ${active ? "active" : "inactive"}`}
            onClick={() => onClick()}
            >
            {React.Children.toArray(carouselItems)[index]}
            </button>
        );
    };
    
    return (
        <main className="main-content">
        <div className="container">
            <div className="page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="slider">
                        <h2>Your Favorites: {value.favorites.length}</h2>
                            <Carousel responsive={responsive} showDots customDot={<CustomDot />}>
                                {value.favorites.map(movie => {
                                   return <ul className="slides"> <li className='col-md-12 search-col-centered' key={movie.movieId}><NavLink to={`/movie/${movie.movieId}`}><img src={movie.image ? `https://image.tmdb.org/t/p/original${movie.image}` : '/1.jpg'} alt={movie.title}></img></NavLink></li>
                                   <li className="col-md-12 search-title"><NavLink to={`/${movie.movieId}`}><h2 className="maintitle">{movie.title.length > 35 ? `${movie.title.substring(0,35)}...` : movie.title}</h2></NavLink></li></ul>
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

export default Favorites;