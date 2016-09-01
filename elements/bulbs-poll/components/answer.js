import React, { PropTypes } from 'react';
import classnames from 'classnames';
import SelectionMarker from './selection-marker';

export default class Answer extends React.Component {
  selectAnswer () {
    this.props.selectAnswer(this.props.answer);
  }

  render () {
    let {
      answer,
      selectedAnswer,
    } = this.props;

    let isSelected = answer.id === selectedAnswer.id;
    let className = classnames('bulbs-poll-answer', {
      'bulbs-poll-answer-selected': isSelected,
    });

    return (
      <li
        data-track-label='Option'
        className={className}
        onClick={this.selectAnswer.bind(this)}
      >
        <SelectionMarker isSelected={isSelected} />
        { answer.answer_text }
      </li>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.object,
};
