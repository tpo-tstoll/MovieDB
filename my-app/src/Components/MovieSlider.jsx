import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const MovieSlider = () => {

	const {value} = useContext(Context);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3
        }
      };

    return (
        
        <Carousel responsive={responsive}>
            {value.movies.map(movie => {
                return <li className='col-md-12' key={movie.id}><NavLink to={`/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img>
                <p /><h2 className='maintitle'>{movie.title}</h2></NavLink>
                {`${movie.overview.substring(350,0)}...`}<p /></li>
            })}
        </Carousel>
    )
}

export default MovieSlider;