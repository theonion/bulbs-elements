import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Cover from './cover';
import ResultsList from './results-list';

export default function Results(props) {
  let className = classnames('bulbs-poll-results', {});
  let {
    poll,
    winningAnswers,
    vote,
  } = props.data;

  return (
    <div className={className}>
      <Cover poll={poll} />
      <ResultsList
        poll={poll}
        winningAnswers={winningAnswers}
        vote={vote}
      />
      <div className='bulbs-poll-thank-you bulbs-poll-footer'>
        Thanks for voting!
      </div>
    </div>
  );
}

Results.propTypes = {
  data: PropTypes.object.isRequired,
};
