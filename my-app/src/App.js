import React, { useContext } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Header from './Components/Header';
import Movies from './Components/Movies';

function App() {
  return (
    <>
    <Header />
    <Switch>
      <Route exact path='/' component={Movies} />
    </Switch>
    </>
  );
}

export default App;
