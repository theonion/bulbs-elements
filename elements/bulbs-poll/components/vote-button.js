import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function VoteButton (props) {
  let { selectedAnswer } = props;

  function handleClick () {
    if (selectedAnswer) {
      props.makeVoteRequest(selectedAnswer);
    }
  }

  let classes = classnames('bulbs-poll-vote', {

  });

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={!selectedAnswer.id}
    >
      Vote
    </button>
  );
}

VoteButton.propTypes = {
  makeVoteRequest: PropTypes.func,
  selectedAnswer: PropTypes.object,
};

