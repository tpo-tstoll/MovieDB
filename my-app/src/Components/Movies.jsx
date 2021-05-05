import React, { useContext, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import api from '../utils/api';
import Context from '../context';


const Movies = () => {

	const {value} = useContext(Context);
	
	let d = new Date();
	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                    <div className="row">
                        <div className="col-md-12">
							<div className="slider">
								<ul className="slides">
                                    {value.movies.map(movie => {
                                       return <li className='col-md-4' key={movie.id}><NavLink to={`/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img>
                                       <p /><h2 className='maintitle'>{movie.title}</h2></NavLink>
                                       {movie.overview}<p /></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="row">
							<div className="col-md-4">
								<h2 className="section-title">{months[d.getMonth()]} premiere</h2>
								<p>Popular movies premiering in {months[d.getMonth()]}:</p>
								<ul className="movie-schedule">
									{value.upcoming.slice(0,4).map(movie => {
											return <li key={movie.id}>
												<div className="date">{movie.release.substring(5)}</div>
												<h2 className="entry-title"><NavLink to={`/${movie.id}`}>{movie.title}</NavLink></h2>
											</li>	
									})}
								</ul>
							</div>
							<div className="col-md-4">
								<h2 className="section-title">{months[d.getMonth() + 1]} premiere</h2>
								<p>Popular movies premiering in {months[d.getMonth() + 1]}:</p>
								<ul className="movie-schedule">
									{value.upcoming.slice(4,8).map(movie => {
												return <li key={movie.id}>
													<div className="date">{movie.release.substring(5)}</div>
													<h2 className="entry-title"><NavLink to={`/${movie.id}`}>{movie.title}</NavLink></h2>
												</li>	
										})}
								</ul>
							</div>
							<div className="col-md-4">
								<h2 className="section-title">{months[d.getMonth() + 2]} premiere</h2>
								<p>Popular movies premiering in {months[d.getMonth() + 2]}:</p>
								<ul className="movie-schedule">
									{value.upcoming.slice(8,12).map(movie => {
										return <li key={movie.id}>
											<div className="date">{movie.release.substring(5)}</div>
											<h2 className="entry-title"><NavLink to={`/${movie.id}`}>{movie.title}</NavLink></h2>
										</li>	
									})}
								</ul>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </main>
);
}

export default Movies;