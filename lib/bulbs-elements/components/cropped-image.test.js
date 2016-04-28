import React from 'react';
import { shallow } from 'enzyme';
import CroppedImage from './cropped-image';

describe('<CroppedImage>', () => {
  let subject;
  let props;

  it('renders betty-cropper markup', () => {
    props = {
      crop: 'the-crop',
      imageId: 1,
    };
    subject = shallow(<CroppedImage {...props}/>);
    expect(subject).to.contain(<div/>);
    expect(subject).to.have.prop('data-type', 'image');
    expect(subject).to.have.prop('data-image-id', 1);
    expect(subject).to.have.prop('data-crop', 'the-crop');
  });

  context('componentDidMount', () => {
    it('should should call window.picturefill', () => {
      props = {
        crop: 'super-crop',
        imageId: 1,
      };
      window.picturefill = chai.spy(() => {});
      subject = new CroppedImage(props);
      subject.componentDidMount();
      expect(window.picturefill).to.have.been.called.with(subject.refs.image);
    });
  });

  context('with no crop given', () => {
    beforeEach(() => {
      props = {
        imageId: 1,
      };
      subject = shallow(<CroppedImage {...props}/>);
    });

    it('uses "original" crop', () => {
      expect(subject).to.have.prop('data-crop', 'original');
    });
  });
});
