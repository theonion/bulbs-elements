import React, { PropTypes } from 'react';
import Answer from './answer';
import classnames from 'classnames';

export default function Answers (props) {
  let classNames = classnames('bulbs-poll-answers', {
    'bulbs-poll-answers-selected': props.selectedAnswer.id,
  });
  return (
    <ul className={classNames}>
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
  selectedAnswer: PropTypes.object.isRequired,
};
