import { assert } from 'chai';
import testElement from 'bulbs-elements/test/element';

testElement('<<%= elementName %>>', function () {
	beforeEach(function (done) {
		this.element = this.renderElement({
			done,
			tag: '<%= elementName %>',
			props: {
				// src: '/whatever.json',
			},
		});

		this.actions = this.element.reactElement.store.actions;
	});

	it('renders an <<%= elementName %>>', function () {
		assert.equal(this.element.tagName.toLowerCase(), '<%= elementName %>');
	});
});
