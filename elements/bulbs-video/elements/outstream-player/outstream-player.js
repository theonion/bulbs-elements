import { registerReactElement } from 'bulbs-elements/register';

import BulbsElement from 'bulbs-elements/bulbs-element';
import detectAdBlock from 'bulbs-elements/util/detect-ad-block';

import './outstream-player.scss';

export default class OutstreamPlayer extends BulbsElement {
  componentDidMount () {
    detectAdBlock((isAdBlocked) => {
      this.isAdBlocked = isAdBlocked;
      this.store.actions.revealPlayer();
      this.fetchVideo();
    });
  }

  fetchVideo () {
    // TODO - Spoof video asset source object
  }

  render () {
    return (
      <OutstreamPlayerRoot
        {...this.state}
        {...this.props}
        actions={this.store.actions}
      />
    );
  }
}

Object.assign(RailPlayer, {
  displayName: 'RailPlayer',
  schema: {
    video: VideoField,
    controller: ControllerField,
  },
});

registerReactElement('outstream-player', OutstreamPlayer);
