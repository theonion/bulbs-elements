import CampaignField from './campaign-field';
import fetchMock from 'fetch-mock';

describe('<campaign-display> CampaignField', () => {
  let subject = CampaignField;
  let testUrl;

  beforeEach(() => {
    testUrl = 'http://example.com';
    fetchMock.mock(testUrl, {});
  });

  describe('initialState', () => {
    it('is an object', () => {
      expect(subject.initialState).to.eql({});
    });
  });

  describe('handleFetchComplete', () => {
    it('returns the response', () => {
      let state = subject.actions.handleFetchComplete({}, { data: 'test' });
      expect(state.data).to.equal('test');
    });
  });
});
