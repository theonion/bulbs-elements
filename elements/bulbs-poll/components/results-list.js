import React, { PropTypes } from 'react';
import Result from './result';

export default function ResultsList (props) {
  let {
    poll,
    winningAnswers,
    vote,
  } = props;

  return (
    <ul className='bulbs-poll-results-list'>
      {
        poll.data.answers.map((answer, index) => {
          return <Result
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
