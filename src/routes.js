import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from "./helpers/history";
import Ecommerce from './screens/ecommerce/index'
import DetailPokemon from './screens/detail-pokemon/index'


export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={(props) => <Ecommerce {...props} />} />
        <Route path="/detail-pokemon" component={(props) => <DetailPokemon {...props} />} />
      </Switch>
    </Router>
  );
}

