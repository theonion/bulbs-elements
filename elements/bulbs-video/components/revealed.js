import React, { PropTypes } from 'react';

export default class Revealed extends React.Component {
  componentDidMount () {
    this.refs.video.play();
  }

  render () {
    let { data } = this.props;
    return (
      <div className='bulbs-video-viewport'>
        <video
          controls
          ref="video"
          className='bulbs-video-video'
        >
          {
            data.sources.data.map((source) => {
              return (
                <source
                  src={source.url}
                  type={source.content_type}
                />
              );
            })
          }
        </video>
      </div>
    );
  }
}

Revealed.propTypes = {

};
