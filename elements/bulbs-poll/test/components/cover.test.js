import Cover from '../../components/cover';
import React from 'react';
import CroppedImage from 'bulbs-elements/components/cropped-image';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';

describe('<bulbs-poll> <Cover>', function () {
  context('with a thumbnail', function () {
    it('renders a cover with a thumbnail', function () {
      let poll = {
        data: {
          thumbnail: {},
          question_text: 'Question?',
        },
      };

      assertJSXEqual(this.test.title, <Cover poll={poll} />,
        <header className="bulbs-poll-cover">
          <CroppedImage image={poll.data.thumbnail} />
          <h1 className="bulbs-poll-cover-title">Question?</h1>
        </header>
      );
    });
  });

  context('without a thumbnail', function () {
    it('renders a cover without a thumbnail', function () {
      let poll = {
        data: {
          question_text: 'Question?',
        },
      };

      assertJSXEqual(this.test.title, <Cover poll={poll} />,
        <header className="bulbs-poll-cover">
          { null }
          <h1 className="bulbs-poll-cover-title">Question?</h1>
        </header>
      );
    });
  });
});
