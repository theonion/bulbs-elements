import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Loading from './loading';

describe('<bulbs-poll> <Loading>', function () {
  context('default', function () {
    it('renders', function () {
      assertJSXEqual(this.test.title, <Loading/>,
        <div className='bulbs-poll-loading'>
          Loading Poll...
        </div>
      );
    });
  });
});
