// Reference https://gist.github.com/shelldandy/02ad1a9f8b5b86d1b2e4dd26a11967b2
import React from 'react';
import { Route } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import './AppRoute.scss';

class AppRoute extends React.Component {
  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    return (
      <Route {...this.props} />
    );
  }
}

export default AppRoute;
