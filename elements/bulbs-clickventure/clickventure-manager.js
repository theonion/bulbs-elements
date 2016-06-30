export default class ClickventureManager {
  constructor (selector) {
    this.$container = $(selector);

    this.onPauseClick = this.onPauseClick.bind(this);
    this.onAudioPlay = this.onAudioPlay.bind(this);

    this.$stopButton = this.$container.find('.clickventure-stop-btn');
    this.$audioTag = this.$container.find('audio');

    this.$stopButton.on('click', this.onPauseClick);
    this.$audioTag.on('play', this.onAudioPlay);
  }

  onPauseClick () {
    this.$stopButton.addClass('collapse');
    this.pauseAll();
  }

  onAudioPlay (event) {
    this.$stopButton.addClass('show');
    this.pauseAll(event.target);
  }

  pauseAll (exception) {
    this.$audioTag.each((index, item) => {
      if (item !== exception) {
        item.pause();
      }
    });
  }
}
