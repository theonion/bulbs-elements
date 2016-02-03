import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Result (props) {
  let className = classnames('bulbs-poll-result', {});
  let {
    answer,
    poll,
  } = props;
  let percentResult = `${(answer.total_votes / poll.total_votes) * 100}%`;

  return (
    <div className={className}>
      <div
        className='bulbs-poll-answer-bar'
        style={{ width: percentResult }}
      />
      <p className='bulbs-poll-answer-title'>
        <span className='bulbs-poll-answer-result'>
          { percentResult }
        </span>
        { answer.answer_text }
      </p>
    </div>
  );
}

Result.propTypes = {
  answer: PropTypes.object.isRequired,
  poll: PropTypes.object.isRequired,
};
