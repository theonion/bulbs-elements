import { createRenderer } from 'react-addons-test-utils';
import React from 'react';

import DfpPixel from './dfp-pixel';

// TODO : looks like this:
// <div
//     data-ad-unit-"{{ adUnitName }}"
//     data-targeting="{{ targetingObj }}">
// </div>

describe('<campaign-display> <DfpPixel>', () => {

  let adUnitName = 'my-favorite-ad-unit';
  let shallowRenderer = createRenderer();

  context('ad unit name', () => {

    it('should render that attribute in the dfp pixel div', function () {

      shallowRenderer.render(<DfpPixel adUnitName={ adUnitName } />);

      expect(shallowRenderer.getRenderOutput().props['data-ad-unit'])
        .to.equal(adUnitName);
    });

    it('should be required', function () {

      // TODO : add test code here
      throw new Error('Not implemented yet.');
    });
  });

  context('targeting parameters', () => {

    it('should render that attribute in the dfp pixel div', function () {
      let targetingParams = {
        dfp_param_1: 'my garbage ad',
        dfp_param_2: 'some garbage parameter',
      };

      shallowRenderer.render(
        <DfpPixel
          adUnitName={ adUnitName }
          targetingParams={ targetingParams } />
      );

      expect(shallowRenderer.getRenderOutput().props['data-targeting'])
        .to.eql(targetingParams);
    });

    it('should not render if not provided', function () {

      shallowRenderer.render(<DfpPixel adUnitName={ adUnitName } />);

      expect(shallowRenderer.getRenderOutput().props['data-targeting']).to.be.undefined;
    });
  });
});
