import React, { PropTypes } from 'react'; // eslint-disable-line
import { shallow } from 'enzyme';

import Revealed from '../../../components/revealed';

import RailPlayerRoot, {
  RailPlayerHeader,
  RailPlayerCampaign,
} from './root';

import VideoPlayButton from 'bulbs-elements/components/video-play-button';

describe('<rail-player> <RailPlayerRoot>', () => {
  let subject;

  describe('<RailPlayerCampaign', () => {
    context('without video.tunic_campaign_url', () => {
      beforeEach(() => {
        let video = {};
        subject = shallow(<RailPlayerCampaign video={video}/>);
      });

      it('renders nothing', () => {
        expect(subject.equals(null)).to.be.true;
      });
    });

    context('with video.tunic_campaign_url', () => {
      beforeEach(() => {
        let props = {
          video: {
            tunic_campaign_url: 'http://example.org/tunic-url',
          },
        };

        subject = shallow(<RailPlayerCampaign {...props}/>);
      });

      it('renders a content sponsorship notice', () => {
        expect(subject).to.have.descendants('campaign-display');
      });

      it('sets the correct class', () => {
        expect(subject.find('campaign-display')).to.have.attr('class', 'rail-player-content-sponsorship');
      });

      it('props.src is the tunic_campaign_url', () => {
        expect(subject.find('campaign-display')).to.have.attr('src', 'http://example.org/tunic-url');
      });

      it('preamble text reflects sponsorship', () => {
        expect(subject.find('campaign-display')).to.have.attr('preamble-text', 'Sponsored By');
      });

      it('placement is rail-player', () => {
        expect(subject.find('campaign-display')).to.have.attr('placement', 'rail-player');
      });
    });
  });

  describe('renderHeaderLogo', () => {
    context('channel from video matches channel prop', () => {
      beforeEach(() => {
        let props = {
          channel: 'channel',
          video: {
            channel_slug: 'channel',
            channel_name: 'Channel',
            channel_logo_url: 'http://example.org/logo-url',
          },
        };

        subject = shallow(<RailPlayerHeader {...props}/>);
      });

      it('renders an image', () => {
        expect(subject).to.have.descendants('img.rail-player-logo');
      });

      it('sets the image src to video.channel_logo_url', () => {
        expect(subject.find('img')).to.have.attr('src', 'http://example.org/logo-url');
      });

      it('sets the image alt to video.channel_name', () => {
        expect(subject.find('img')).to.have.attr('alt', 'Channel');
      });
    });

    context('channel from video does not match channel prop', () => {
      beforeEach(() => {
        let props = {
          channel: 'no-match',
          video: {
            channel_slug: 'nope-not-a-match',
          },
        };

        subject = shallow(<RailPlayerHeader {...props}/>);
      });

      it('returns a <VideoPlayButton>', () => {
        expect(subject).to.contain(<VideoPlayButton/>);
      });
    });
  });

  describe('render', () => {
    context('no video prop', () => {
      beforeEach(() => {
        subject = shallow(<RailPlayerRoot/>);
      });

      it('renders an empty div', () => {
        expect(subject.equals(<div/>)).to.be.true;
      });
    });

    context('has video prop', () => {
      let props;
      beforeEach(() => {
        props = {
          recircUrl: 'http://example.org/recirc',
          video: {
            title: 'Video Title',
          },
        };
        subject = shallow(<RailPlayerRoot {...props}/>);
      });

      it('renders a header', () => {
        expect(subject).to.have.descendants('div.rail-player-header');
      });

      it('renders a <RailPlayerHeader', () => {
        expect(subject).to.contain(<RailPlayerHeader {...props}/>);
      });

      it('renders a rail-player-logo', () => {
        expect(subject).to.contain(
          <div className='rail-player-logo'>
            Video
          </div>
        );
      });

      it('renders a recirc link', () => {
        expect(subject).to.contain(
          <a
            className='rail-player-recirc-link'
            target='_blank'
            href='http://example.org/recirc'
          >
            Watch More
          </a>
        );
      });

      it('renders a <Revealed> component', () => {
        expect(subject).to.contain(
          <div className='rail-player-video bulbs-video-root player'>
            <Revealed disableSharing={true} {...props}/>
          </div>
        );
      });

      it('renders a footer', () => {
        expect(subject).to.contain(
          <div className='rail-player-footer'>
            <RailPlayerCampaign {...props}/>

            <div className='rail-player-title'>
              Video Title
            </div>
          </div>
        );
      });
    });
  });
});
