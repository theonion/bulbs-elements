import React, { PropTypes } from 'react';
import Answer from './answer';

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
