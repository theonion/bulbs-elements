import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class VoteButton extends React.Component {
  makeVoteRequest() {
    if (this.props.selectedAnswer) {
      this.props.makeVoteRequest(this.props.selectedAnswer);
    }
  }
  render() {
    let { selectedAnswer } = this.props;

    let buttonIsDisabled = true;
    if (selectedAnswer && selectedAnswer.id) {
      buttonIsDisabled = false;
    }

    let classes = classnames('bulbs-poll-vote', {
      'bulbs-poll-footer': true,
    });

    return (
      <button
        data-track-label='Submit'
        className={classes}
        onClick={this.makeVoteRequest}
        disabled={buttonIsDisabled}
      >
        Vote
      </button>
    );
  }
}

VoteButton.propTypes = {
  makeVoteRequest: PropTypes.func,
  selectedAnswer: PropTypes.object,
};

