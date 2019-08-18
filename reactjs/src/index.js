import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/css/index.css';
import 'mdbreact/dist/css/mdb.css';
import "./assets/scss/mdb.scss";

import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Other custom library
String.prototype.slugify = function() {
  return this.trim().replace(/[\W_]+/g, '-').toLowerCase();
}
