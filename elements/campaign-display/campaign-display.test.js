import { assert } from 'chai';

describe('<campaign-display>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('campaign-display');
  });

  it('renders an <campaign-display>', function () {
    assert.equal(element.tagName.toLowerCase(), 'campaign-display');
  });
});
