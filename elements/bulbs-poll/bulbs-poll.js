import React, { PropTypes } from 'react';
import register from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import PollStore from './bulbs-poll-store';

import BulbsPollRoot from './components/root';

import './bulbs-poll.scss';

class BulbsPoll extends BulbsElement {
  initialDispatch () {
    this.store.actions.setSrc(this.props.src);
    this.store.actions.fetchPollData(this.props.src);
    this.store.actions.getCachedVoteData(this.props.src);
  }

  render () {
    return (
      <div data-track-action='Poll'>
        <BulbsPollRoot
          data={this.state}
          actions={this.store.actions}
        />
      </div>
    );
  }
}

BulbsPoll.displayName = 'BulbsPoll';

BulbsPoll.store = PollStore;

BulbsPoll.propTypes = {
  src: PropTypes.string.isRequired,
};

register('bulbs-poll', BulbsPoll);
