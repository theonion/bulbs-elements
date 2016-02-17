import React, { PropTypes } from 'react';
import register from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import PollStore from './bulbs-poll-store';

import PollQuestion from './components/question';
import PollResults from './components/results';

import './bulbs-poll.scss';

class BulbsPoll extends BulbsElement {
  initialDispatch () {
    this.store.actions.setSrc(this.props.src);
    this.store.actions.fetchPollData(this.props.src);
    this.store.actions.getCachedVoteData(this.props.src);
  }

  render () {
    if (this.state.vote.voted) {
      return <PollResults
        data={this.state}
      />;
    }
    else {
      return <PollQuestion
        actions={this.store.actions}
        data={this.state}
      />;
    }
  }
}

BulbsPoll.displayName = 'BulbsPoll';

BulbsPoll.store = PollStore;

BulbsPoll.propTypes = {
  src: PropTypes.string.isRequired,
};

register('bulbs-poll', BulbsPoll);
