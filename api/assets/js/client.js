/* global window document */
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const AppComponent = require('./components/app.jsx');


const App = React.createFactory(AppComponent);
const mountNode = document.getElementById('app-mount');
const serverState = window.state;


ReactDOM.hydrate(App(serverState), mountNode);