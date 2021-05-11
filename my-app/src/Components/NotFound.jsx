import React, { useContext } from 'react';
import Context from '../context';

const NotFound = () => {

    const { value } = useContext(Context);

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                {value.movies.slice(0,8).map(movie => {return <img className='tile'src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title} key={movie.id}></img>})}
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form--centered">
                                <h1 id="uc-heading">Oops, Wrong Turn!</h1>
                                <p /> <h2>The page you are looking for doesnt exist, please tray again</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default NotFound;