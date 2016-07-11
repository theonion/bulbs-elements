import React, { PropTypes } from 'react';
import invariant from 'invariant';

import BulbsElement from 'bulbs-elements/bulbs-element';
import { registerReactElement } from 'bulbs-elements/register';
import { filterBadResponse } from 'bulbs-elements/util';

import Contestants from './fields/contestants-field';

class ClickholeMedalTracker extends BulbsElement {
  constructor (props) {
    invariant(!!props.src, 'clickhole-medal-tracker component requires a src');
    super(props);
  }

  initialDispatch () {
    fetch(this.props.src)
      .then(filterBadResponse)
      .then(this.handleRequestSuccess)
      .catch(this.handleRequestError);
  }

  handleRequestSuccess (response) {
    debugger
  }

  handleRequestError (response) {

  }

  render () {
    return <div className='clickhole-medal-tracker'>Clickhole Medal Tracker</div>;
  }
}

Object.assign(ClickholeMedalTracker, {
  displayName: 'ClickholeMedalTracker',
  schema: {
    contestants: Contestants,
  },
  propTypes: {
    src: PropTypes.string.isRequired,
  },
});

registerReactElement('clickhole-medal-tracker', ClickholeMedalTracker);

export default ClickholeMedalTracker;
export const displayPropType = ClickholeMedalTracker.propTypes.display;
