import React, { PropTypes } from 'react';
import register from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import PollStore from './store';

import PollQuestion from './components/question';
import PollResults from './components/results';

import './styles.scss';

class BulbsPoll extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchPollData(this.props.src);
    this.store.actions.getCachedVoteData(this.props.pollId);
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
  pollId: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

register('bulbs-poll', BulbsPoll);
