import { assert } from 'chai';
import util from 'bulbs-elements/util';
import Store from 'bulbs-elements/store';
import VideoRequestField from './video-request';

describe('<bulbs-video> VideoReuestField', () => {
  let { actions } = VideoRequestField;

  beforeEach(() => sinon.stub(util, 'makeRequest'));
  afterEach(() => util.makeRequest.restore());

  it('initialState', () => {
    assert.deepEqual(VideoRequestField.initialState, { requestInFlight: false });
  });

  describe('makeRequest', () => {
    context('url is undefined', () => {
      it('is a no-op', () => {
        actions.fetchVideo({}, undefined); // eslint-disable-line no-undefined
        expect(util.makeRequest).not.to.have.been.called;
      });
    });

    context('url is defined', () => {
      it('makes a request to that url', () => {
        actions.fetchVideo({}, { url: '//example.org' }, new Store({ schema: {} }));
        expect(util.makeRequest).to.have.been.calledWith('//example.org');
      });
    });
  });
});
