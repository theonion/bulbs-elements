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

  let isVoteAnswer = !!(vote.data && vote.data.answer.id === answer.sodahead_id);

  let className = classnames('bulbs-poll-result', {
    'bulbs-poll-result-winning': isWinningAnswer,
    'bulbs-poll-result-selected': isVoteAnswer,
  });
  let { total_votes } = answer;
  let percent;
  if(poll.data.total_votes > 1) {
    percent = (total_votes / poll.data.total_votes) * 100;
  }
  else {
    percent = total_votes * 100;
  }
  let percentResult = `${percent.toFixed(0)}%`;

  return (
    <li className={className}>
      <div
        className='bulbs-poll-answer-bar'
        style={{ width: percentResult }}
      />
      <div className='bulbs-poll-answer-title'>
        <SelectionMarker isSelected={isVoteAnswer}/>
        <span className='bulbs-poll-answer-text'>
          { answer.answer_text }
        </span>
        <span className='bulbs-poll-answer-result'>
          { percentResult }
        </span>
      </div>
    </li>
  );
}

Result.propTypes = {
  answer: PropTypes.object.isRequired,
  poll: PropTypes.object.isRequired,
  vote: PropTypes.object.isRequired,
  winningAnswers: PropTypes.array.isRequired,
};
