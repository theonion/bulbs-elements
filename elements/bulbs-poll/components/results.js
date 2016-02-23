import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Cover from './cover';
import Result from './result';

export default function Results (props) {
  let className = classnames('bulbs-poll-results', {});
  let {
    poll,
    winningAnswers,
    vote,
  } = props.data;

  return (
    <div className={className}>
      <Cover poll={poll} />
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
      <div className='bulbs-poll-thank-you bulbs-poll-footer'>
        Thanks for voting!
      </div>
    </div>
  );
}

Results.propTypes = {
  data: PropTypes.object.isRequired,
};
