import React, { PropTypes } from 'react';
import BulbsElement from 'bulbs-elements/bulbs-element';
import register from 'bulbs-elements/register';
import './sample-element.scss';

import SampleElementStore from './store';

class SampleElement extends BulbsElement {
  initialDispatch () {
    this.store.actions.initialAction();
  }

  render () {
    let {
      sample,
    } = this.state;

    return (
      <div>
        <h1>Check out this sick example!</h1>
        <h2>Check out these things:</h2>
        <hr/>
        <ul>
          {
            sample.things.map((thing, index) => {
              return <li key={index}>
                { thing }
              </li>;
            })
          }
        </ul>
      </div>
    );
  }
}

SampleElement.displayName = 'SampleElement';

SampleElement.store = SampleElementStore;

SampleElement.propTypes = {

};

register('sample-element', SampleElement);

export default SampleElement;
