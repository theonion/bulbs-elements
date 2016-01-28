import React, { PropTypes } from 'react';

export default function VoteButton (props) {
  function handleClick () {
    if (props.selectedAnswer) {
      props.makeVoteRequest(props.selectedAnswer);
    }
  }

  return (
    <button
      className="bulbs-poll-vote"
      onClick={handleClick}
    >
      Vote
    </button>
  );
}

VoteButton.propTypes = {
  makeVoteRequest: PropTypes.func,
  selectedAnswer: PropTypes.object,
};

