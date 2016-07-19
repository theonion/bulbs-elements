import React from 'react';
import { shallow } from 'enzyme';

import Revealed from '../../../components/revealed';

import RailPlayerRoot from './root';
import RailPlayerHeader from './header';
import RailPlayerCampaign from './campaign';

describe('<rail-player> <RailPlayerRoot>', () => {
  let subject;

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
            <Revealed
              muted={true}
              disableSharing={true}
              {...props}
            />
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
