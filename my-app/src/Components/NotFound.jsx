import React, { useContext } from 'react';
import { motion } from "framer-motion";
import Context from '../context';

const NotFound = () => {

    const { value } = useContext(Context);

    
    const divVariant = {
        hidden: { x: "100vw", opacity: 0, transition: { staggerChildren: 4 } },
        show: {
            x: 0,
            opacity: 1,
            rotate: 1080,
            transition: {
                staggerChildren: 0.3,
                type: "spring",
                stiffness: 35,
                ease: "easeOut",
                duration: 0.25
            }
        }
    };

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                {value.movies.slice(0,8).map(movie => {return <img className='tile'src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title} key={movie.id}></img>})}
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <motion.div
                                    variants={divVariant}
                                    initial="hidden"
                                    animate="show"
                                    className="form--centered"
                            >  
                                <h1 id="uc-heading">Oops, Wrong Turn!</h1>
                                <p /> <h2>The page you are looking for doesnt exist, please tray again</h2>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default NotFound;