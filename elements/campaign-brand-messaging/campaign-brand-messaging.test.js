import { assert } from 'chai';

describe('<campaign-brand-messaging>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('campaign-brand-messaging');
  });

  it('renders an <campaign-brand-messaging>', function () {
    assert.equal(element.tagName.toLowerCase(), 'campaign-brand-messaging');
  });
});
