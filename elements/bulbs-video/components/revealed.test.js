import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Revealed from './revealed';

describe('<bulbs-video> <Revealed>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <Revealed {...props} />,
        <div className='bulbs-video-revealed'>
        </div>
      );
    })
  });
});
