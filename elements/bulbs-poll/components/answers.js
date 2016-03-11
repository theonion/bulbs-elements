import React, { PropTypes } from 'react';
import Answer from './answer';
import ImageAnswer from './image-answer';
import classnames from 'classnames';

export default function Answers (props) {
  let classNames = classnames('bulbs-poll-answers', {
    'bulbs-poll-answers-selected': props.selectedAnswer.id,
  });
  let AnswerType = Answer;
  if (props.poll.data.answer_type === 'imageText') {
    AnswerType = ImageAnswer;
  }
  return (
    <ul className={classNames}>
      {
        props.answers.map((answer, index) => {
          return <AnswerType
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
  poll: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.object.isRequired,
};
