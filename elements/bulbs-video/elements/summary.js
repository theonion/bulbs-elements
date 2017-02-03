import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import {
  cachedFetch,
  loadOnDemand,
} from 'bulbs-elements/util';

import './summary.scss';

export default class VideoSummary extends BulbsHTMLElement {
  get props () {
    return {
      src: this.getAttribute('src'),
      nowPlaying: this.hasAttribute('now-playing'),
    };
  }

  fetchVideo () {
    cachedFetch(this.props.src)
      .then(video => this.handleFetchSuccess(video))
      .catch(error => this.handleFetchError(error))
    ;
  }

  handleFetchSuccess (video) {
    this.video = video;
    this.render();
  }

  handleFetchError () {

  }

  attachedCallback () {
    this.fetchVideo();
    this.render();
  }

  attributeChangedCallback (attributeName) {
    if (attributeName === 'src') {
      this.fetchVideo();
    }
  }

  render () {
    if (!this.video) {
      this.innerHTML = `<div></div>`;
    }
    else {
      let nowPlaying = '';
      if (this.props.nowPlaying) {
        nowPlaying = `
            <div class='bulbs-video-summary-playing'>
              Now Playing
            </div>
          `;
      }
      this.innerHTML = `
        <bulbs-video
          src='${this.props.src}'
          no-cover
        >
        </bulbs-video>
        <div class='bulbs-video-summary'>
          <div class='bulbs-video-poster'>
            <img src='${this.video.poster_url}'/>
            <div class='bulbs-video-shade'></div>
            <bulbs-video-play-button></bulbs-video-play-button>
          </div>
          ${nowPlaying}
          <h2 class='bulbs-video-series-name'>
            ${this.video.series_name || this.video.channel_name}
          </h2>
          <bulbs-ellipsize class='bulbs-video-summary-title' line-count='3'>
            ${this.video.title}
          </bulbs-ellipsize>
        </div>
      `;
    }
  }
}

registerElement('bulbs-video-summary', loadOnDemand(VideoSummary));
