import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';

import ShareButton from './share-button';

describe('<share-tools> <ShareButton>', () => {
  describe('propTypes', () => {
    let subject = ShareButton.propTypes;

    it('requires className', () => {
      expect(subject.className).to.eql(PropTypes.string.isRequired);
    });

    it('requires dataTrackLabel', () => {
      expect(subject.className).to.eql(PropTypes.string.isRequired);
    });

    it('accepts href', () => {
      expect(subject.href).to.eql(PropTypes.string);
    });

    it('accepts icon', () => {
      expect(subject.icon).to.eql(PropTypes.bool);
    });

    it('accepts iconClassName', () => {
      expect(subject.iconClassName).to.eql(PropTypes.string);
    });

    it('accepts label', () => {
      expect(subject.label).to.eql(PropTypes.bool);
    });

    it('accepts labelText', () => {
      expect(subject.labelText).to.eql(PropTypes.string);
    });

    it('accepts onClick', () => {
      expect(subject.onClick).to.eql(PropTypes.func);
    });
  });

  describe('render', () => {
    let subject;
    let props;
    function onClick() {}

    let baseProps = {
      href: '/path',
      className: 'share-class-name',
      dataTrackLabel: 'tracking-label',
      onClick,
    };

    context('with icon', () => {
      beforeEach(() => {
        props = Object.assign({}, baseProps, {
          icon: true,
          iconClassName: 'icon-class-name',
        });
        subject = shallow(<ShareButton {...props}/>);
      });

      it('renders with an icon', () => {
        expect(subject.equals(
          <a
            className='share-class-name'
            href='/path'
            data-track-label='tracking-label'
            onClick={onClick}
          >
            <i className='share-button-icon icon-class-name'/>
          </a>
        )).to.be.true;
      });
    });

    context('with label', () => {
      beforeEach(() => {
        props = Object.assign({}, baseProps, {
          label: true,
          labelText: 'Label Text',
        });
        subject = shallow(<ShareButton {...props}/>);
      });

      it('renders with a label', () => {
        expect(subject.equals(
          <a
            className='share-class-name'
            href='/path'
            data-track-label='tracking-label'
            onClick={onClick}
          >
            <span
              className='share-button-label'
            >
              Label Text
            </span>
          </a>
        )).to.be.true;
      });
    });

    context('with icon and label', () => {
      beforeEach(() => {
        props = Object.assign({}, baseProps, {
          label: true,
          labelText: 'Label Text',
          icon: true,
          iconClassName: 'icon-class-name',
        });
        subject = shallow(<ShareButton {...props}/>);
      });

      it('renders with an icon and a label', () => {
        expect(subject.equals(
          <a
            className='share-class-name'
            href='/path'
            data-track-label='tracking-label'
            onClick={onClick}
          >
            <i className='share-button-icon icon-class-name'/>
            <span
              className='share-button-label'
            >
              Label Text
            </span>
          </a>
        )).to.be.true;
      });
    });
  });
});
