//
///* global jQuery, ga, AnalyticsManager, BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID */
//
//import React, { PropTypes } from 'react';
//
//
//export default class Revealed extends React.Component {
//  constructor (props) {
//    super(props);
//  }
//
//  componentDidMount () {
//    this.refs.videoViewport.addEventListener('play-requested', () => {
//      this.player.play();
//    });
//
//    this.refs.videoViewport.addEventListener('pause-requested', () => {
//      this.player.pause();
//    });
//  }
//
//  componentWillUnmount () {
//    this.player.remove();
//  }
//
//
//  handleClick () {
//    if (this.props.hideControls) {
//      this.player.play();
//    }
//  }
//
//  }
//
//  render () {
//    return (
//      <div
//        className='bulbs-video-viewport'
//        ref="videoViewport"
//        onClick={event => this.handleClick(event)}
//        onTouchTap={event => this.handleClick(event)}
//      >
//        <div className='bulbs-video-video video-container' ref='videoContainer'>
//        </div>
//      </div>
//    );
//  }
//}
//
//Revealed.propTypes = {
//  autoplay: PropTypes.bool,
//  autoplayNext: PropTypes.bool,
//  controller: PropTypes.object.isRequired,
//  defaultCaptions: PropTypes.bool,
//  disableSharing: PropTypes.bool,
//  embedded: PropTypes.bool,
//  hideControls: PropTypes.bool,
//  muted: PropTypes.bool,
//  noEndcard: PropTypes.bool,
//  playsInline: PropTypes.bool,
//  targetCampaignId: PropTypes.string,
//  targetCampaignNumber: PropTypes.string,
//  targetHostChannel: PropTypes.string,
//  targetSpecialCoverage: PropTypes.string,
//  twitterHandle: PropTypes.string,
//  video: PropTypes.object.isRequired,
//};
