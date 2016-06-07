import React, { PropTypes } from 'react';

export default function Cover(props) {
  let { poll } = props;
  return (
    <header className="bulbs-poll-cover">
      <h1 className="bulbs-poll-cover-title">
        { poll.data.question_text }
      </h1>
    </header>
  );
}

Cover.propTypes = {
  poll: PropTypes.object.isRequired,
};

