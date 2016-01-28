import React, { PropTypes } from 'react';

import Cover from './cover';
import Answers from './answers';
import VoteButton from './vote-button';

export default function Question (props) {
  let {
    selectAnswer,
    makeVoteRequest,
  } = props.actions;

  let {
    poll,
    selectedAnswer,
    vote,
  } = props.data;

  let voteButton = null;
  if (!vote.data) {
    voteButton = <VoteButton
      selectedAnswer={selectedAnswer}
      makeVoteRequest={makeVoteRequest}
    />;
  }

  return (
    <div className="bulbs-poll">
      <Cover poll={poll} />
      <Answers
        answers={poll.data.answers}
        selectAnswer={selectAnswer}
        selectedAnswer={selectedAnswer}
      />
      { voteButton }
    </div>
  );
}
