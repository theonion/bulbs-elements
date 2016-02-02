import React, { PropTypes } from 'react';
import register from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';
import './<%= elementName %>.scss';

import <%= elementClassName %>Store from './store';

class <%= elementClassName %> extends BulbsElement {
  initialDispatch () {
    // this.store.actions.initialAction();
  }

  render () {
    return (
      <div>
        <h1> Calling from inside <code><%= elementName %>/<%= elementName %>.js</code> </h1>
      </div>
    );
  }
}

<%= elementClassName %>.displayName = '<%= elementClassName %>';

<%= elementClassName %>.store = <%= elementClassName %>Store;

<%= elementClassName %>.propTypes = {

};

register('<%= elementName %>', <%= elementClassName %>);

