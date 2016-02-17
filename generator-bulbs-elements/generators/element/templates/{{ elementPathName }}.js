import React, { PropTypes } from 'react';
import BulbsElement from 'bulbs-elements/bulbs-element';
import register from 'bulbs-elements/register';
import './<%= elementPathName %>.scss';

import <%= elementClassName %>Store from './<%= elementPathName %>-store';

class <%= elementClassName %> extends BulbsElement {
  initialDispatch () {
    // Dispatch  your initial store actions here, they will
    // trigger when the element is created.
    // (good for fetching data from a cache, or network)
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

export default <%= elementClassName %>;
