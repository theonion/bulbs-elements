import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import './<%= componentPathName %>';

describe('<<%= elementName %>> <<%= componentClassName %>>', function () {
  context('default', function () {
    it('renders', function () {
      let props = {};

      assertJSXEqual(this.test.title, <<%= componentClassName %> {...props} />,
        <div className='<%= componentCssClassName %>'>
        </div>
      );
    })
  });
});
