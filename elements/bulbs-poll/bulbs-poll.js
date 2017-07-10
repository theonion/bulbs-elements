import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register-react';
import BulbsElement from 'bulbs-elements/bulbs-element';

import PollSchema from './bulbs-poll-schema';

import BulbsPollRoot from './components/root';

import './bulbs-poll.scss';

export default class BulbsPoll extends BulbsElement {
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

BulbsPoll.schema = PollSchema;

BulbsPoll.propTypes = {
  src: PropTypes.string.isRequired,
};

registerReactElement('bulbs-poll', BulbsPoll);
