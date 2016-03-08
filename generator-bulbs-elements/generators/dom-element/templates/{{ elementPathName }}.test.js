import { assert } from 'chai';

describe('<<%= elementName %>>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('<%= elementName %>');
  });

  it('renders an <<%= elementName %>>', function () {
    assert.equal(element.tagName.toLowerCase(), '<%= elementName %>');
  });
});
