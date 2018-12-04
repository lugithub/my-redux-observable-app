import React from 'react';
import { connect } from 'react-redux';

import Ping from './ping/ping';
import './App.css';
import { getTimestamp } from './ping/selectors';

import Foo from './admin/foo';

let App = ({ timestamp }) => (<React.Fragment>
  <Ping timestamp={timestamp}/>
  <Foo />
</React.Fragment>);


const mapStateToProps = state => {
  const timestamp = getTimestamp(state);
  return { timestamp };
};

App = connect(mapStateToProps)(App);

export default App;
