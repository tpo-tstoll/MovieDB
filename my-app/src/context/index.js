import React, { useState } from 'react';

const Context = React.createContext();

export const ContextProvider = props => {

    const [ movies, setMovies ] = useState([{
        title: '',
        overview: '',
        image: ''
    }])

    const value = {
        movies,
        setMovies
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;