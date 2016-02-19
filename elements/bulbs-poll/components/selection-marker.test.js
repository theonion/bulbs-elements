import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import SelectionMarker from './selection-marker';

describe('<bulbs-poll> <SelectionMarker>', function () {
  context('is selected', function () {
    it('renders as selected', function () {
      let props = {
        isSelected: true,
      };

      assertJSXEqual(this.test.title, <SelectionMarker {...props} />,
        <svg width="20px" height="20px">
          <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
          <circle cx="10" cy="10" r="5" fill="black" />
        </svg>
      );
    })
  });

  context('is not selected', function () {
    it('renders as not selected', function () {
      let props = {
        isSelected: false,
      };

      assertJSXEqual(this.test.title, <SelectionMarker {...props} />,
        <svg width="20px" height="20px">
          <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
          <circle cx="10" cy="10" r="5" fill="none" />
        </svg>
      );
    })
  });
});
