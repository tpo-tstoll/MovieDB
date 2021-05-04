import React, { useContext } from 'react';
import { Switch, Route} from 'react-router-dom';
import Context from './context';

import Header from './Components/Header';
import Footer from './Components/Footer'
import Movies from './Components/Movies';
import MovieDetail from './Components/MovieDetail'
import SearchResults from './Components/SearchResults';

function App() {

  const {value} = useContext(Context);
  
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Movies} />
        <Route exact path={'/:id'} component={MovieDetail} />
        <Route path='/search/' component={SearchResults} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
