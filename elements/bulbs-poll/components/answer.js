import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SelectionMarker from './selection-marker';

export default function Answer (props) {
  let {
    answer,
    selectAnswer,
    selectedAnswer,
  } = props;

  let isSelected = answer.id === selectedAnswer.id;
  let className = classnames('bulbs-poll-answer', {
    'bulbs-poll-answer-selected': isSelected,
  });

  return (
    <li
      data-track-label='Option'
      className={className}
      onClick={selectAnswer.bind(null, answer)}
    >
      <SelectionMarker isSelected={isSelected} />
      { answer.answer_text }
    </li>
  );
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.object,
};
