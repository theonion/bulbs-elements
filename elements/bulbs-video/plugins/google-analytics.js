let prefixedSend = (gaPrefix) => {
  return `${gaPrefix}.send`;
};

export default {
  init (player, gaPrefix) {
    let context = {
      player: player,
      gaPrefix: gaPrefix,
    };
    player.on('play', this.onPlay.bind(context));
    player.on('pause', this.onPause.bind(context));
    player.on('adBlock', this.onAdBlock.bind(context));
    player.on('complete', this.onComplete.bind(context));
    // .on('adSkipped')
    // .on('adError')
    // .on('fullscreen') // fullscreen
    // .on('resize') // resize
    // .on('time')
    // .on('error')
    // .on('firstFrame') // Returns object with loadTime (in ms) of time between user hitting play and same user viewing their content
  },

  onPlay () {
    if (!this.player.playedOnce) {
      ga(prefixedSend(this.gaPrefix), 'event', 'Video:' + this.player.videoMeta.channel_name, 'start', this.player.videoMeta.player_options.shareUrl);
      this.player.playedOnce = true;
    }
    ga(prefixedSend(this.gaPrefix), 'event', 'Video:' + this.player.videoMeta.channel_name, 'play', this.player.videoMeta.player_options.shareUrl);
  },

  onPause () {
    ga(prefixedSend(this.gaPrefix), 'event', 'Video:' + this.player.videoMeta.channel_name, 'pause', this.player.videoMeta.player_options.shareUrl);
  },

  onComplete () {
    ga(prefixedSend(this.gaPrefix), 'event', 'Video:' + this.player.videoMeta.channel_name, 'end', this.player.videoMeta.player_options.shareUrl);
    this.player.playedOnce = false;
  },

  onAdBlock () {
    ga(prefixedSend(this.gaPrefix), 'event', 'Video:' + this.player.videoMeta.channel_name, 'adblock', 'true');
  },

  checkThreeSeconds (event) {
    if (this.player.gaEvents['three-seconds']) {
      return;
    }

    if (event.position >= 3) {
      ga(prefixedSend(this.gaPrefix), 'event', 'Video:' + this.player.videoMeta.channel_name, '3 seconds', this.player.videoMeta.player_options.shareUrl);
      this.player.gaEvents['three-seconds'] = true;
    }
  },
};
