import './bulbs-video';
import fetchMock from 'fetch-mock';
import GoogleAnalytics from './plugins/google-analytics';
import Comscore from './plugins/comscore';
import video from './fixtures/video.json';
import util from 'bulbs-elements/util';
import url from 'url';

describe('<bulbs-video>', () => {
  let src = '//example.org/video-src.json';
  let subject;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.spy(util, 'cachedFetch');
    fetchMock.mock(src, {});
    subject = document.createElement('bulbs-video');
    subject.setAttribute('src', src);
    subject.setAttribute('disable-lazy-loading', true);
    sandbox.stub(GoogleAnalytics, 'init');
    sandbox.stub(Comscore, 'init');
  });

  afterEach(() => {
    sandbox.restore();
    if (document.body.contains(subject)) {
      document.body.removeChild(subject);
    }
  });

  describe('props', () => {
    beforeEach(() => {
      subject.setAttribute('autoplay-in-view', '');
      subject.setAttribute('disable-meta-link', '');
      subject.setAttribute('disable-sharing', '');
      subject.setAttribute('embedded', '');
      subject.setAttribute('enable-poster-meta', '');
      subject.setAttribute('hide-controls', '');
      subject.setAttribute('muted', '');
      subject.setAttribute('no-cover', '');
      subject.setAttribute('no-endcard', '');
      subject.setAttribute('playsinline', '');
      subject.setAttribute('target-campaign-id', 'campaign-id');
      subject.setAttribute('target-campaign-number', 'campaign-number');
      subject.setAttribute('target-special-coverage', 'special-coverage');
      subject.setAttribute('twitter-handle', 'twitter-handle');
      subject.setAttribute('share-url', '//share-url');
      subject.setAttribute('src', '//src');
    });

    it('casts autoplayInView to boolean', () => {
      expect(subject.props.autoplayInView).to.be.true;
    });

    it('casts disableMetaLink to boolean', () => {
      expect(subject.props.disableMetaLink).to.be.true;
    });

    it('casts disableSharing to boolean', () => {
      expect(subject.props.disableSharing).to.be.true;
    });

    it('casts embedded to boolean', () => {
      expect(subject.props.embedded).to.be.true;
    });

    it('casts enablePosterMeta to boolean', () => {
      expect(subject.props.enablePosterMeta).to.be.true;
    });

    it('casts hideControls to boolean', () => {
      expect(subject.props.hideControls).to.be.true;
    });

    it('casts muted to boolean', () => {
      expect(subject.props.muted).to.be.true;
    });

    it('casts noCover to boolean', () => {
      expect(subject.props.noCover).to.be.true;
    });

    it('casts noEndcard to boolean', () => {
      expect(subject.props.noEndcard).to.be.true;
    });

    it('casts playsinline to boolean', () => {
      expect(subject.props.playsinline).to.be.true;
    });
  });

  describe('globalsCheck', () => {
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
        expect(() => {
          subject.state = { load: true };
          subject.createdCallback();
        }).to.throw(`\`<bulbs-video>\` requires \`${name}\` to be in global scope.`);
        global[name] = _global;
      });
    });
  });

  describe('#attachedCallback', () => {
    it('sets refs to inner elements', () => {
      subject.attachedCallback();
      let { videoContainer, videoViewport, videoCover } = subject.refs;
      expect(videoContainer.classList.contains('video-container')).to.be.true;
      expect(videoViewport.classList.contains('bulbs-video-viewport')).to.be.true;
      expect(videoCover.classList.contains('bulbs-video-cover')).to.be.true;
    });

    it('creates inner DOM structure', () => {
      subject.attachedCallback();
      expect(subject.querySelector(
        '.bulbs-video-root > .bulbs-video-viewport > .video-container'
      )).to.not.be.null;

      expect(subject.querySelector(
        '.bulbs-video-root > .bulbs-video-cover > .bulbs-video-poster-overlay > bulbs-video-play-button'
      )).to.not.be.null;

      expect(subject.querySelector('bulbs-viedo-meta')).to.be.null;
    });

    it('renders posterMeta DOM structure', () => {
      subject.setAttribute('enable-poster-meta', '');
      subject.attachedCallback();
      expect(subject.querySelector(
        '.bulbs-video-root > .bulbs-video-cover > .bulbs-video-poster-overlay > bulbs-video-meta'
      )).to.not.be.null;
    });

    it('fetches video data', () => {
      subject.attachedCallback();
      expect(util.cachedFetch).to.have.been.calledWith(
        src, { redirect: 'follow' }
      ).once;
    });
  });

  describe('#attributeChangedCallback', () => {
    let newSrc = '//example.org/new-video-src.html';

    context('src did not change', () => {
      it('does not fetch data', () => {
        util.cachedFetch.restore();
        sandbox.spy(util, 'cachedFetch');
        subject.setAttribute('src', subject.getAttribute('src'));
        expect(util.cachedFetch).not.to.have.been.called;
      });
    });

    context('src did change', () => {
      beforeEach(() => {
        fetchMock.mock(newSrc, {});
        subject.state.load = true;
      });

      it('fetches video data', () => {
        subject.setAttribute('src', newSrc);
        expect(util.cachedFetch).to.have.been.calledWith(
          newSrc, { redirect: 'follow' }
        ).once;
      });
    });
  });

  describe('lazy loading', () => {
    let container;

    beforeEach((done) => {
      document.body.style.minHeight = (window.innerHeight * 2) + 'px';

      subject.removeAttribute('disable-lazy-loading');
      container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '200%';
      document.body.appendChild(container);
      container.appendChild(subject);
      setImmediate(() => done());
    });

    afterEach(() => {
      container.remove();
    });

    it('should not load video until it is within viewing threshold', (done) => {
      expect(container.querySelector('.bulbs-video-root')).to.be.null;
      container.style.top = '0';
      try {
        window.dispatchEvent(new Event('scroll'));
      }
      catch (error) {
        const event = document.createEvent('Event');
        event.initEvent('scroll', false, true);
        window.dispatchEvent(event);
      }

      requestAnimationFrame(() => {
        expect(container.querySelector('.bulbs-video-root')).not.to.be.null;
        done();
      });
    });
  });

  describe('makes a video player', () => {
    let trackerRegex = /^videoplayer\d+.set$/;
    let attrs;
    let videoMeta;

    beforeEach(() => {
      attrs = {
        'share-url': 'http://www.onionstudios.com/v/4974',
        'target-special-coverage': 'sc-slug',
        'target-campaign-id': '5678',
        'target-campaign-number': '123456',
        'target-host-channel': 'host_channel',
        'twitter-handle': 'twitter',
        'autoplay': '',
        'autoplay-in-view': '',
        'embedded': '',
        'muted': '',
        'default-captions': '',
      };
      videoMeta = Object.assign({}, video, {
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
      });
      global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'a-ga-id';
      global.ga = sandbox.spy();
    });

    context('handleFetchSuccess', () => {
      beforeEach(() => {
        Object.keys(attrs).forEach((attr) => {
          subject.setAttribute(attr, attrs[attr]);
        });
        subject.state.load = true;
        subject.createdCallback();
        subject.attachedCallback();
        sandbox.spy(subject, 'makeVideoPlayer');
        subject.handleFetchSuccess(videoMeta);
      });

      it('overrides `main` in the tags to use attribute host channel', () => {
        let tags = subject.makeVideoPlayer.args[0][1].tags;
        expect(tags).to.include('host_channel');
        expect(tags).not.to.include('main');
      });

      it('includes special coverage in the tags for targeting', () => {
        let tags = subject.makeVideoPlayer.args[0][1].tags;
        expect(tags).to.include('sc-slug');
      });

      it('includes the campaign number in the tags for targeting', () => {
        let tags = subject.makeVideoPlayer.args[0][1].tags;
        expect(tags).to.include('123456');
      });

      it('includes the campaign id in the tags for targeting', () => {
        let tags = subject.makeVideoPlayer.args[0][1].tags;
        expect(tags).to.include('campaign-5678');
      });

      it('passes through the muted value', () => {
        expect(subject.makeVideoPlayer.args[0][1].player_options.muted).to.be.true;
      });

      it('passes through the embedded value', () => {
        expect(subject.makeVideoPlayer.args[0][1].player_options.embedded).to.be.true;
      });

      it('passes through the defaultCaptions value', () => {
        expect(subject.makeVideoPlayer.args[0][1].player_options.defaultCaptions).to.be.true;
      });

      it('sets sharetools config', () => {
        let expected = 'http://www.onionstudios.com/v/4974';
        expect(subject.makeVideoPlayer.args[0][1].player_options.shareUrl).to.equal(expected);
      });

      it('sets ga config', () => {
        expect(subject.makeVideoPlayer.args[0][1].gaTrackerAction).to.be.a('function');
      });
    });

    context('analytics', () => {
      beforeEach(() => {
        Object.keys(attrs).forEach((attr) => {
          subject.setAttribute(attr, attrs[attr]);
        });
        subject.state.load = true;
        subject.createdCallback();
        subject.attachedCallback();
        sandbox.spy(subject, 'makeVideoPlayer');
        subject.handleFetchSuccess(videoMeta);
      });

      it('creates a prefixed ga tracker', () => {
        expect(global.ga).to.have.been.calledWithMatch(
          'create', 'a-ga-id', 'auto', { name: sandbox.match(/^videoplayer\d+$/) }
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

  describe('detachedCallback', () => {
    beforeEach((done) => {
      subject.state.load = true;
      subject.createdCallback();
      subject.attachedCallback();
      subject.player = { remove: sandbox.spy() };
      sandbox.stub(util.InViewMonitor, 'remove');
      subject.detachedCallback();
      setImmediate(() => {
        done();
      });
    });

    it('stops the player', () => {
      expect(subject.player.remove).to.have.been.called;
    });

    it('removes enter and exit viewport events', () => {
      expect(util.InViewMonitor.remove.called).to.be.true;
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
        let extractedCaptions = subject.extractTrackCaptions(sources);
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
        let extractedCaptions = subject.extractTrackCaptions(sources, false);
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
      let extractedSources = subject.extractSources(sources);
      expect(extractedSources[0].file).to.equal('http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8');
      expect(extractedSources[1].file).to.equal('http://v.theonion.com/onionstudios/video/4053/640.mp4');
    });
  });

  describe('cacheBuster', () => {
    it('returns a random number', () => {
      let integerRegEx = /^\d+$/;
      let cacheBuster = subject.cacheBuster();
      expect(cacheBuster).to.match(integerRegEx);
    });
  });

  describe('vastTest', () => {
    it('returns false if query string empty', () => {
      sandbox.stub(subject, 'parseParam').returns(false);
      let vastId = subject.vastTest('');
      expect(vastId).to.be.false;
    });

    it('returns false if no xgid query string key', () => {
      sandbox.stub(subject, 'parseParam').returns(false);
      let vastId = subject.vastTest('?utm_source=facebook');
      expect(vastId).to.be.false;
    });

    it('returns the vastUrl value if query string key present', () => {
      sandbox.stub(subject, 'parseParam').returns('12345');
      let vastId = subject.vastTest('?xgid=12345');
      expect(vastId).to.equal('12345');
    });
  });

  describe('parseParam', () => {
    it('returns the value if it find its in the query string', () => {
      let value = subject.parseParam('foo', '?foo=12345');
      expect(value).to.equal('12345');
    });

    it('does not return the value if it does not find it in the query string', () => {
      let value = subject.parseParam.call('bar', '?foo=12345');
      expect(value).to.be.null;
    });
  });

  describe('vastUrl', () => {
    let videoMeta;

    context('default', () => {
      beforeEach(() => {
        sandbox.stub(subject, 'cacheBuster').returns('456');
        sandbox.stub(subject, 'vastTest').returns(null);

        videoMeta = {
          tags: ['clickhole', 'main', '12345'],
          category: 'main/clickhole',
          channel_slug: 'channel_slug',
          hostChannel: 'host_channel',
        };
      });

      it('returns the vast url', function () {
        let vastUrl = subject.vastUrl(videoMeta);
        let parsed = url.parse(vastUrl, true);

        expect(parsed.protocol).to.eql('http:');
        expect(parsed.host).to.eql('us-theonion.videoplaza.tv');
        expect(parsed.pathname).to.eql('/proxy/distributor/v2');
        expect(Object.keys(parsed.query)).to.eql(['rt', 'tt', 't', 's', 'rnd']);
        expect(parsed.query.rt).to.eql('vast_2.0');
        expect(parsed.query.tt).to.eql('p');
        expect(parsed.query.t).to.eql('clickhole,main,12345,html5');
        expect(parsed.query.s).to.eql('host_channel/channel_slug');
        expect(parsed.query.rnd).to.eql('456');
      });
    });

    context('when series_slug is given', () => {
      beforeEach(() => {
        sandbox.stub(subject, 'cacheBuster').returns('456');
        sandbox.stub(subject, 'vastTest').returns(null);

        videoMeta = {
          tags: ['clickhole', 'main', '12345'],
          category: 'main/clickhole',
          channel_slug: 'channel_slug',
          series_slug: 'series_slug',
          hostChannel: 'host_channel',
        };
      });

      it('returns the vast url', function () {
        let vastUrl = subject.vastUrl(videoMeta);
        let parsed = url.parse(vastUrl, true);

        expect(parsed.query.s).to.eql('host_channel/channel_slug/series_slug');
      });
    });
  });

  describe('makeVideoPlayer', () => {
    let playerSetup;
    let playerOn;
    let player;
    let videoMeta;
    let gaTrackerAction;

    beforeEach(() => {
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
      playerSetup = sandbox.spy();
      playerOn = sandbox.spy();
      player = {
        on: playerOn,
        setup: playerSetup,
      };
      global.jwplayer = () => {
        return player;
      };
    });

    describe('contstructor', () => {
      it('binds the forwardJWEvent method', () => {
        let spyBind = sandbox.spy(subject.forwardJWEvent, 'bind');
        subject.state.load = true;
        subject.createdCallback();
        expect(spyBind).to.have.been.calledWith(subject);
      });

      it('binds the setPlaysInline method', () => {
        let spyBind = sandbox.spy(subject.setPlaysInline, 'bind');
        subject.state.load = true;
        subject.createdCallback();
        expect(spyBind).to.have.been.calledWith(subject);
        sandbox.restore();
      });
    });

    describe('player set up', () => {
      let sources;
      let vastUrlStub;

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
          vastUrlStub = sandbox.stub(subject, 'vastUrl').returns('http://localhost:8080/vast.xml');

          subject.state.load = true;
          subject.createdCallback();
          subject.attachedCallback();

          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
        });

        it('sets up the player', () => {
          expect(playerSetup.called).to.be.true;
        });

        it('forwards player beforePlay event', () => {
          expect(playerOn).to.have.been.calledWith('beforePlay', subject.forwardJWEvent);
        });

        it('forwards player complete event', () => {
          expect(playerOn).to.have.been.calledWith('complete', subject.forwardJWEvent);
        });

        it('sets playsInline property on beforePlay event', () => {
          expect(playerOn).to.have.been.calledWith('beforePlay', subject.setPlaysInline);
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
          expect(GoogleAnalytics.init.calledWith(player, gaTrackerAction)).to.be.true;
        });

        it('initializes the Comscore plugin', () => {
          expect(Comscore.init.calledWith(player)).to.be.true;
        });
      });

      context('with captions in the sources', () => {
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
          sandbox.stub(subject, 'extractSources').returns(sources);
          vastUrlStub = sandbox.stub(subject, 'vastUrl').returns('http://localhost:8080/vast.xml');
          captioningTracks = [
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/captioning.vtt',
              'label': 'English',
              'kind': 'captions',
              'default': 'true',
            },
          ];
          sandbox.stub(subject, 'extractTrackCaptions').returns(captioningTracks);

          subject.state.load = true;
          subject.createdCallback();
          subject.attachedCallback();

          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
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
          sandbox.stub(subject, 'extractSources').returns(sources);
          vastUrlStub = sandbox.stub(subject, 'vastUrl').returns('http://localhost:8080/vast.xml');
          sandbox.stub(subject, 'extractTrackCaptions').returns([]);

          subject.state.load = true;
          subject.setAttribute('disable-sharing', '');
          subject.createdCallback();
          subject.attachedCallback();

          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
        });

        it('does not set sharing configuration', () => {
          let setupOptions = playerSetup.args[0][0];
          expect(setupOptions.sharing).to.be.undefined;
        });
      });

      context('autoplayInView', () => {
        let handleAutoPlayInViewStub;

        beforeEach(() => {
          sources = [
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/hls_playlist.m3u8',
            },
            {
              'file': 'http://v.theonion.com/onionstudios/video/4053/640.mp4',
            },
          ];
          sandbox.stub(subject, 'extractSources').returns(sources);
          vastUrlStub = sandbox.stub(subject, 'vastUrl').returns('http://localhost:8080/vast.xml');
          sandbox.stub(subject, 'extractTrackCaptions').returns([]);
          handleAutoPlayInViewStub = sandbox.spy(subject, 'handleAutoPlayInView');

          subject.state.load = true;
          subject.setAttribute('autoplay-in-view', '');
          subject.createdCallback();
          subject.attachedCallback();
        });

        it('calls handleAutoPlayInView', () => {
          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
          expect(handleAutoPlayInViewStub).to.be.called;
        });

        it('initializes InViewMonitor', () => {
          let inViewMonitorAdd = sandbox.stub(util.InViewMonitor, 'add');
          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
          expect(inViewMonitorAdd.called).to.be.true;
        });

        it('autoplays video on load if its in the viewport', () => {
          sandbox.stub(util.InViewMonitor, 'isElementInViewport').returns(true);
          let expected = subject.playerInViewport();
          expect(expected).to.be.true;
        });

        it('no autoplay on load if video is not in viewport', () => {
          sandbox.stub(util.InViewMonitor, 'isElementInViewport').returns(false);
          let expected = subject.playerInViewport();
          expect(expected).to.be.false;
        });

        it('attaches play to enterviewport event', () => {
          let eventListener = sandbox.spy(subject.refs.videoViewport, 'addEventListener');
          subject.handleAutoPlayInView(subject.refs.videoContainer, videoMeta);
          expect(eventListener).to.have.been.calledWith('enterviewport');
        });

        it('attaches play to enterviewport event', () => {
          let eventListener = sandbox.spy(subject.refs.videoViewport, 'addEventListener');
          subject.handleAutoPlayInView(subject.refs.videoContainer, videoMeta);
          expect(eventListener).to.have.been.calledWith('exitviewport');
        });

        it('detaches enterviewport play event when user pauses video', () => {
          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
          subject.handleAutoPlayInView(subject.refs.videoContainer, videoMeta);
          let eventListener = sandbox.spy(subject.refs.videoViewport, 'removeEventListener');
          subject.player.pause = sandbox.stub();
          subject.handlePauseEvent({ pauseReason: 'interaction' });
          expect(eventListener).to.have.been.calledWith('enterviewport');
        });

        it('does nothing if exitviewport event pauses video', () => {
          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
          subject.handleAutoPlayInView(subject.refs.videoContainer, videoMeta);
          let eventListener = sandbox.spy(subject.refs.videoViewport, 'removeEventListener');
          subject.player.pause = sandbox.stub();
          subject.handlePauseEvent({ pauseReason: 'external' });
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
          sandbox.stub(subject, 'extractSources').returns(sources);
          sandbox.stub(subject, 'extractTrackCaptions').returns([]);
          vastUrlStub = sandbox.stub(subject, 'vastUrl');

          subject.state.load = true;
          subject.createdCallback();
          subject.attachedCallback();

          subject.makeVideoPlayer(subject.refs.videoContainer, videoMeta);
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
