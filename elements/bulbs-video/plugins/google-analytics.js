class GoogleAnalytics {
  constructor (player, gaTrackerAction) {
    this.player = player;
    this.gaTrackerAction = gaTrackerAction;

    this.player.gaEvents = {};

    player.on('play', this.onPlay.bind(this));
    player.on('pause', this.onPause.bind(this));
    player.on('adBlock', this.onAdBlock.bind(this));
    player.on('complete', this.onComplete.bind(this));
    player.on('time', this.onTime.bind(this));
    player.on('fullscreen', this.onFullScreen.bind(this));
    player.on('firstFrame', this.onFirstFrame.bind(this));
    player.on('adSkipped', this.onAdSkipped.bind(this));
    player.on('adError', this.onAdError.bind(this));
  }

  onPlay () {
    if (!this.player.playedOnce) {
      this.gaTrackerAction(
        'send', 'event',
        'Video:' + this.player.videoMeta.channel_name,
        'start', this.player.videoMeta.player_options.shareUrl
      );
      this.player.playedOnce = true;
    }
    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'play', this.player.videoMeta.player_options.shareUrl
    );
  }

  onPause () {
    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'pause', this.player.videoMeta.player_options.shareUrl
    );
  }

  onFullScreen (event) {
    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'fullscreen:' + event.fullscreen,
      this.player.videoMeta.player_options.shareUrl
    );
  }

  onResize (event) {
    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'resize:' + event.width + 'x' + event.height,
      this.player.videoMeta.player_options.shareUrl
    );
  }

  onFirstFrame (event) {
    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'firstFrame',
      this.player.videoMeta.player_options.shareUrl,
      event.loadTime
    );
  }

  onComplete () {
    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'end',
      this.player.videoMeta.player_options.shareUrl
    );
    this.player.playedOnce = false;
  }

  onAdBlock () {
    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'adblock:enabled',
      this.player.videoMeta.player_options.shareUrl
    );
  }

  filterQueryString (originalString, queryStringKey) {
    let regex = new RegExp('[\\&|\\?]' + queryStringKey + '=\\d+');
    return originalString.replace(regex, '');
  }

  onAdSkipped (event) {
    let filteredTag = this.filterQueryString(event.tag, 'rnd');

    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'adskipped',
      filteredTag
    );
  }

  onAdError (event) {
    let filteredTag = this.filterQueryString(event.tag, 'rnd');

    this.gaTrackerAction(
      'send', 'event',
      'Video:' + this.player.videoMeta.channel_name,
      'aderror: ' + event.message,
      filteredTag
    );
  }

  onTime (event) {
    this.checkSecondsElapsed(3, event);
    this.checkSecondsElapsed(10, event);
    this.checkSecondsElapsed(30, event);
    this.checkPercentage(event, 25);
    this.checkPercentage(event, 50);
    this.checkPercentage(event, 75);
    this.checkPercentage(event, 95);
  }

  checkPercentage (event, percent) {
    let eventAction = percent + ' percent';

    if (this.player.gaEvents[eventAction]) {
      return;
    }

    let percentPlayed = Math.round(event.position / event.duration * 100);

    if (percentPlayed >= percent) {
      this.gaTrackerAction(
        'send', 'event',
        'Video:' + this.player.videoMeta.channel_name,
        eventAction,
        this.player.videoMeta.player_options.shareUrl
      );
      this.player.gaEvents[eventAction] = true;
    }
  }

  checkSecondsElapsed (seconds, event) {
    let eventAction = seconds + ' seconds';

    if (this.player.gaEvents[eventAction]) {
      return;
    }

    if (event.position >= seconds) {
      this.gaTrackerAction(
        'send', 'event',
        'Video:' + this.player.videoMeta.channel_name,
        eventAction,
        this.player.videoMeta.player_options.shareUrl
      );
      this.player.gaEvents[eventAction] = true;
    }
  }
}

export default {
  init (player, gaTrackerAction) {
    return new GoogleAnalytics(player, gaTrackerAction);
  },
};
