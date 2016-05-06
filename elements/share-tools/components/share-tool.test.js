import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ShareTool from './share-tool';

class CustomShareTool extends ShareTool {
  render () {
    return <div/>
  }
}

describe('<share-tools> <ShareTool>', () => {
  describe('propTypes', () => {
    let subject = ShareTool.propTypes;

    it('accepts an icon boolean', () => {
      expect(subject.icon).to.eql(PropTypes.bool);
    });

    it('accepts a label boolean', () => {
      expect(subject.label).to.eql(PropTypes.bool);
    });
  });

  context('rendered without a containing <share-tools>', () => {
    it('throws an error', () => {
      let container = document.createElement('div');
      expect(() => {
        ReactDOM.render(<CustomShareTool/>, container);
      }).to.throw('Share Tools MUST be contained within a <share-tools>');
    });
  });

  context('rendered inside <share-tools>', () => {
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
          </share-tools>
        </share-tools>
      `;

      closestShareTools = container.querySelector('#closest');
      subject = ReactDOM.render(<CustomShareTool/>, closestShareTools);
    });

    describe('shareTools', () => {
      it('finds the closest <share-tools> element', () => {
        expect(subject.shareTools).to.eql(closestShareTools);
      });
    });

    describe('shareUrl', () => {
      it('is the url of the containing <share-tools>', () => {
        expect(subject.shareUrl).to.eql('//example.org/share-url');
      });
    });

    describe('shareTitle', () => {
      it('is the title of the containing <share-tools>', () => {
        expect(subject.shareTitle).to.eql('Example Thing');
      });
    });
  });
});

