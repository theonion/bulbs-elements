import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import Revealed from './revealed';
import GoogleAnalytics from '../plugins/google-analytics';
import Comscore from '../plugins/comscore';
import video from '../fixtures/video.json';

describe('<bulbs-video> <Revealed>', () => {
  beforeEach(() => {
    global.jwplayer = () => {};
    sinon.stub(GoogleAnalytics, 'init');
    sinon.stub(Comscore, 'init');
  });

  afterEach(() => {
    GoogleAnalytics.init.restore();
    Comscore.init.restore();
  });

  describe('propTypes', () => {
    let subject = Revealed.propTypes;

    it('accepts autoplay boolean', () => {
      expect(subject.autoplay).to.eql(PropTypes.bool);
    });

    it('accepts autoplayNext boolean', () => {
      expect(subject.autoplayNext).to.eql(PropTypes.bool);
    });

    it('accepts muted boolean', () => {
      expect(subject.muted).to.eql(PropTypes.bool);
    });

    it('accepts noEndcard boolean', () => {
      expect(subject.noEndcard).to.eql(PropTypes.bool);
    });

    it('accepts targetCampaignId string', () => {
      expect(subject.targetCampaignId).to.eql(PropTypes.string);
    });

    it('accepts targetSpecialCoverage string', () => {
      expect(subject.targetSpecialCoverage).to.eql(PropTypes.string);
    });

    it('accepts targetHostChannel string', () => {
      expect(subject.targetHostChannel).to.eql(PropTypes.string);
    });

    it('accepts twitterHandle string', () => {
      expect(subject.twitterHandle).to.eql(PropTypes.string);
    });

    it('requires video', () => {
      expect(subject.video).to.eql(PropTypes.object.isRequired);
    });
  });

  describe('render', () => {
    let subject;
    let props = { video };

    beforeEach(() => {
      props = {
        video: {
          sources: [
            { url: 'url-1', content_type: 'type-1' },
            { url: 'url-2', content_type: 'type-2' },
          ],
        },
      };
      subject = shallow(<Revealed {...props}/>);
    });

    it('renders a video viewport', () => {
      expect(subject.find('.bulbs-video-viewport')).to.have.length(1);
    });

    it('renders a <div>', () => {
      let videoContainer = subject.find('div.video-container');
      expect(videoContainer).to.have.length(1);
      expect(videoContainer).to.have.className('bulbs-video-video video-container');
    });
  });

  describe('componentDidMount globalsCheck', () => {
    global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'a-ga-id';
    global.ga = () => {};

    const globals = [
      'jQuery', 'ga',
      'BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID',
    ];

    globals.forEach((name) => {
      it(`${name} MUST be available globally`, () => {
        let _global = global[name];
        delete global[name];
        let subject = new Revealed({ video });
        expect(() => {
          subject.componentDidMount();
        }).to.throw(`\`<bulbs-video>\` requires \`${name}\` to be in global scope.`);
        global[name] = _global;
      });
    });
  });

  describe('componentDidMount', () => {
    let props;
    let state;
    let videoRef = {};
    let makeVideoPlayerSpy;
    let trackerRegex = /^videoplayer\d+.set$/;

    describe('makes a video player', () => {
      beforeEach(function () {
        props = {
          targetSpecialCoverage: 'sc-slug',
          targetCampaignId: 'campaign',
          targetHostChannel: 'host_channel',
          videojs_options: {},
          twitterHandle: 'twitter',
          autoplay: true,
          autoplayNext: true,
          muted: true,
          video: Object.assign({}, video, {
            title: 'video_title',
            tags: ['main', 'tag'],
            category: 'category',
            targeting: {
              target_channel: 'channel',
              target_series: 'series',
              target_season: 'season',
              target_video_id: 'video_id',
            },
            player_options: {
              'poster': 'http://i.onionstatic.com/onionstudios/4974/16x9/800.jpg',
              'advertising': {
                'tag': 'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&pf=html5&cv=h5_1.0.14.17.1&f=&t=4045%2Cclickhole%2Cmain%2Cshort_form%2Chtml5&s=main%2Fclickhole&cf=short_form&cd=96.757551&tt=p&st=0%3A0%2C3%2C4%2C10%2C20%3A1%2C91%2C100&rnd=9206206327905602', // eslint-disable-line max-len

              },
              'shareUrl': 'http://www.onionstudios.com/videos/beautiful-watch-this-woman-use-a-raw-steak-to-bang-out-the-word-equality-in-morse-code-on-the-hood-of-her-car-4053', // eslint-disable-line max-len
              'embedCode': '<iframe name=\"embedded\" allowfullscreen webkitallowfullscreen mozallowfullscreen frameborder=\"no\" width=\"480\" height=\"270\" scrolling=\"no\" src=\"http://www.onionstudios.com/embed?id=4023\"></iframe>', // eslint-disable-line max-len
              'comscore': {
                'id': 6036328,
                'metadata': {
                  'c3': 'onionstudios',
                  'c4': 'CLICKHOLE',
                  'ns_st_ci': 'onionstudios.4053',
                },
              },
            },
            'sources': [
              {
                'id': 19077,
                'url': 'http://v.theonion.com/onionstudios/video/4053/640.webm',
                'content_type': 'video/webm',
                'width': 640,
                'bitrate': 469,
                'enabled': true,
                'is_legacy_source': false,
                'video': 4053,
              },
              {
                'id': 19078,
                'url': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
                'content_type': 'video/mp4',
                'width': 640,
                'bitrate': 569,
                'enabled': true,
                'is_legacy_source': false,
                'video': 4053,
              },
              {
                'id': 19076,
                'url': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
                'content_type': 'application/x-mpegURL',
                'width': null,
                'bitrate': null,
                'enabled': true,
                'is_legacy_source': false,
                'video': 4053,
              },
            ],
          }),
        };
        state = {};
        global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'a-ga-id';
        global.ga = sinon.spy();
        makeVideoPlayerSpy = sinon.spy();
      });

      context('standard setup', () => {
        beforeEach(() => {
          Revealed.prototype.componentDidMount.call({
            props,
            state,
            refs: { videoContainer: videoRef },
            makeVideoPlayer: makeVideoPlayerSpy,
          });
        });

        it('passes through the muted value', () => {
          let videoMeta = Object.assign({}, props.video);
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, videoMeta
          );
          expect(makeVideoPlayerSpy.args[0][1].player_options.muted).to.be.true;
        });

        it('sets sharetools config', () => {
          let videoMeta = Object.assign({}, props.video);
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, videoMeta
          );
          expect(makeVideoPlayerSpy.args[0][1].player_options.shareUrl).to.equal(window.location.href);
        });

        it('sets ga config', () => {
          let videoMeta = Object.assign({}, props.video);
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, videoMeta);
        });
      });

      context('analytics', () => {
        beforeEach(() => {
          Revealed.prototype.componentDidMount.call({
            props,
            state,
            refs: { video: videoRef },
            makeVideoPlayer: makeVideoPlayerSpy,
          });
        });

        it('creates a prefixed ga tracker', () => {
          expect(global.ga).to.have.been.calledWithMatch(
            'create', 'a-ga-id', 'auto', { name: sinon.match(/^videoplayer\d+$/) }
          );
        });

        it('sets dimension1 to targeting.target_channel', () => {
          expect(global.ga).to.have.been.calledWithMatch(
            trackerRegex, 'dimension1', 'channel'
          );
        });

        it('sets dimension2 to targeting.target_series', () => {
          expect(global.ga).to.have.been.calledWithMatch(
            trackerRegex, 'dimension2', 'series'
          );
        });

        it('sets dimension3 to targeting.target_season', () => {
          expect(global.ga).to.have.been.calledWithMatch(
            trackerRegex, 'dimension3', 'season'
          );
        });

        it('sets dimension4 to targeting.target_video_id', () => {
          expect(global.ga).to.have.been.calledWithMatch(
            trackerRegex, 'dimension4', 'video_id'
          );
        });

        it('sets dimension5 to targeting.taregt_host_channel', () => {
          expect(global.ga).to.have.been.calledWithMatch(
           trackerRegex, 'dimension5', 'host_channel'
          );
        });

        it('sets dimension6 to targetSpecialCoverage', () => {
          expect(global.ga).to.have.been.calledWithMatch(
           trackerRegex, 'dimension6', 'sc-slug'
          );
        });

        it('sets dimension7 to true', () => {
          expect(global.ga).to.have.been.calledWithMatch(
           trackerRegex, 'dimension7', true);
        });

        it('sets dimension8 to props.autoplay', () => {
          expect(global.ga).to.have.been.calledWithMatch(
           trackerRegex, 'dimension8', true
          );
        });

        it('sets dimension9 to targeting.targetCampaignId', () => {
          expect(global.ga).to.have.been.calledWithMatch(
           trackerRegex, 'dimension9', 'campaign'
          );
        });

        it('sets dimension10 to None', () => {
          expect(global.ga).to.have.been.calledWithMatch(
           trackerRegex, 'dimension10', 'None'
          );
        });
      });
    });
  });

  describe('extractSources', () => {
    let sources;

    beforeEach(() => {
      sources = [
        {
          'id': 19077,
          'url': 'http://v.theonion.com/onionstudios/video/4053/640.webm',
          'content_type': 'video/webm',
          'width': 640,
          'bitrate': 469,
          'enabled': true,
          'is_legacy_source': false,
          'video': 4053,
        },
        {
          'id': 19078,
          'url': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
          'content_type': 'video/mp4',
          'width': 640,
          'bitrate': 569,
          'enabled': true,
          'is_legacy_source': false,
          'video': 4053,
        },
        {
          'id': 19076,
          'url': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
          'content_type': 'application/x-mpegURL',
          'width': null,
          'bitrate': null,
          'enabled': true,
          'is_legacy_source': false,
          'video': 4053,
        },
      ];
    });

    it('extracts only the HLS & mp4 sources', () => {
      let extractedSources = Revealed.prototype.extractSources.call({}, sources);
      expect(extractedSources[0].file).to.equal('http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8');
      expect(extractedSources[1].file).to.equal('http://v.theonion.com/onionstudios/video/4053/640.mp4');
    });
  });

  describe('cacheBuster', () => {
    it('returns a random number', () => {
      let integerRegEx = /^\d+$/;
      let cacheBuster = Revealed.prototype.cacheBuster.call({});
      expect(cacheBuster).to.match(integerRegEx);
    });
  });

  describe('vastTest', () => {
    it('returns false if query string empty', () => {
      let vastId = Revealed.prototype.vastTest.call({
        parseParam: sinon.stub().returns(false),
      }, '');
      expect(vastId).to.be.false;
    });

    it('returns false if no xgid query string key', () => {
      let vastId = Revealed.prototype.vastTest.call({
        parseParam: sinon.stub().returns(false),
      }, '?utm_source=facebook');
      expect(vastId).to.be.false;
    });

    it('returns the vastUrl value if query string key present', () => {
      let vastId = Revealed.prototype.vastTest.call({
        parseParam: sinon.stub().returns('12345'),
      }, '?xgid=12345');
      expect(vastId).to.equal('12345');
    });
  });

  describe('parseParam', () => {
    it('returns the value if it find its in the query string', () => {
      let value = Revealed.prototype.parseParam.call({
      }, 'foo', '?foo=12345');
      expect(value).to.equal('12345');
    });

    it('does not return the value if it does not find it in the query string', () => {
      let value = Revealed.prototype.parseParam.call({
      }, 'bar', '?foo=12345');
      expect(value).to.be.null;
    });
  });

  describe('vastUrl', () => {
    let videoMeta;
    let cacheBusterStub;
    let vastTestStub;

    beforeEach(() => {
      cacheBusterStub = sinon.stub().returns('456');
      vastTestStub = sinon.stub().returns(null);
      videoMeta = {
        tags: ['clickhole', 'main', '12345'],
        category: 'main/clickhole',
      };
    });

    it('returns the vast url', function () {
      let vastUrl = Revealed.prototype.vastUrl.call({
        cacheBuster: cacheBusterStub,
        vastTest: vastTestStub,
      }, videoMeta);
      expect(vastUrl).to.equal('http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&tt=p&t=clickhole,main,12345,html5&s=main/clickhole&rnd=456'); // eslint-disable-line max-len
    });
  });

  describe('makeVideoPlayer', () => {
    let playerSetup;
    let element;
    let player;
    let videoMeta;

    beforeEach(() => {
      element = {};
      videoMeta = Object.assign({}, video, {
        title: 'video_title',
        tags: 'tags',
        category: 'category',
        targeting: {
          target_channel: 'channel',
          target_series: 'series',
          target_season: 'season',
          target_video_id: 'video_id',
          target_host_channel: 'host_channel',
        },
        player_options: {
          'poster': 'http://i.onionstatic.com/onionstudios/4974/16x9/800.jpg',
          'advertising': {
            'tag': 'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&pf=html5&cv=h5_1.0.14.17.1&f=&t=4045%2Cclickhole%2Cmain%2Cshort_form%2Chtml5&s=main%2Fclickhole&cf=short_form&cd=96.757551&tt=p&st=0%3A0%2C3%2C4%2C10%2C20%3A1%2C91%2C100&rnd=9206206327905602', // eslint-disable-line max-len
          },
          'shareUrl': 'http://www.onionstudios.com/videos/beautiful-watch-this-woman-use-a-raw-steak-to-bang-out-the-word-equality-in-morse-code-on-the-hood-of-her-car-4053', // eslint-disable-line max-len
          'embedCode': '<iframe name=\"embedded\" allowfullscreen webkitallowfullscreen mozallowfullscreen frameborder=\"no\" width=\"480\" height=\"270\" scrolling=\"no\" src=\"http://www.onionstudios.com/embed?id=4023\"></iframe>', // eslint-disable-line max-len
          'comscore': {
            'id': 6036328,
            'metadata': {
              'c3': 'onionstudios',
              'c4': 'CLICKHOLE',
              'ns_st_ci': 'onionstudios.4053',
            },
          },
        },
        'sources': [
          {
            'id': 19077,
            'url': 'http://v.theonion.com/onionstudios/video/4053/640.webm',
            'content_type': 'video/webm',
            'width': 640,
            'bitrate': 469,
            'enabled': true,
            'is_legacy_source': false,
            'video': 4053,
          },
          {
            'id': 19078,
            'url': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
            'content_type': 'video/mp4',
            'width': 640,
            'bitrate': 569,
            'enabled': true,
            'is_legacy_source': false,
            'video': 4053,
          },
          {
            'id': 19076,
            'url': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
            'content_type': 'application/x-mpegURL',
            'width': null,
            'bitrate': null,
            'enabled': true,
            'is_legacy_source': false,
            'video': 4053,
          },
        ],
        gaPrefix: 'videoplayer0',
      });
      playerSetup = sinon.spy();
      player = {
        setup: playerSetup,
      };
      global.jwplayer = () => {
        return player;
      };
    });

    context('player set up', () => {
      let sources;
      let extractSourcesStub;
      let vastUrlStub;

      beforeEach(() => {
        sources = [
          {
            'file': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
          },
          {
            'file': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
          },
        ];
        extractSourcesStub = sinon.stub().returns(sources);
        vastUrlStub = sinon.stub().returns('http://localhost:8080/vast.xml');

        Revealed.prototype.makeVideoPlayer.call({
          extractSources: extractSourcesStub,
          vastUrl: vastUrlStub,
        }, element, videoMeta);
      });

      it('sets up the player', () => {
        expect(playerSetup.called).to.be.true;
      });

      it('includes only the HLS & mp4 sources', () => {
        let setupOptions = playerSetup.args[0][0];
        expect(setupOptions.sources).to.eql(sources);
      });

      it('sets up the advertising VAST tag', () => {
        let setupOptions = playerSetup.args[0][0];
        expect(setupOptions.advertising.client).to.equal('vast');
        expect(setupOptions.advertising.tag).to.equal('http://localhost:8080/vast.xml');
        expect(setupOptions.advertising.skipoffset).to.equal(5);
      });

      it('sets the image as the poster image', () => {
        let setupOptions = playerSetup.args[0][0];
        expect(setupOptions.image).to.equal(videoMeta.player_options.poster);
      });

      it('sets up the sharing link', () => {
        let setupOptions = playerSetup.args[0][0];
        expect(setupOptions.sharing.link).to.equal(videoMeta.player_options.shareUrl);
      });

      it('sets up the sharing embed code', () => {
        let setupOptions = playerSetup.args[0][0];
        expect(setupOptions.sharing.code).to.equal(videoMeta.player_options.embedCode);
      });

      it('initializes the GoogleAnalytics plugin', () => {
        expect(GoogleAnalytics.init.calledWith(player, 'videoplayer0')).to.be.true;
      });

      it('initializes the Comscore plugin', () => {
        expect(Comscore.init.calledWith(player)).to.be.true;
      });
    });
  });
});
