import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ping, timer } from './actions';

// ping is the action dispatching function, not the action creator any more
// however, the arguments will still be passed to the action creator

let Ping = ({ isPinging, ping, timestamp }) => (
  <div>
    {timestamp}
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={
      ping.bind(null, 3)
    }>Start PING</button>
  </div>
);

// mapDispatchToProps 1, an object. the recommended way.

const mapDispatchToProps = { 
  ping 
};


// mapDispatchToPros 2, a function

// function mapDispatchToProps(dispatch) {
//   return {
//     ping: function(...parameters) {
//       dispatch(ping.apply(null, parameters));
//     },
//     ping: bindActionCreators(ping, dispatch),
//   };
// }

// mapDispatchToPros 3, a function

// ownPros is the one passed to the connected component
// e.g. let App = ({ timestamp }) => <Ping timestamp={timestamp}/>;

// function mapDispatchToProps(dispatch, ownProps) {
  
//   setTimeout(() => dispatch(timer()), 3000);

//   return {
//     ping: function (...parameters) {
//       dispatch(ping.apply(this, parameters))
//     },
//     ping: bindActionCreators(ping, dispatch),
//   };

//   return bindActionCreators({
//     ping,
//   }, dispatch);
// }

Ping = connect(
  ({ ping: { isPinging } }) => ({ isPinging }),
  mapDispatchToProps
)(Ping);

export default Ping;
