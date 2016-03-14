import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SelectionMarker from './selection-marker';

export default function ImageAnswer (props) {
  let {
    answer,
    selectAnswer,
    selectedAnswer,
  } = props;

  let isSelected = answer.id === selectedAnswer.id;
  let className = classnames('bulbs-poll-image-answer', {
    'bulbs-poll-answer-selected': isSelected,
  });

  return (
    <li
      data-track-label='Option'
      className={className}
      onClick={selectAnswer.bind(null, answer)}
    >
      <img src={ answer.answer_image_url }/>
      <div className="answer-image-text">
        <SelectionMarker isSelected={isSelected} />
        { answer.answer_text }
      </div>
    </li>
  );
}

ImageAnswer.propTypes = {
  answer: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.object,
};
