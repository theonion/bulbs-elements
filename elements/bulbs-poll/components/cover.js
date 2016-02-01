import React, { PropTypes } from 'react';
import CroppedImage from 'bulbs-elements/components/cropped-image';

export default function Cover (props) {
  let { poll } = props;
  return (
    <header className="bulbs-poll-cover">
      {
        poll.data.thumbnail ? <CroppedImage image={poll.data.thumbnail} /> : undefined
      }
      <h1 className="bulbs-poll-cover-title">
        { poll.data.question_text }
      </h1>
    </header>
  );
}

Cover.propTypes = {
  poll: PropTypes.object.isRequired,
};

