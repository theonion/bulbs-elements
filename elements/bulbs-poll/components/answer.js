import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Answer (props) {
  let {
    answer,
    selectAnswer,
    selectedAnswer,
  } = props;

  let className = classnames('bulbs-poll-answer', {
    selected: answer === selectedAnswer,
  });

  return (
    <li
      className={className}
      onClick={selectAnswer.bind(null, answer)}
    >
      { answer.answer_text }
    </li>
  );
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.object,
};
