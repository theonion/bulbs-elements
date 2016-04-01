import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Root from './root';

describe('<bulbs-video> <Root>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <Root {...props} />,
        <div className='bulbs-video-root'>
        </div>
      );
    })
  });
});
