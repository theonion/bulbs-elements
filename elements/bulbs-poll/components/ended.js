import React, { PropTypes } from 'react';
import Cover from './cover';
import ResultsList from './results-list';

export default function Ended(props) {
  let {
    poll,
    winningAnswers,
    vote,
  } = props.data;

  return (
    <div className='bulbs-poll-ended'>
      <Cover poll={poll}/>
      <ResultsList
        poll={poll}
        winningAnswers={winningAnswers}
        vote={vote}
      />
      <div className='bulbs-poll-ended-message bulbs-poll-footer'>
        Poll Closed
      </div>
    </div>
  );
}

Ended.propTypes = {
  data: PropTypes.object.isRequired,
};
