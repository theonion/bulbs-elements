import GoogleAnalytics from './google-analytics';

describe('Google Analytics', () => {
  global.ga = () => {};
  let gaTrackerAction = () => {};

  describe('onPlay', () => {
    context('has played once', () => {
      beforeEach(() => {
        gaTrackerAction = sinon.spy();

        let googleAnalytics = GoogleAnalytics.init(
          {
            videoMeta: {
              channel_name: 'The Onion',
              player_options: {
                'shareUrl': 'http://www.theonion.com/r/4053',
              },
            },
            playedOnce: true,
            on: sinon.spy(),
          },
          gaTrackerAction
        );

        googleAnalytics.onPlay();
      });

      it('sends a "play" event', () => {
        expect(gaTrackerAction).to.have.been.calledWith(
         'event', 'Video:The Onion', 'play', 'http://www.theonion.com/r/4053'
        );
      });

      it('does not send a "start" event', () => {
        expect(gaTrackerAction).to.not.have.been.calledWith(
         'event', 'Video:The Onion', 'start', 'http://www.theonion.com/r/4053'
        );
      });
    });

    context('has not played once', () => {
      let player;

      beforeEach(() => {
        gaTrackerAction = sinon.spy();

        player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          playedOnce: false,
          on: sinon.spy(),
        };

        let googleAnalytics = GoogleAnalytics.init(
          player,
          gaTrackerAction
        );

        googleAnalytics.onPlay();
      });

      it('sets the "playedOnce" value', () => {
        expect(player.playedOnce).to.be.true;
      });

      it('sends a "play" event', () => {
        expect(gaTrackerAction).to.have.been.calledWith(
          'event', 'Video:The Onion', 'play', 'http://www.theonion.com/r/4053'
        );
      });

      it('sends a "start" event', () => {
        expect(gaTrackerAction).to.have.been.calledWith(
        'event', 'Video:The Onion', 'start', 'http://www.theonion.com/r/4053'
      );
      });
    });
  });

  describe('onPause', () => {
    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      let googleAnalytics = GoogleAnalytics.init(
        {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        },
        gaTrackerAction
      );

      googleAnalytics.onPause();
    });

    it('sends an "pause" event', () => {
      expect(gaTrackerAction).to.have.been.calledWith(
        'event', 'Video:The Onion', 'pause','http://www.theonion.com/r/4053'
      );
    });
  });

  describe('onFullScreen', () => {
    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      let eventStub = {
        fullscreen: true,
        type: 'fullscreen',
      };

      let googleAnalytics = GoogleAnalytics.init(
        {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        },
        gaTrackerAction
      );

      googleAnalytics.onFullScreen(eventStub);
    });

    it('sends an "fullscreen" event', () => {
      expect(gaTrackerAction).to.have.been.calledWith(
        'event', 'Video:The Onion', 'fullscreen:true', 'http://www.theonion.com/r/4053'
      );
    });
  });

  describe('onResize', () => {
    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      let eventStub = {
        width: 1920,
        height: 1080,
      };

      let googleAnalytics = GoogleAnalytics.init(
        {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        },
        gaTrackerAction
      );

      googleAnalytics.onResize(eventStub);
    });

    it('sends an "resize" event', () => {
      expect(gaTrackerAction).to.have.been.calledWith(
        'event', 'Video:The Onion', 'resize:1920x1080', 'http://www.theonion.com/r/4053'
      );
    });
  });

  describe('onFirstFrame', () => {
    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      let eventStub = {
        loadTime: 300,
      };

      let googleAnalytics = GoogleAnalytics.init(
        {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        },
        gaTrackerAction
      );

      googleAnalytics.onFirstFrame(eventStub);
    });

    it('sends an "firstFrame" event', () => {
      expect(gaTrackerAction).to.have.been.calledWith(
        'event', 'Video:The Onion', 'firstFrame', 'http://www.theonion.com/r/4053', 300
      );
    });
  });

  describe('onComplete', () => {
    let player;

    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      player = {
        videoMeta: {
          channel_name: 'The Onion',
          player_options: {
            'shareUrl': 'http://www.theonion.com/r/4053',
          },
        },
        playedOnce: true,
        on: sinon.spy(),
      };

      let googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);

      googleAnalytics.onComplete();
    });

    it('sends an "end" event', () => {
      expect(gaTrackerAction).to.have.been.calledWith(
        'event', 'Video:The Onion', 'end', 'http://www.theonion.com/r/4053'
      );
    });

    it('resets the "playedOnce" value', () => {
      expect(player.playedOnce).to.equal(false);
    });
  });

  describe('onAdBlock', () => {
    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      let player = {
        videoMeta: {
          channel_name: 'The Onion',
          player_options: {
            'shareUrl': 'http://www.theonion.com/r/4053',
          },
        },
        on: sinon.spy(),
      };

      let googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);

      googleAnalytics.onAdBlock();
    });

    it('sends an "adblock" event', () => {
      expect(gaTrackerAction).to.have.been.calledWith(
        'event', 'Video:The Onion', 'adblock:enabled', 'http://www.theonion.com/r/4053'
      );
    });
  });

  describe('filterQueryString', () => {
    let googleAnalytics;

    beforeEach(() => {
      let player = {
        videoMeta: {
          channel_name: 'The Onion',
          player_options: {
            'shareUrl': 'http://www.theonion.com/r/4053',
          },
        },
        on: sinon.spy(),
      };

      googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);
    });

    it('filters out any querystring key/value based on passed in key when first query param', () => {
      let filtered = googleAnalytics.filterQueryString('http://us-theonion.videoplaza.tv?rnd=12345', 'rnd');
      expect(filtered).to.equal('http://us-theonion.videoplaza.tv');
    });

    it('filters out any querystring key/value based on passed in key when sandwiched query param', () => {
      let filtered = googleAnalytics.filterQueryString('http://us-theonion.videoplaza.tv?foo=bar&rnd=12345&tags=1', 'rnd'); // eslint-disable-line max-len
      expect(filtered).to.equal('http://us-theonion.videoplaza.tv?foo=bar&tags=1');
    });

    it('filters out any querystring key/value based on passed in key when last query param', () => {
      let filtered = googleAnalytics.filterQueryString('http://us-theonion.videoplaza.tv?foo=bar&rnd=12345', 'rnd');
      expect(filtered).to.equal('http://us-theonion.videoplaza.tv?foo=bar');
    });
  });

  describe('onAdSkipped', () => {
    let eventStub;

    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      let player = {
        videoMeta: {
          channel_name: 'The Onion',
          player_options: {
            'shareUrl': 'http://www.theonion.com/r/4053',
          },
        },
        on: sinon.spy(),
      };

      let googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);
      eventStub = {
        tag:
          'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now?rt=vast_2.0&rnd=12345', // eslint-disable-line max-len
      };

      googleAnalytics.onAdSkipped(eventStub);
    });

    it('sends an "adskipped" event filtering out rnd value', () => {
      expect(gaTrackerAction).to.have.been.calledWith(
        'event',
        'Video:The Onion',
        'adskipped',
        'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now?rt=vast_2.0' // eslint-disable-line max-len
      );
    });
  });

  describe('onAdError', () => {
    let eventStub;
    let googleAnalytics;

    beforeEach(() => {
      gaTrackerAction = sinon.spy();

      let player = {
        videoMeta: {
          channel_name: 'The Onion',
          player_options: {
            'shareUrl': 'http://www.theonion.com/r/4053',
          },
        },
        on: sinon.spy(),
      };

      googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);
    });

    it('sends an "aderror" event without making any change if no rnd value', () => {
      eventStub = {
        tag:
          'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now', // eslint-disable-line max-len
        message: 'Ad Tag Empty',
      };

      googleAnalytics.onAdError(eventStub);
      expect(gaTrackerAction).to.have.been.calledWith(
        'event',
        'Video:The Onion',
        'aderror: Ad Tag Empty',
        'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now' // eslint-disable-line max-len
      );
    });

    it('sends an "aderror" event filtering out rnd value when at the end', () => {
      eventStub = {
        tag:
          'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now&rnd=2768879373', // eslint-disable-line max-len
        message: 'Ad Tag Empty',
      };

      googleAnalytics.onAdError(eventStub);
      expect(gaTrackerAction).to.have.been.calledWith(
        'event',
        'Video:The Onion',
        'aderror: Ad Tag Empty',
        'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now' // eslint-disable-line max-len
      );
    });

    it('sends an "aderror" event filtering out rnd value when sandwiched', () => {
      eventStub = {
        tag:
          'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now&rnd=2768879373&foo=bar', // eslint-disable-line max-len
        message: 'Ad Tag Empty',
      };

      googleAnalytics.onAdError(eventStub);
      expect(gaTrackerAction).to.have.been.calledWith(
        'event',
        'Video:The Onion',
        'aderror: Ad Tag Empty',
        'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=1125,the-onion,today-now,main,html5&s=main/the-onion/today-now&foo=bar' // eslint-disable-line max-len
      );
    });
  });

  describe('onTime', () => {
    let data = {
      duration: 60,
      position: 25,
    };
    let googleAnalytics;

    beforeEach(() => {
      let player = {
        videoMeta: {
          channel_name: 'The Onion',
          player_options: {
            'shareUrl': 'http://www.theonion.com/r/4053',
          },
        },
        on: sinon.spy(),
      };

      googleAnalytics = GoogleAnalytics.init(player, 'videoplayer0');

      sinon.stub(googleAnalytics, 'checkSecondsElapsed');
      sinon.stub(googleAnalytics, 'checkPercentage');
      googleAnalytics.onTime(data);
    });

    it('checks if the video is past 3 seconds', function () {
      expect(googleAnalytics.checkSecondsElapsed.calledWith(3, data)).to.be.true;
    });

    it('checks if the video is past 10 seconds', function () {
      expect(googleAnalytics.checkSecondsElapsed.calledWith(10, data)).to.be.true;
    });

    it('checks if the video is past 30 seconds', function () {
      expect(googleAnalytics.checkSecondsElapsed.calledWith(30, data)).to.be.true;
    });

    it('checks for 25 percent quartile', function () {
      expect(googleAnalytics.checkPercentage.calledWith(data, 25)).to.be.true;
    });

    it('checks for 50 percent quartile', function () {
      expect(googleAnalytics.checkPercentage.calledWith(data, 50)).to.be.true;
    });

    it('checks for 75 percent quartile', function () {
      expect(googleAnalytics.checkPercentage.calledWith(data, 75)).to.be.true;
    });

    it('checks for 95 percent quartile', function () {
      expect(googleAnalytics.checkPercentage.calledWith(data, 95)).to.be.true;
    });
  });

  describe('checkSecondsElapsed', () => {
    let googleAnalytics;
    let player;

    context('already sent "x seconds" event', function () {
      beforeEach(() => {
        gaTrackerAction = sinon.spy();

        let eventStub = {
          duration: 50,
          position: 5,
        };

        player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        };

        googleAnalytics = GoogleAnalytics.init(player, 'videoplayer0');
        googleAnalytics.player.gaEvents['3 seconds'] = true;
        googleAnalytics.checkSecondsElapsed(3, eventStub);
      });

      it('does not call ga', () => {
        expect(gaTrackerAction.called).to.be.false;
      });
    });

    context('have not sent "x seconds" event, < x seconds', function () {
      beforeEach(() => {
        let eventStub = {
          duration: 60,
          position: 1,
        };
        gaTrackerAction = sinon.spy();

        player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        };

        googleAnalytics = GoogleAnalytics.init(player, 'videoplayer0');

        googleAnalytics.checkSecondsElapsed(3, eventStub);
      });

      it('does not call ga', () => {
        expect(gaTrackerAction.called).to.be.false;
      });
    });

    context('have not sent "x seconds" event, > x seconds', function () {
      beforeEach(() => {
        let eventStub = {
          duration: 60,
          position: 4,
        };
        player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        };
        gaTrackerAction = sinon.spy();

        googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);

        googleAnalytics.checkSecondsElapsed(3, eventStub);
      });

      it('sends "3 seconds" event', () => {
        expect(gaTrackerAction).to.have.been.calledWith(
          'event', 'Video:The Onion', '3 seconds', 'http://www.theonion.com/r/4053'
        );
      });

      it('makes sure it is not sent again', function () {
        expect(player.gaEvents['3 seconds']).to.be.true;
      });
    });

  });

  describe('checkPercentage', () => {
    context('already sent "xx" percentage event', () => {
      beforeEach(() => {
        gaTrackerAction = sinon.spy();

        let player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        };

        let googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);

        googleAnalytics.player.gaEvents['25 percent'] = true;
        googleAnalytics.checkPercentage({}, 25);
      });

      it('does not call ga', function () {
        expect(gaTrackerAction.called).to.be.false;
      });
    });

    context('have not sent percent, under percent', () => {
      beforeEach(() => {
        gaTrackerAction = sinon.spy();

        let eventStub = {
          duration: 100,
          position: 20,
        };

        let player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        };

        let googleAnalytics = GoogleAnalytics.init(player, 'videoplayer0');
        googleAnalytics.checkPercentage(eventStub, 25);
      });

      it('does not send "xx percent" event', () => {
        expect(gaTrackerAction.called).to.be.false;
      });
    });

    context('have not sent percent, over percent', () => {
      let player;

      beforeEach(() => {
        gaTrackerAction = sinon.spy();

        let eventStub = {
          duration: 100,
          position: 25,
        };

        player = {
          videoMeta: {
            channel_name: 'The Onion',
            player_options: {
              'shareUrl': 'http://www.theonion.com/r/4053',
            },
          },
          on: sinon.spy(),
        };

        let googleAnalytics = GoogleAnalytics.init(player, gaTrackerAction);
        googleAnalytics.checkPercentage(eventStub, 25);
      });

      it('sends "xx percent" event', () => {
        expect(gaTrackerAction).to.have.been.calledWith(
          'event', 'Video:The Onion', '25 percent', 'http://www.theonion.com/r/4053'
        );
      });

      it('makes sure it is not sent again', function () {
        expect(player.gaEvents['25 percent']).to.be.true;
      });
    });
  });
});
