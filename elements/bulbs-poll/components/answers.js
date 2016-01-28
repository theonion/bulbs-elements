import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Answers (props) {
  return (
    <ul className="bulbs-poll-answers">
      {
        props.answers.map((answer, index) => {
          return <Answer
            key={index}
            answer={answer}
            {...props}
          />;
        })
      }
    </ul>
  );
}

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.object,
};

export function Answer (props) {
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

