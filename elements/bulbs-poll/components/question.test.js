import React from 'react';
import { shallow } from 'enzyme';

import Question from './question';
import RequestError from './request-error';
import Cover from './cover';
import Answers from './answers';
import VoteButton from './vote-button';

describe('<bulbs-poll> <Question>', function() {
  it('renders the question', function() {
    let selectAnswer = function() {};
    let makeVoteRequest = function() {};
    let resetVoteRequest = function() {};
    let resetFetchPollData = function() {};

    let answers = [];
    let selectedAnswer = {};
    let pollRequestError = {};
    let poll = {
      data: {
        answers,
      },
      requestError: pollRequestError,
    };

    let voteRequestError = {};
    let vote = {
      data: {},
      requestError: voteRequestError,
    };

    let props = {
      actions: {
        selectAnswer, makeVoteRequest,
        resetFetchPollData, resetVoteRequest,
      },
      data: {
        vote, poll, answers, selectedAnswer,
      },
    };

    expect(shallow(<Question {...props} />).equals(
      <div>
        <Cover poll={poll} />

        <RequestError
          error={pollRequestError}
          reset={resetFetchPollData}
        >
          Could not connect to network when fetching poll data.
        </RequestError>

        <RequestError
          error={voteRequestError}
          reset={resetVoteRequest}
        >
          Could not connect to network when placing your vote.
        </RequestError>

        <Answers
          poll={poll}
          answers={answers}
          selectAnswer={selectAnswer}
          selectedAnswer={selectedAnswer}
        />

          <VoteButton
          selectedAnswer={selectedAnswer}
          makeVoteRequest={makeVoteRequest}
        />
      </div>
    )).to.be.true;
  });
});
