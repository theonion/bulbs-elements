import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SelectionMarker from './selection-marker';

export default function Result (props) {
  let {
    answer,
    poll,
    vote,
    winningAnswers,
  } = props;
  let isWinningAnswer = winningAnswers.find((winningAnswer) => {
    return winningAnswer.sodahead_id === answer.sodahead_id;
  });

  let isVoteAnswer = vote.answer && vote.answer.id === answer.sodahead_id ? true : false;

  let className = classnames('bulbs-poll-result', {
    'bulbs-poll-result-winning': isWinningAnswer,
    'bulbs-poll-result-selected': isVoteAnswer,
  });
  let { total_votes } = answer;
  let percent = (total_votes / poll.data.total_votes) * 100;
  let percentResult = `${percent.toFixed(0)}%`;

  return (
    <div className={className}>
      <div
        className='bulbs-poll-answer-bar'
        style={{ width: percentResult }}
      />
      <div className='bulbs-poll-answer-title'>
        <span className='bulbs-poll-answer-result'>
          { percentResult }
        </span>
        <p>
          <SelectionMarker isSelected={isVoteAnswer}/>
          { answer.answer_text }
        </p>
      </div>
    </div>
  );
}

Result.propTypes = {
  answer: PropTypes.object.isRequired,
  poll: PropTypes.object.isRequired,
  vote: PropTypes.object.isRequired,
  winningAnswers: PropTypes.array.isRequired,
};
