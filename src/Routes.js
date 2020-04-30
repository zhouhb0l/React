import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Tic from './Tic/Tic';
import Game24 from './Game24/Game24';
import LineOrSquare from './LineOrSquare/LineOrSquare';
import GameOfLife from './GameOfLife/GameOfLife';

import history from './history';

class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/Game24" component={Game24} />
          <Route path="/Tic" component={Tic} />
          <Route path="/LineOrSquare" component={LineOrSquare} />
          <Route path="/GameOfLife" component={GameOfLife} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
