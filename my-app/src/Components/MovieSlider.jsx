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
                return <ul><li className='col-md-12 main-image' key={movie.id}><NavLink to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img></NavLink></li>
                <li className="col-md-12 main-title"><NavLink to={`/movie/${movie.id}`}><h2 className="maintitle">{movie.title}</h2></NavLink></li>
                <li className="col-md-12 main-desc">{`${movie.overview.substring(350,0)}...`}<p /></li></ul>
            })}
        </Carousel>
    )
}

export default MovieSlider;