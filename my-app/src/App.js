import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer'
import Movies from './Components/Movies';
import MovieDetail from './Components/MovieDetail'
import SearchResults from './Components/SearchResults';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp'
import SignOut from './Components/SignOut';
import Favorites from './Components/Favorites';
import About from './Components/About';
import NotFound from './Components/NotFound';

function App() {

  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Movies} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signout' component={SignOut} />
        <Route exact path='/favorites' component={Favorites} />
        <Route exact path='/about' component={About} />
        <Route exact path={'/movie/:id'} component={MovieDetail} />
        <Route path='/search/' component={SearchResults} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default withRouter(App);
