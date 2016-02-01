import React, { PropTypes } from 'react';

import Cover from './cover';
import Answers from './answers';
import VoteButton from './vote-button';

export function RequestError ({ error, children, reset }) {
  if (error) {
    return (
      <div className="bulbs-poll-network-error">
        <p>
          { children }
        </p>
        <button onClick={reset}>OK</button>
      </div>
    );
  }
  else {
    return <div />
  }
}

export default function Question (props) {
  let {
    selectAnswer,
    makeVoteRequest,
    resetFetchPollData,
    resetVoteRequest,
  } = props.actions;

  let {
    poll,
    selectedAnswer,
    vote,
  } = props.data;

  return (
    <div>
      <Cover poll={poll} />
      <RequestError
        error={poll.requestError}
        reset={resetFetchPollData}
      >
        Could not connect to network when fetching poll data.
      </RequestError>

      <RequestError
        error={vote.requestError}
        reset={resetVoteRequest}
      >
        Could not connect to network when placing your vote.
      </RequestError>

      <Answers
        answers={poll.data.answers}
        selectAnswer={selectAnswer}
        selectedAnswer={selectedAnswer}
      />
      <VoteButton
        selectedAnswer={selectedAnswer}
        makeVoteRequest={makeVoteRequest}
      />
    </div>
  );

}
