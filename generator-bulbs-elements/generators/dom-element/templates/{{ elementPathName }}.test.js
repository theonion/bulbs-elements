import { assert } from 'chai';

describe('<<%= elementName %>>', function () {
  let element;
  let container;

	beforeEach(function (done) {
    element = document.createElement('<%= elementName %>')
	});

	it('renders an <<%= elementName %>>', function () {
		assert.equal(this.element.tagName.toLowerCase(), '<%= elementName %>');
	});
});
