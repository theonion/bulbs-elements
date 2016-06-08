import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import Revealed from './revealed';
import video from '../fixtures/video.json';

describe('<bulbs-video> <Revealed>', () => {
  describe('propTypes', () => {
    let subject = Revealed.propTypes;

    it('accepts autoplay boolean', () => {
      expect(subject.autoplay).to.eql(PropTypes.bool);
    });

    it('accepts autoplayNext boolean', () => {
      expect(subject.autoplayNext).to.eql(PropTypes.bool);
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

    it('renders a <video>', () => {
      let videoEl = subject.find('video');
      expect(subject.find('video')).to.have.length(1);
      expect(videoEl).to.have.className('bulbs-video-video video-js vjs-default-skin');
      expect(videoEl).to.have.prop('controls');
    });

    it('renders video and sources', () => {
      expect(subject).to.contain(
        <source
          src='url-1'
          type='type-1'
        />
      );
      expect(subject).to.contain(
        <source
          src='url-2'
          type='type-2'
        />
      );
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
            refs: { video: videoRef },
            makeVideoPlayer: makeVideoPlayerSpy,
          });
        });

        it('sets sharetools config', () => {
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, {
              pluginConfig: {
                sharetools: {
                  shareUrl: window.location.href,
                  shareTitle: 'video_title',
                  shareDescription: '',
                  twitterHandle: 'twitter',
                },
              },
            }
          );
        });

        it('sets ga config', () => {
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, {
              pluginConfig: {
                ga: {
                  gaPrefix: sinon.match(/^videoplayer\d+$/),
                  eventCategory: 'Video:channel',
                  eventLabel: window.location.href,
                },
              },
            }
          );
        });

        it('sets vpbc config', () => {
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, {
              pluginConfig: {
                vpbc: {
                  vpCategory: 'category',
                  vpFlags: [''],
                  tags: ['host_channel', 'sc-slug', 'tag'],
                  optional: { flashEnabled: true },
                },
              },
            }
          );
        });

        it('sets endcard.allowCountdown config', () => {
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, {
              pluginConfig: {
                endcard: {
                  allowCountdown: true,
                },
              },
            }
          );
        });
      });

      context('when noEndcard is true', () => {
        beforeEach(() => {
          props.noEndcard = true;
          Revealed.prototype.componentDidMount.call({
            props,
            state,
            refs: { video: videoRef },
            makeVideoPlayer: makeVideoPlayerSpy,
          });
        });

        it('deletes endcard config', () => {
          expect(makeVideoPlayerSpy).to.have.been.calledWithMatch(
            videoRef, {
              pluginConfig: {
                endcard: undefined, // eslint-disable-line no-undefined
              },
            }
          );
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
});
