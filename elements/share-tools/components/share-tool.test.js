import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ShareTool from './share-tool';

class CustomShareTool extends ShareTool {
  render () {
    return <div/>;
  }
}

describe('<share-tools> <ShareTool>', () => {
  describe('propTypes', () => {
    let subject = ShareTool.propTypes;

    it('accepts an icon string', () => {
      expect(subject.icon).to.eql(PropTypes.string);
    });

    it('accepts a label string', () => {
      expect(subject.label).to.eql(PropTypes.string);
    });
  });

  context('rendered inside share-tools', () => {
    let container;
    let subject;
    let closestShareTools;

    beforeEach(() => {
      container = document.createElement('div');

      container.innerHTML = `
        <share-tools>
          <share-tools
            id='closest'
            share-url='//example.org/share-url'
            share-title='Example Thing'
          >
            <div id='render-target'/>
          </share-tools>
        </share-tools>
      `;

      closestShareTools = container.querySelector('#closest');
      subject = ReactDOM.render(
        <CustomShareTool/>,
        container.querySelector('#render-target')
      );
    });

    describe('shareTools', () => {
      it('finds the closest share-tools element', () => {
        expect(subject.shareTools).to.eql(closestShareTools);
      });
    });

    describe('shareUrl', () => {
      it('is the url of the containing share-tools', () => {
        expect(subject.shareUrl).to.eql('//example.org/share-url');
      });

      it('defaults to the current url', () => {
        closestShareTools.removeAttribute('share-url');
        expect(subject.shareUrl).to.eql(window.location.toString());
      });
    });

    describe('shareTitle', () => {
      it('is the title of the containing share-tools', () => {
        expect(subject.shareTitle).to.eql('Example Thing');
      });

      it('reads from  meta tag if it exists', () => {
        container.querySelector('[share-title]').removeAttribute('share-title');
        let metaTag = document.createElement('meta');
        metaTag.setAttribute('property', 'og:title');
        metaTag.content = 'Meta Title';
        document.head.appendChild(metaTag);
        expect(subject.shareTitle).to.eql('Meta Title');
        metaTag.remove();
      });

      it('prefers reading from parent <share-tools>', () => {
        let metaTag = document.createElement('meta');
        metaTag.property = 'og:title';
        metaTag.content = 'Meta Title';
        document.head.appendChild(metaTag);
        expect(subject.shareTitle).to.eql('Example Thing');
        metaTag.remove();
      });
    });

    describe('hasIcon', () => {
      context('icon attribute is set', () => {
        it('is true', () => {
          expect(new ShareTool({ icon: '' }).hasIcon()).to.be.true;
        });
      });

      context('icon attribute not set', () => {
        it('is false', () => {
          expect(new ShareTool({}).hasIcon()).to.be.false;
        });
      });
    });

    describe('hasLabel', () => {
      context('label attribute is set', () => {
        it('is true', () => {
          expect(new ShareTool({ label: '' }).hasLabel()).to.be.true;
        });
      });

      context('label attribute not set', () => {
        it('is false', () => {
          expect(new ShareTool({}).hasLabel()).to.be.false;
        });
      });
    });
  });
});

