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
      <div className='bulbs-poll-results-list'>
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
      </div>
      <p className='bulbs-poll-thank-you'>
        Thanks for voting!
      </p>
    </div>
  );
}

Results.propTypes = {
  data: PropTypes.object.isRequired,
};
