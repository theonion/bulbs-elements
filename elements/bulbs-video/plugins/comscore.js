require('./streamsense.4.1411.18.min');

class Comscore {
  constructor(player, comscoreId) {
    this.streamingTag = new global.ns_.StreamingTag({ customerC2: comscoreId });

    // player.on('adstart', function(){
    //   that.streamingTag.playVideoAdvertisement();
    // });

    // player.on('adend', function(){
    //   that.streamingTag.stop();
    // });

    // player.on('play', function(){
    //   if (!that.isAdPlaying()) {
    //     that.streamingTag.playVideoContentPart(that.settings.metadata);
    //   }
    // });

    // player.on('pause', function(){
    //   if(!that.isAdPlaying()) {
    //     that.streamingTag.stop();
    //   }
    // });

    // player.on('ended', function(){
    //   if(!that.isAdPlaying()) {
    //     that.streamingTag.stop();
    //   }
    // });
  }

  adStarted () {
    this.streamingTag.playVideoAdvertisement();
  }

  adEnded () {
    this.streamingTag.stop();
  }

  contentPlayed () {
    // TODO: Need to pass in metadata here.
    this.streamingTag.playVideoContentPart();
  }

  contentPaused () {
    this.streamingTag.stop();
  }

  contentEnded () {
    this.streamingTag.stop();
  }
}

export default {
  init (player, comscoreId) {
    return new Comscore(player, comscoreId);
  },
};
