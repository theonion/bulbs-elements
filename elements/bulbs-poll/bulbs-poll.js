import React, { PropTypes } from 'react';
import { register, BulbsElement } from '../core';
import PollStore from './store';
import classnames from 'classnames';

class BulbsPoll extends BulbsElement {
  initialDispatch () {
    this.store.actions.setPollData(this.props.pollData);
  }

  render () {
    let {
      selectAnswer,
      voteRequest,
    } = this.store.actions;

    let {
      poll,
      selectedAnswer,
    } = this.state;

    return (
      <div className="bulbs-poll">
        <PollCover poll={poll} />
        <Answers
          answers={poll.answers}
          selectAnswer={selectAnswer}
          selectedAnswer={selectedAnswer}
        />
        <VoteButton
          selectedAnswer={selectedAnswer}
          voteRequest={voteRequest}
        />
      </div>
    );
  }
}

BulbsPoll.store = PollStore;

BulbsPoll.propTypes = {
  pollData: PropTypes.string.isRequired,
};

BulbsPoll.displayName = 'BulbsPoll';


function CroppedImage () {
  return (
    <img />
  );
}

function PollCover (props) {
  let { poll } = props;
  return (
    <header className="bulbs-poll-cover">
      {
        poll.thumbnail ? <CroppedImage image={poll.thumbnail} /> : undefined
      }
      <h1 className="bulbs-poll-title">
        { poll.question_text }
      </h1>
    </header>
  );
}

PollCover.propTypes = {
  poll: PropTypes.object.isRequired
};

function Answers (props) {
  return (
    <ul className="bulbs-poll-answers">
      {
        props.answers.map((answer, index) => {
          return <Answer
            key={index}
            answer={answer}
            {...props}
          />
        })
      }
    </ul>
  )
}

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  selectedAnswer: PropTypes.object,
  selectAnswer: PropTypes.func.isRequired,
}

function Answer (props) {
  let {
    answer,
    selectAnswer,
    selectedAnswer,
  } = props;

  let className = classnames('bulbs-poll-answer', {
    selected: answer === selectedAnswer
  });

  return (
    <li
      className={className}
      onClick={selectAnswer.bind(null, answer)}
    >
      { answer.answer_text }
    </li>
  );
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func.isRequired,
};

function VoteButton (props) {
  function handleClick () {
    if (props.selectedAnswer) {
      props.voteRequest(props.selectedAnswer);
    }
  }

  return (
    <button
      className="bulbs-poll-vote"
      onClick={handleClick}
    >
      Vote
    </button>
  )
}

VoteButton.propTypes = {
  selectedAnswer: PropTypes.object,
  voteRequest: PropTypes.func
}



register('bulbs-poll', BulbsPoll);
