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
      expect(subject.initialState).to.eql({ name: '' });
    });
  });

  describe('handleFetchComplete', () => {
    it('returns the response', () => {
      let state = {};
      let response = {
        clickthrough_url: 'clickthrough_url',
        image_id: 'image_id',
        image_url: 'image_url',
        name: 'name',
      };
      let nextState = subject.actions.handleFetchComplete(state, response);
      expect(nextState).to.eql(response);
    });
  });
});
