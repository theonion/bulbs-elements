import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import url from 'url';
import querystring from 'querystring';

import Revealed from './revealed';
import GoogleAnalytics from '../plugins/google-analytics';
import Comscore from '../plugins/comscore';
import video from '../fixtures/video.json';
import util from 'bulbs-elements/util';

describe('<bulbs-video> <Revealed>', () => {
  beforeEach(() => {

    global.jwplayer = () => {
      return {
        on: sinon.spy(),
      };
    };
    sinon.stub(GoogleAnalytics, 'init');
    sinon.stub(Comscore, 'init');
  });

  afterEach(() => {
    GoogleAnalytics.init.restore();
    Comscore.init.restore();
  });

  describe('propTypes', () => {
    let subject = Revealed.propTypes;

    it('accepts autoplay string', () => {
      expect(subject.autoplay).to.eql(PropTypes.string);
    });

    it('accepts autoplayNext boolean', () => {
      expect(subject.autoplayNext).to.eql(PropTypes.bool);
    });

    it('accepts muted boolean', () => {
      expect(subject.muted).to.eql(PropTypes.bool);
    });

    it('accepts creativeSize string', () => {
      expect(subject.creativeSize).to.eql(PropTypes.string);
    });

    it('accepts disableAds boolean', () => {
      expect(subject.disableAds).to.eql(PropTypes.bool);
    });

    it('accepts embedded boolean', () => {
      expect(subject.embedded).to.eql(PropTypes.bool);
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
        controller: {},
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

    it('specifies refs', () => {
      subject = (new Revealed(props)).render();
      expect(subject.ref).to.eql('videoViewport');
      expect(subject.props.children.ref).to.eql('videoContainer');
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
          shareUrl: 'http://www.onionstudios.com/v/4974',
          targetSpecialCoverage: 'sc-slug',
          targetCampaignId: '5678',
          targetCampaignNumber: '123456',
          targetHostChannel: 'host_channel',
          videojs_options: {},
          twitterHandle: 'twitter',
          autoplay: '',
          autoplayNext: true,
          disableAds: true,
          embedded: true,
          muted: true,
          defaultCaptions: true,
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
                'tag': 'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&pf=html5&cv=h5_1.0.14.17.1&f=&t=4045%2Cclickhole%2Cmain%2Cshort_form%2Chtml5&s=main%2Fclickhole&cf=short_form&cd=96.757551&tt=p&st=0%3A0%2C3%2C4%2C10%2C20%3A1%2C91%2C100&rnd=9206206327905602',

              },
              'shareUrl': 'http://www.onionstudios.com/videos/beautiful-watch-this-woman-use-a-raw-steak-to-bang-out-the-word-equality-in-morse-code-on-the-hood-of-her-car-4053',
              'embedCode': '<iframe name=\"embedded\" allowfullscreen webkitallowfullscreen mozallowfullscreen frameborder=\"no\" width=\"480\" height=\"270\" scrolling=\"no\" src=\"http://www.onionstudios.com/embed?id=4023\"></iframe>',
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
          expect(makeVideoPlayerSpy.args[0][1].player_options.muted).to.be.true;
        });

        it('passes through the embedded value', () => {
          expect(makeVideoPlayerSpy.args[0][1].player_options.embedded).to.be.true;
        });

        it('passes through the defaultCaptions value', () => {
          expect(makeVideoPlayerSpy.args[0][1].player_options.defaultCaptions).to.be.true;
        });

        it('sets sharetools config', () => {
          let expected = 'http://www.onionstudios.com/v/4974';
          expect(makeVideoPlayerSpy.args[0][1].player_options.shareUrl).to.equal(expected);
        });

        it('sets ga config', () => {
          expect(makeVideoPlayerSpy.args[0][1].gaTrackerAction).to.be.a('function');
        });
      });

      context('disable-ads in video metadata response', () => {
        beforeEach(() => {
          props.disableAds = false;
          props.video.disable_ads = true;
          Revealed.prototype.componentDidMount.call({
            props,
            state,
            refs: { videoContainer: videoRef },
            makeVideoPlayer: makeVideoPlayerSpy,
          });
        });

        it('passes through disable_ads if part of video metadata response', () => {
          expect(makeVideoPlayerSpy.args[0][1].player_options.disable_ads).to.be.true;
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
           trackerRegex, 'dimension9', '5678'
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

  describe('componentWillUnmount', () => {
    let revealed;
    let remove;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      revealed = new Revealed({});
      revealed.player = {
        setMute: sandbox.spy(),
        remove: sandbox.spy(),
      };
      remove = sandbox.stub(util.InViewMonitor, 'remove');
      revealed.componentWillUnmount();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('mutes the player', () => {
      expect(revealed.player.setMute).to.have.been.calledWith(true);
    });

    it('stops the player', () => {
      expect(revealed.player.remove).to.have.been.called;
    });

    it('removes enter and exit viewport events', () => {
      expect(remove.called).to.be.true;
    });
  });

  describe('extractTrackCaptions', () => {
    let sources;

    context('no caption tracks', () => {
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

      it('returns an empty array', () => {
        let extractedCaptions = Revealed.prototype.extractTrackCaptions.call({}, sources);
        expect(extractedCaptions).to.eql([]);
      });
    });

    context('with caption tracks', () => {
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
          {
            'id': 19011,
            'url': 'http://v.theonion.com/onionstudios/video/4053/captioning.vtt',
            'content_type': 'text/vtt',
            'width': null,
            'bitrate': null,
            'enabled': true,
            'is_legacy_source': false,
            'video': 4053,
          },
        ];
      });

      it('returns the caption track info', () => {
        let extractedCaptions = Revealed.prototype.extractTrackCaptions.call({}, sources, false);
        expect(extractedCaptions).to.eql([
          {
            file: 'http://v.theonion.com/onionstudios/video/4053/captioning.vtt',
            label: 'English',
            kind: 'captions',
            default: false,
          },
        ]);
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
    let parseParam;

    beforeEach(() => {
      parseParam = sinon.stub();
    });

    it('returns false if query string empty', () => {
      parseParam.returns(false);
      let vastId = Revealed.prototype.vastTest.call({ parseParam }, '');
      expect(parseParam.called).to.be.false;
      expect(vastId).to.be.false;
    });

    it('returns false if no `adzone` query string key', () => {
      parseParam.returns(false);
      let vastId = Revealed.prototype.vastTest.call({ parseParam }, '?utm_source=facebook');
      expect(parseParam.calledWith('adzone', '?utm_source=facebook')).to.be.true;
      expect(vastId).to.be.false;
    });

    it('returns the vastUrl value if query string key present', () => {
      parseParam.returns('12345');
      let vastId = Revealed.prototype.vastTest.call({ parseParam }, '?adzone=12345');
      expect(parseParam.calledWith('adzone', '?adzone=12345')).to.be.true;
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
    let cacheBusterStub;
    let vastTestStub;
    let videoMeta;
    let utmTestData;
    let utmTestStub;
    let parseParamStub;

    context('default', () => {
      beforeEach(() => {
        cacheBusterStub = sinon.stub().returns('456');
        vastTestStub = sinon.stub().returns(null);
        utmTestData = {
          utmSource: 'test source',
          utmCampaign: 'test campaign',
          utmMedium: 'test medium',
        };
        utmTestStub = sinon.stub().returns(utmTestData);
        parseParamStub = sinon.stub().returns('');
        videoMeta = {
          category: 'main/clickhole',
          channel_slug: 'channel_slug',
          id: 2,
          hostChannel: 'host_channel',
          tags: ['clickhole', 'main', '12345'],
        };
        window.Bulbs = {
          settings: {
            DFP_SITE_CODE: 'fmg.onion',
          },
        };
      });

      afterEach(() => {
        delete window.Bulbs;
      });

      it('defaults to 640x480 if creativeSize is not overridden', () => {
        let vastUrl = Revealed.prototype.vastUrl.call({
          cacheBuster: cacheBusterStub,
          vastTest: vastTestStub,
          props: {},
        }, videoMeta);
        let parsed = url.parse(vastUrl, true);
        expect(parsed.query.sz).to.eql('640x480');
      });

      it('returns the vast url', function () {
        let vastUrl = Revealed.prototype.vastUrl.call({
          cacheBuster: cacheBusterStub,
          vastTest: vastTestStub,
          utmTest: utmTestStub,
          parseParam: parseParamStub,
          props: {},
        }, videoMeta);
        let parsed = url.parse(vastUrl, true);
        expect(parsed.protocol).to.eql('https:');
        expect(parsed.host).to.eql('pubads.g.doubleclick.net');
        expect(parsed.pathname).to.eql('/gampad/ads');
        expect(Object.keys(parsed.query)).to.eql(['sz', 'iu', 'impl', 'gdfp_req', 'env', 'output', 'unviewed_position_start', 'url', 'description_url', 'correlator', 'cust_params']);
        expect(parsed.query.sz).to.eql('640x480');
        expect(parsed.query.iu).to.eql('/4246/fmg.onion');
        expect(parsed.query.impl).to.eql('s');
        expect(parsed.query.gdfp_req).to.eql('1');
        expect(parsed.query.env).to.eql('vp');
        expect(parsed.query.output).to.eql('xml_vast2');
        expect(parsed.query.unviewed_position_start).to.eql('1');
        expect(parsed.query.url).to.eql(window.document.referrer);
        expect(parsed.query.description_url).to.eql('');
        expect(parsed.query.correlator).to.match(/^\d+$/);

        let cust_params = querystring.parse(parsed.query.cust_params, '&');
        expect(cust_params.video_site).to.eql('channel_slug');
        expect(cust_params.dfp_campaign_id).to.be.undefined;
        expect(cust_params.video_id).to.eql('2');
        expect(cust_params.video_channel).to.eql('channel_slug');
        expect(cust_params.video_series).to.be.undefined;
        expect(cust_params.pos).to.eql('host_channel');
        expect(Object.keys(cust_params)).to.eql(['video_site', 'video_id', 'video_channel', 'pos', 'utm_source', 'utm_campaign', 'utm_medium']);
      });

      context('with series', () => {
        it('populates the series key', () => {
          videoMeta.series_slug = 'undercover';
          let vastUrl = Revealed.prototype.vastUrl.call({
            cacheBuster: cacheBusterStub,
            vastTest: vastTestStub,
            utmTest: utmTestStub,
            parseParam: parseParamStub,
            props: {},
          }, videoMeta);
          let parsed = url.parse(vastUrl, true);
          let cust_params = querystring.parse(parsed.query.cust_params, '&');
          expect(cust_params.video_series).to.equal('undercover');
        });
      });

      context('with utm params', () => {
        it('populates the url with utm params', () => {
          let vastUrl = Revealed.prototype.vastUrl.call({
            cacheBuster: cacheBusterStub,
            vastTest: vastTestStub,
            utmTest: utmTestStub,
            parseParam: parseParamStub,
            props: {},
          }, videoMeta);
          let parsed = url.parse(vastUrl, true);
          let cust_params = querystring.parse(parsed.query.cust_params, '&');
          expect(cust_params.utm_source).to.equal(utmTestData.utmSource);
          expect(cust_params.utm_campaign).to.equal(utmTestData.utmCampaign);
          expect(cust_params.utm_medium).to.equal(utmTestData.utmMedium);
        });
      });

      context('with exp variation', () => {
        it('populates the url with exp_variation', () => {
          parseParamStub.returns('expVar12345');
          let vastUrl = Revealed.prototype.vastUrl.call({
            cacheBuster: cacheBusterStub,
            vastTest: vastTestStub,
            utmTest: utmTestStub,
            parseParam: parseParamStub,
            props: {},
          }, videoMeta);
          let parsed = url.parse(vastUrl, true);
          let cust_params = querystring.parse(parsed.query.cust_params, '&');
          expect(cust_params.exp_variation).to.equal('expVar12345');
        });
      });

      context('sponsored', () => {
        it('populates the campaign key', () => {
          let vastUrl = Revealed.prototype.vastUrl.call({
            cacheBuster: cacheBusterStub,
            vastTest: vastTestStub,
            utmTest: utmTestStub,
            parseParam: parseParamStub,
            props: { targetCampaignId: 1 },
          }, videoMeta);
          let parsed = url.parse(vastUrl, true);
          let cust_params = querystring.parse(parsed.query.cust_params, '&');
          expect(cust_params.dfp_campaign_id).to.equal('1');
          expect(cust_params.type).to.equal('sponsored');
        });
      });

      context('special coverage', () => {
        it('populates the special coverage targeting key', () => {
          videoMeta.specialCoverage = 'special';
          let vastUrl = Revealed.prototype.vastUrl.call({
            cacheBuster: cacheBusterStub,
            vastTest: vastTestStub,
            utmTest: utmTestStub,
            parseParam: parseParamStub,
            props: { },
          }, videoMeta);
          let parsed = url.parse(vastUrl, true);
          let cust_params = querystring.parse(parsed.query.cust_params, '&');
          expect(Object.keys(cust_params)).to.eql([
            'video_site', 'video_id', 'video_channel', 'pos', 'dfp_specialcoverage', 'type', 'utm_source', 'utm_campaign', 'utm_medium',
          ]);
          expect(cust_params.dfp_specialcoverage).to.eql('special');
          expect(cust_params.type).to.eql('special_coverage');
        });
      });
    });

    context('overrides', () => {
      it('allows creativeSize to be overridden', () => {
        let vastUrl = Revealed.prototype.vastUrl.call({
          cacheBuster: cacheBusterStub,
          vastTest: vastTestStub,
          props: {
            creativeSize: '400x300',
          },
        }, videoMeta);
        let parsed = url.parse(vastUrl, true);
        expect(parsed.query.sz).to.eql('400x300');
      });
    });

    context('when a test link is provided', () => {
      beforeEach(() => {
        window.Bulbs = {
          settings: {
            DFP_SITE_CODE: 'fmg.onion',
          },
        };
        cacheBusterStub = sinon.stub().returns('456');
        vastTestStub = sinon.stub().returns('12345');
        utmTestStub = sinon.stub().returns({});
        parseParamStub = sinon.stub().returns('');
        videoMeta = {
          category: 'main/clickhole',
          channel_slug: 'channel_slug',
          series_slug: 'series_slug',
          hostChannel: 'host_channel',
        };
      });

      afterEach(() => {
        delete window.Bulbs;
      });

      it('populates test param as `forcedAdZone`', () => {
        let vastUrl = Revealed.prototype.vastUrl.call({
          cacheBuster: cacheBusterStub,
          vastTest: vastTestStub,
          utmTest: utmTestStub,
          parseParam: parseParamStub,
          props: { },
        }, videoMeta);
        let parsed = url.parse(vastUrl, true);
        let cust_params = querystring.parse(parsed.query.cust_params);
        expect(cust_params.forcedAdZone).to.eql('12345');
      });
    });
  });

  describe('makeVideoPlayer', () => {
    let playerSetup;
    let playerOn;
    let element;
    let player;
    let videoMeta;
    let gaTrackerAction;

    beforeEach(() => {
      element = {};
      gaTrackerAction = () => {};

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
            'tag': 'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0&pf=html5&cv=h5_1.0.14.17.1&f=&t=4045%2Cclickhole%2Cmain%2Cshort_form%2Chtml5&s=main%2Fclickhole&cf=short_form&cd=96.757551&tt=p&st=0%3A0%2C3%2C4%2C10%2C20%3A1%2C91%2C100&rnd=9206206327905602',
          },
          'shareUrl': 'http://www.onionstudios.com/videos/beautiful-watch-this-woman-use-a-raw-steak-to-bang-out-the-word-equality-in-morse-code-on-the-hood-of-her-car-4053',
          'embedCode': '<iframe name=\"embedded\" allowfullscreen webkitallowfullscreen mozallowfullscreen frameborder=\"no\" width=\"480\" height=\"270\" scrolling=\"no\" src=\"http://www.onionstudios.com/embed?id=4023\"></iframe>',
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
        gaTrackerAction,
      });
      playerSetup = sinon.spy();
      playerOn = sinon.spy();
      player = {
        on: playerOn,
        setup: playerSetup,
      };
      global.jwplayer = () => {
        return player;
      };
    });

    describe('constructor', () => {
      it('binds the forwardJWEvent method', () => {
        sinon.spy(Revealed.prototype.forwardJWEvent, 'bind');
        let revealed = new Revealed({});
        expect(Revealed.prototype.forwardJWEvent.bind).to.have.been.calledWith(revealed);
        sinon.restore();
      });

      it('binds the setPlaysInline method', () => {
        sinon.spy(Revealed.prototype.setPlaysInline, 'bind');
        let revealed = new Revealed({});
        expect(Revealed.prototype.setPlaysInline.bind).to.have.been.calledWith(revealed);
        sinon.restore();
      });
    });

    describe('player set up', () => {
      let sources;
      let extractSourcesStub;
      let vastUrlStub;
      let extractTrackCaptionsStub;
      let forwardJWEvent = sinon.spy();
      let setPlaysInline = sinon.spy();

      context('regular setup', () => {
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
          extractTrackCaptionsStub = sinon.stub().returns([]);

          Revealed.prototype.makeVideoPlayer.call({
            props: {
              controller: {},
            },
            extractSources: extractSourcesStub,
            vastUrl: vastUrlStub,
            extractTrackCaptions: extractTrackCaptionsStub,
            forwardJWEvent,
            setPlaysInline,
          }, element, videoMeta);
        });

        it('sets up the player', () => {
          expect(playerSetup.called).to.be.true;
        });

        it('forwards player beforePlay event', () => {
          expect(playerOn).to.have.been.calledWith('beforePlay', forwardJWEvent);
        });

        it('forwards player complete event', () => {
          expect(playerOn).to.have.been.calledWith('complete', forwardJWEvent);
        });

        it('sets playsInline property on beforePlay event', () => {
          expect(playerOn).to.have.been.calledWith('beforePlay', setPlaysInline);
        });

        it('includes only the HLS & mp4 sources', () => {
          let setupOptions = playerSetup.args[0][0];
          expect(setupOptions.sources).to.eql(sources);
        });

        it('sets up the advertising VAST tag', () => {
          let setupOptions = playerSetup.args[0][0];
          expect(setupOptions.advertising.client).to.equal('googima');
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
          expect(GoogleAnalytics.init.calledWith(player, gaTrackerAction)).to.be.true;
        });

        it('initializes the Comscore plugin', () => {
          expect(Comscore.init.calledWith(player)).to.be.true;
        });
      });

      context('with captions in the sources', () => {
        let extractCaptionsStub;
        let captioningTracks;

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
          captioningTracks = [
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/captioning.vtt',
              'label': 'English',
              'kind': 'captions',
              'default': 'true',
            },
          ];
          extractCaptionsStub = sinon.stub().returns(captioningTracks);

          Revealed.prototype.makeVideoPlayer.call({
            props: {
              controller: {},
            },
            extractSources: extractSourcesStub,
            vastUrl: vastUrlStub,
            extractTrackCaptions: extractCaptionsStub,
          }, element, videoMeta);
        });

        it('sets up any provided captioning tracks', () => {
          let setupOptions = playerSetup.args[0][0];
          expect(setupOptions.tracks).to.eql(captioningTracks);
        });
      });

      context('sharing disabled', () => {
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
          extractTrackCaptionsStub = sinon.stub().returns([]);

          Revealed.prototype.makeVideoPlayer.call({
            props: {
              disableSharing: true,
              controller: {},
            },
            extractSources: extractSourcesStub,
            vastUrl: vastUrlStub,
            extractTrackCaptions: extractTrackCaptionsStub,
          }, element, videoMeta);
        });

        it('does not set sharing configuration', () => {
          let setupOptions = playerSetup.args[0][0];
          expect(setupOptions.sharing).to.be.undefined;
        });
      });

      context('autoplayInView', () => {
        let handleAutoPlayInViewStub;
        let handlePauseEventStub;
        let params;
        let playerInViewportStub;
        let sandbox;
        let videoViewport;

        beforeEach(() => {
          sandbox = sinon.sandbox.create();
          videoViewport = document.createElement('div');
          sources = [
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
            },
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
            },
          ];
          extractSourcesStub = sandbox.stub().returns(sources);
          vastUrlStub = sandbox.stub().returns('http://localhost:8080/vast.xml');
          extractTrackCaptionsStub = sandbox.stub().returns([]);
          handleAutoPlayInViewStub = sandbox.stub();
          handlePauseEventStub = sandbox.stub();
          playerInViewportStub = sandbox.stub().returns(true);
          params = {
            props: {
              autoplayInView: '',
              controller: {
                revealed: true,
              },
            },
            refs: {
              videoViewport,
            },
            extractSources: extractSourcesStub,
            vastUrl: vastUrlStub,
            extractTrackCaptions: extractTrackCaptionsStub,
            handleAutoPlayInView: handleAutoPlayInViewStub,
            handlePauseEvent: handlePauseEventStub,
            playerInViewport: playerInViewportStub,
          };

        });

        afterEach(() => {
          sandbox.restore();
        });

        it('calls handleAutoPlayInView', () => {
          Revealed.prototype.makeVideoPlayer.call(params, element, videoMeta);
          expect(handleAutoPlayInViewStub).to.be.called;
        });

        it('initializes InViewMonitor', () => {
          let inViewMonitorAdd = sandbox.stub(util.InViewMonitor, 'add');
          Revealed.prototype.handleAutoPlayInView.call(params, element, videoMeta);
          expect(inViewMonitorAdd.called).to.be.true;
        });

        it('autoplays video on load if its in the viewport', () => {
          sandbox.stub(util.InViewMonitor, 'isElementInViewport').returns(true);
          let expected = Revealed.prototype.playerInViewport.call(element);
          expect(expected).to.be.true;
        });

        it('no autoplay on load if video is not in viewport', () => {
          sandbox.stub(util.InViewMonitor, 'isElementInViewport').returns(false);
          let expected = Revealed.prototype.playerInViewport.call(element);
          expect(expected).to.be.false;
        });

        it('attaches play to enterviewport event', () => {
          let eventListener = sandbox.spy(videoViewport, 'addEventListener');
          Revealed.prototype.handleAutoPlayInView.call(params, element, videoMeta);
          expect(eventListener).to.have.been.calledWith('enterviewport');
        });

        it('attaches play to enterviewport event', () => {
          let eventListener = sandbox.spy(videoViewport, 'addEventListener');
          Revealed.prototype.handleAutoPlayInView.call(params, element, videoMeta);
          expect(eventListener).to.have.been.calledWith('exitviewport');
        });

        it('detaches enterviewport play event when user pauses video', () => {
          let eventListener = sandbox.spy(videoViewport, 'removeEventListener');
          let pauseStub = sandbox.stub();
          Revealed.prototype.makeVideoPlayer.call(params, element, videoMeta);
          Revealed.prototype.handleAutoPlayInView.call(params, element, videoMeta);
          params.player.pause = pauseStub;
          element.pauseReason = 'interaction';
          Revealed.prototype.handlePauseEvent.call(params, element, videoMeta);
          expect(eventListener).to.have.been.calledWith('enterviewport');
        });

        it('does nothing if exitviewport event pauses video', () => {
          let eventListener = sandbox.spy(videoViewport, 'removeEventListener');
          let pauseStub = sandbox.stub();
          Revealed.prototype.makeVideoPlayer.call(params, element, videoMeta);
          Revealed.prototype.handleAutoPlayInView.call(params, element, videoMeta);
          params.player.pause = pauseStub;
          element.pauseReason = 'external';
          Revealed.prototype.handlePauseEvent.call(params, element, videoMeta);
          expect(eventListener.called).to.be.false;
        });
      });

      context('embedded setup', () => {
        beforeEach(() => {
          videoMeta.player_options.embedded = true;
          sources = [
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
            },
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
            },
          ];
          extractSourcesStub = sinon.stub().returns(sources);
          extractTrackCaptionsStub = sinon.stub().returns([]);
          vastUrlStub = sinon.stub();
          Revealed.prototype.makeVideoPlayer.call({
            props: {
              controller: {},
            },
            extractSources: extractSourcesStub,
            extractTrackCaptions: extractTrackCaptionsStub,
            vastUrl: vastUrlStub,
          }, element, videoMeta);
        });

        it('does not call the vast url', () => {
          expect(vastUrlStub.called).be.false;
        });

        it('does not pass in advertising option', () => {
          let setupOptions = playerSetup.args[0][0];
          expect(setupOptions.advertising).to.be.undefined;
        });
      });

      context('disableAds setup', () => {
        beforeEach(() => {
          videoMeta.player_options.disable_ads = true;
          sources = [
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
            },
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
            },
          ];
          extractSourcesStub = sinon.stub().returns(sources);
          extractTrackCaptionsStub = sinon.stub().returns([]);
          vastUrlStub = sinon.stub();
          Revealed.prototype.makeVideoPlayer.call({
            props: {
              controller: {},
            },
            extractSources: extractSourcesStub,
            extractTrackCaptions: extractTrackCaptionsStub,
            vastUrl: vastUrlStub,
          }, element, videoMeta);
        });

        it('does not call the vast url', () => {
          expect(vastUrlStub.called).be.false;
        });

        it('does not pass in advertising option', () => {
          let setupOptions = playerSetup.args[0][0];
          expect(setupOptions.advertising).to.be.undefined;
        });
      });
    });
  });
});
