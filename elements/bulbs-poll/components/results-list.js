import React, { PropTypes } from 'react';
import Result from './result';
import ImageResult from './image-result';
import classnames from 'classnames';

export default function ResultsList (props) {
  let {
    poll,
    winningAnswers,
    vote,
  } = props;
  let ResultType = Result;
  let ListType = 'bulbs-poll-results-list';
  if(props.poll.data.answer_type === 'imageText') {
    ResultType = ImageResult;
    ListType = 'bulbs-poll-image-results-list';
  }
  return (
    <ul className={ListType}>
      {
        poll.data.answers.map((answer, index) => {
          return <ResultType
            key={index}
            answer={answer}
            poll={poll}
            vote={vote}
            winningAnswers={winningAnswers}
          />;
        })
      }
    </ul>
  );
}

ResultsList.propTypes = {
  poll: PropTypes.object.isRequired,
  vote: PropTypes.object.isRequired,
  winningAnswers: PropTypes.array.isRequired,
};
