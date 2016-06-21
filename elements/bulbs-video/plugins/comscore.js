require('!imports?this=>window!./streamsense.5.1.1.160316.min.js');

class Comscore {
  constructor (player, comscoreId, comscoreMetadata) {
    this.streamingTag = new global.ns_.StreamingTag({ customerC2: comscoreId });
    this.comscoreMetadata = comscoreMetadata;

    player.on('adImpression', this.adStarted.bind(this));
    player.on('adSkipped', this.adEnded.bind(this));
    player.on('adComplete', this.adEnded.bind(this));
    player.on('play', this.contentPlayed.bind(this));
    player.on('pause', this.contentPaused.bind(this));
    player.on('complete', this.contentEnded.bind(this));
  }

  adStarted () {
    this.streamingTag.playVideoAdvertisement();
  }

  adEnded () {
    this.streamingTag.stop();
  }

  contentPlayed () {
    this.streamingTag.playVideoContentPart(this.comscoreMetadata);
  }

  contentPaused () {
    this.streamingTag.stop();
  }

  contentEnded () {
    this.streamingTag.stop();
  }
}

export default {
  init (player, comscoreId, comscoreMetadata) {
    return new Comscore(player, comscoreId, comscoreMetadata);
  },
};
