import './bulbs-header-masthead';
import { InViewMonitor } from 'bulbs-elements/util';

describe('<bulbs-header>', () => {

  describe('<bulbs-header-masthead>', () => {
    let masthead;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      masthead = document.createElement('bulbs-header-masthead');
      sandbox.spy(InViewMonitor, 'add');
      sandbox.spy(InViewMonitor, 'remove');
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('attachedCallback', () => {
      it('registers with InViewMonitor', () => {
        masthead.attachedCallback();
        expect(InViewMonitor.add).to.have.been.calledWith(masthead).once;
      });
    });

    describe('detachedCallback', () => {
      it('removes from InViewMonitor', () => {
        masthead.detachedCallback();
        expect(InViewMonitor.remove).to.have.been.calledWith(masthead).once;
      });
    });

  });

});