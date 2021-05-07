import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer'
import Movies from './Components/Movies';
import MovieDetail from './Components/MovieDetail'
import SearchResults from './Components/SearchResults';
import SignIn from './Components/SignIn';

function App() {

  
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Movies} />
        <Route exact path={'/movie/:id'} component={MovieDetail} />
        <Route path='/search/' component={SearchResults} />
        <Route exact Path='/signin' component={SignIn} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
