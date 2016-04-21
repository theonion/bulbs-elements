import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import CroppedImage from './cropped-image';

describe('<CroppedImage>', () => {
  let subject;
  let props;

  function shallow (element) {
    let shallowRenderer = createRenderer();
    shallowRenderer.render(element);
    return shallowRenderer.getRenderOutput();
  }

  it('renders betty-cropper markup', () => {
    props = {
      crop: 'the-crop',
      imageId: 1,
    };
    subject = shallow(<CroppedImage {...props}/>);
    expect(subject.type).to.equal('div');
    expect(subject.props['data-type']).to.eql('image');
    expect(subject.props['data-image-id']).to.eql(1);
    expect(subject.props['data-crop']).to.eql('the-crop');
    expect(subject.props.children.type).to.equal('div');
    expect(subject.props.children.props).to.eql({});
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
      expect(subject.props['data-crop']).to.equal('original');
    });
  });
});
