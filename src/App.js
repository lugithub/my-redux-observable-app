import React from 'react';
import { connect } from 'react-redux';

import Ping from './ping/ping';
import './App.css';

let App = ({ timestamp }) => <Ping timestamp={timestamp}/>;

const mapStateToProps = ({ ping: { timestamp }}) => ( { timestamp });

App = connect(mapStateToProps)(App);

export default App;
