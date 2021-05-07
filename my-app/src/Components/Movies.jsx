import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context';

import MovieSlider from './MovieSlider';

const Movies = () => {

	const {value} = useContext(Context);
	
	//Get current date and set options to dynamically update premier headers in return
	let d = new Date();
	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                    <div className="row">
                        <div className="col-md-12">
							<h1 className='today'>Popular Titles Today:</h1>
							<div className="slider">
								<ul className="slides">
									<MovieSlider />
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
												<h2 className="entry-title"><NavLink to={`/movie/${movie.id}`}>{movie.title}</NavLink></h2>
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
													<h2 className="entry-title"><NavLink to={`/movie/${movie.id}`}>{movie.title}</NavLink></h2>
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
											<h2 className="entry-title"><NavLink to={`/movie/${movie.id}`}>{movie.title}</NavLink></h2>
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