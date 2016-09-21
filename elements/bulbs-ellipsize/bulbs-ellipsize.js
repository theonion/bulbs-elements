import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import React, { PropTypes } from 'react';
import invariant from 'invariant';

class BulbsEllipsize extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.getAttribute('line-count'),
      'BulbsEllipsize: Expects a line-count attribute');
    invariant(this.getAttribute('text'),
      'BulbsEllipsize: Expects a text attribute');
  }
    render () {
      return (
        <Truncate
          lines={this.getAttribute('line-count') || 3 }>
          {this.getAttribute('text')}
        </Truncate>
      );
    }
};

registerElement('bulbs-ellipsize', BulbsEllipsize);
export default BulbsEllipsize;
