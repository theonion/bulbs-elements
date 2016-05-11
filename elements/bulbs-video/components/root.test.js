import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import Root from './root';
import Revealed from './revealed';
import Cover from './cover';

describe('<bulbs-video> <Root>', () => {
  describe('propTypes', () => {
    let subject = Root.propTypes;

    it('requires actions', () => {
      expect(subject.actions).to.eql(PropTypes.object.isRequired);
    });

    it('requires controller', () => {
      expect(subject.controller).to.eql(PropTypes.object.isRequired);
    });

    it('accepts video', () => {
      expect(subject.video).to.eql(PropTypes.object);
    });
  });

  describe('render', () => {
    let subject;
    let props;
    let actions = {};
    let video = {};
    let controller = {};
    let twitterHandle = 'twitterHandle';

    context('without video', () => {
      beforeEach(() => {
        props = {
          actions,
          controller,
        };
        subject = shallow(<Root {...props}/>);
      });

      it('renders blank div', () => {
        expect(subject).to.contain(<div className='bulbs-video-root player'/>);
      });
    });

    context('controller.revealed is true', () => {
      beforeEach(() => {
        props = {
          actions,
          video,
          controller: { revealed: true },
          twitterHandle,
        };
        subject = shallow(<Root {...props}/>);
      });

      it('renders video-root div', () => {
        expect(subject.find('.bulbs-video-root.player')).to.have.length(1);
      });

      it('renders <Revealed>', () => {
        expect(subject).to.contain(
          <Revealed
            video={video}
            actions={actions}
            autoplayNext={undefined} // eslint-disable-line no-undefined
            twitterHandle={twitterHandle}
          />
        );
      });
    });

    context('controller.revealed is false', () => {
      beforeEach(() => {
        props = {
          actions,
          video,
          controller: { revealed: false },
        };
        subject = shallow(<Root {...props}/>);
      });

      it('renders video-root div', () => {
        expect(subject.find('.bulbs-video-root.player')).to.have.length(1);
      });

      it('renders <Cover>', () => {
        expect(subject).to.contain(
          <Cover video={video} actions={actions}/>
        );
      });
    });
  });
});
