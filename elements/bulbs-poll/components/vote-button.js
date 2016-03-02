import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function VoteButton (props) {
  let { selectedAnswer } = props;

  let buttonIsDisabled = true;
  if (selectedAnswer && selectedAnswer.id) {
    buttonIsDisabled = false;
  }

  function handleClick () {
    if (selectedAnswer) {
      props.makeVoteRequest(selectedAnswer);
    }
  }

  let classes = classnames('bulbs-poll-vote', {
    'bulbs-poll-footer': true,
  });

  return (
    <button
      data-track-label='Submit'
      className={classes}
      onClick={handleClick}
      disabled={buttonIsDisabled}
    >
      Vote
    </button>
  );
}

VoteButton.propTypes = {
  makeVoteRequest: PropTypes.func,
  selectedAnswer: PropTypes.object,
};

