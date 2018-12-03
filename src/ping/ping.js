import React from 'react';
import { connect } from 'react-redux';

import { ping } from './actions';

let Ping = ({ isPinging, ping }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Start PING</button>
  </div>
);

Ping = connect(
  ({ ping: { isPinging }}) => ({ isPinging }),
  { ping }
)(Ping);

export default Ping;
