import React from 'react';
import { connect } from 'react-redux';

import { getIsOpen } from './selectors';
import { toggle } from './actions';

import './admin.css';

export let Foo = ( { isOpen, toggle }) => (<div className="admin">
  admin {isOpen.toString()}
  <div>
    <button
      onClick={() => {
        toggle();
      }}>toggle
    </button>
  </div>
</div>);

function mapState(state) {
  const isOpen = getIsOpen(state);
  return {
    isOpen,
  };
}

const mapDispatch = {
  toggle,
}

export default connect(mapState, mapDispatch)(Foo);
