import React, { PropTypes } from 'react';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './<%= elementPathName %>.scss';

class <%= elementClassName %> extends BulbsHTMLElement {
  createdCallback () {

  }

  attachedCallback () {

  }

  detachedCallback () {

  }

  attributeChangedCallback (name, previousValue, value) {

  }
}

registerElement('<%= elementName %>', <%= elementClassName %>);

export default <%= elementClassName %>;
