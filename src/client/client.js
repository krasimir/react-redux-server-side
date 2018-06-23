import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import createStore from './store';

// Rendering
ReactDOM.render(<Provider store={ createStore() }><App /></Provider>, document.querySelector('#content'));