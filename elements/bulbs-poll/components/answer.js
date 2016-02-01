import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Answer (props) {
  let {
    answer,
    selectAnswer,
    selectedAnswer,
  } = props;


  let isSelected = answer.id === selectedAnswer.id;
  let className = classnames('bulbs-poll-answer', {
    selected: isSelected,
  });

  return (
    <li
      className={className}
      onClick={selectAnswer.bind(null, answer)}
    >
      <svg width="20px" height="20px">
        <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
        <circle cx="10" cy="10" r="5" fill={isSelected ? 'black' : 'none' } />
      </svg>
      { answer.answer_text }
    </li>
  );
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.object,
};
