import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Cover from './cover';

describe('<bulbs-video> <Cover>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <Cover {...props} />,
        <div className='bulbs-video-cover'>
        </div>
      );
    })
  });
});
