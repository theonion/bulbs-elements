import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import Results from './results';

describe('<bulbs-poll> <Results>', function () {
	context('default', function () {
		it('renders', function () {
			let props = {};

			assertJSXEqual(this.test.title, <Results {...props} />,
				<div>
				</div>
			);
		})
	});
});
