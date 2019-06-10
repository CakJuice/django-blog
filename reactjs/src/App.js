import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes';
import AppRoute from './AppRoute';
import NavbarAdmin from './components/NavbarAdmin';

const App = props =>
  <Router>
    <NavbarAdmin />
    <Switch>
      {routes.map((route, i) =>
        <AppRoute key={i} {...route} />
      )}
    </Switch>
  </Router>

export default App;
