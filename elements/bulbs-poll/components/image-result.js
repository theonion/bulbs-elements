import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SelectionMarker from './selection-marker';
import find from 'array-find';

export default function ImageResult (props) {
  let {
    answer,
    poll,
    vote,
    winningAnswers,
  } = props;

  let isWinningAnswer = find(winningAnswers, (winningAnswer) => {
    return winningAnswer.sodahead_id === answer.sodahead_id;
  });

  let isVoteAnswer = !!(vote.data && vote.data.answer.id === answer.sodahead_id);

  let className = classnames('bulbs-poll-image-result', {
    'bulbs-poll-result-winning': isWinningAnswer,
    'bulbs-poll-result-selected': isVoteAnswer,
  });
  let { total_votes } = answer;
  let percent = (total_votes / poll.data.total_votes) * 100;
  let percentResult = `${percent.toFixed(0)}%`;

  return (
    <li className={className}>
      <div className="result-image-list-item">
        <div
          className='bulbs-poll-image-answer-bar'
          style={{ height: percentResult }}
        />
        <div className='bulbs-poll-image-answer-title'>
          <img src={ answer.answer_image_url } />
          <div className="answer-image-text">
            <SelectionMarker isSelected={isVoteAnswer}/>
            <span className='bulbs-poll-image-answer-text'>
              { answer.answer_text }
            </span>
          </div>
        </div>
      </div>
      <div className='bulbs-poll-answer-result'>
        { percentResult }
      </div>
    </li>
  );
}

ImageResult.propTypes = {
  answer: PropTypes.object.isRequired,
  poll: PropTypes.object.isRequired,
  vote: PropTypes.object.isRequired,
  winningAnswers: PropTypes.array.isRequired,
};
