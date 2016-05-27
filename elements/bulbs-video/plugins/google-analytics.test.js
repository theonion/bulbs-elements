import GoogleAnalytics from './google-analytics';
// ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);

describe('Google Analytics', () => {
  global.ga = () => {};

  describe('onPlay', () => {
    context('has played once', () => {
      beforeEach(() => {
        global.ga = sinon.spy();

        GoogleAnalytics.onPlay.bind({
          player: {
            videoMeta: {
              channel_name: 'The Onion',
              player_options: {
                'shareUrl': 'http://www.theonion.com/r/4053',
              },
            },
            playedOnce: true
          },
          gaPrefix: 'videoplayer0',
        })();
      });

      it('sends a "play" event', () => {
        expect(global.ga).to.have.been.calledWith(
          'videoplayer0.send', 'event', 'Video:The Onion', 'play', 'http://www.theonion.com/r/4053'
        );
      });

      it('does not send a "start" event', () => {
        expect(global.ga).to.not.have.been.calledWith(
          'videoplayer0.send', 'event', 'Video:The Onion', 'start', 'http://www.theonion.com/r/4053'
        );
      });
    });

    context('has not played once', () => {
      let player;

      beforeEach(() => {
        global.ga = sinon.spy();

        player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
        };

        GoogleAnalytics.onPlay.bind({
          player: player,
          gaPrefix: 'videoplayer0',
        })();
      });

      it('sets the "playedOnce" value', () => {
        expect(player.playedOnce).to.be.true;
      });

      it('sends a "play" event', () => {
        expect(global.ga).to.have.been.calledWith(
          'videoplayer0.send', 'event', 'Video:The Onion', 'play', 'http://www.theonion.com/r/4053'
        );
      });

      it('sends a "start" event', () => {
        expect(global.ga).to.have.been.calledWith(
        'videoplayer0.send', 'event', 'Video:The Onion', 'start', 'http://www.theonion.com/r/4053'
      );
      });
    });
  });

  describe('onPause', () => {
    beforeEach(() => {
      global.ga = sinon.spy();

      GoogleAnalytics.onPause.bind({
        player: {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
        },
        gaPrefix: 'videoplayer0',
      })();
    });

    it('sends an "pause" event', () => {
      expect(global.ga).to.have.been.calledWith('videoplayer0.send', 'event', 'Video:The Onion', 'pause', 'http://www.theonion.com/r/4053');
    });
  });

  describe('onComplete', () => {
    let player;

    beforeEach(() => {
      global.ga = sinon.spy();

      player = {
        videoMeta: {
          channel_name: 'The Onion',
          player_options: {
            'shareUrl': 'http://www.theonion.com/r/4053',
          },
        },
        playedOnce: true,
      };

      GoogleAnalytics.onComplete.bind({
        player: player,
        gaPrefix: 'videoplayer0',
      })();
    });

    it('sends an "end" event', () => {
      expect(global.ga).to.have.been.calledWith('videoplayer0.send', 'event', 'Video:The Onion', 'end', 'http://www.theonion.com/r/4053');
    });

    it('resets the "playedOnce" value', () => {
      expect(player.playedOnce).to.equal(false);
    });
  });

  describe('onAdBlock', () => {
    beforeEach(() => {
      global.ga = sinon.spy();

      GoogleAnalytics.onAdBlock.bind({
        player: {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
        },
        gaPrefix: 'videoplayer0',
      })();
    });

    it('sends an "adblock" event', () => {
      expect(global.ga).to.have.been.calledWith('videoplayer0.send', 'event', 'Video:The Onion', 'adblock', 'true');
    });
  });

  describe('checkThreeSeconds', () => {
    context('already sent "3 seconds" event', function() {
      beforeEach(() => {
        global.ga = sinon.spy();

        GoogleAnalytics.checkThreeSeconds.bind({
          player: {
            videoMeta: {
              channel_name: 'The Onion',
              player_options: {
                'shareUrl': 'http://www.theonion.com/r/4053',
              },
            },
            gaEvents: {
              'three-seconds': true,
            },
          },
          gaPrefix: 'videoplayer0',
        })();
      });

      it('does not call ga', () => {
        expect(global.ga.called).to.be.false;
      });
    });

    context('have not sent "3 seconds" event, < 3 seconds', function() {
      beforeEach(() => {
        let eventStub = {
          duration: 60,
          position: 1,
        };
        global.ga = sinon.spy();

        GoogleAnalytics.checkThreeSeconds.bind({
          player: {
            videoMeta: {
              channel_name: 'The Onion',
              player_options: {
                'shareUrl': 'http://www.theonion.com/r/4053',
              },
            },
            gaEvents: {},
          },
          gaPrefix: 'videoplayer0',
        })(eventStub);
      });

      it('does not call ga', () => {
        expect(global.ga.called).to.be.false;
      });
    });

    context('have not sent "3 seconds" event, > 3 seconds', function() {
      beforeEach(() => {
        let eventStub = {
          duration: 60,
          position: 4,
        };
        global.ga = sinon.spy();

        GoogleAnalytics.checkThreeSeconds.bind({
          player: {
            videoMeta: {
              channel_name: 'The Onion',
              player_options: {
                'shareUrl': 'http://www.theonion.com/r/4053',
              },
            },
            gaEvents: {},
          },
          gaPrefix: 'videoplayer0',
        })(eventStub);
      });

      it('sends "3 seconds" event', () => {
        expect(global.ga).to.have.been.calledWith('videoplayer0.send', 'event', 'Video:The Onion', '3 seconds', 'http://www.theonion.com/r/4053');
      });
    });

  });
});
