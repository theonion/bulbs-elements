import React from 'react';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import <%= componentClassName %> from './<%= componentPathName %>';

describe('<<%= elementName %>> <<%= componentClassName %>>', function () {
	context('default', function () {
		it('renders', function () {
			let props = {};

			assertJSXEqual(this.test.title, <<%= componentClassName %> {...props} />,
				<div>
				</div>
			);
		})
	});
});
