import React from 'react';
import { shallow } from 'enzyme';

import Cover from './cover';

describe('<bulbs-poll> <Cover>', function() {
  it('renders a cover without a thumbnail', function() {
    let poll = {
      data: {
        question_text: 'Question?',
      },
    };

    expect(shallow(<Cover poll={poll} />).equals(
      <header className="bulbs-poll-cover">
        { null }
        <h1 className="bulbs-poll-cover-title">Question?</h1>
      </header>
    )).to.be.true;
  });
});
