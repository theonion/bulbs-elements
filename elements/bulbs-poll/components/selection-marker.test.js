import React from 'react';
import { shallow } from 'enzyme';

import SelectionMarker from './selection-marker';

describe('<bulbs-poll> <SelectionMarker>', function() {
  context('is selected', function() {
    it('renders as selected', function() {
      let props = {
        isSelected: true,
      };

      expect(shallow(<SelectionMarker {...props} />).equals(
        <svg width="20px" height="20px">
          <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
          <circle cx="10" cy="10" r="5" fill="black" />
        </svg>
      )).to.be.tru;
    });
  });

  context('is not selected', function() {
    it('renders as not selected', function() {
      let props = {
        isSelected: false,
      };

      expect(shallow(<SelectionMarker {...props} />).equals(
        <svg width="20px" height="20px">
          <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
          <circle cx="10" cy="10" r="5" fill="none" />
        </svg>
      )).to.be.true;
    });
  });
});
