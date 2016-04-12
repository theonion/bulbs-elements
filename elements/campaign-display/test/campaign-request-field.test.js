import CampaignRequestField from '../fields/campaign-request-field';
import fetchMock from 'fetch-mock';

describe('<campaign-display> CampaignRequestField', () => {
  let subject = CampaignRequestField;
  let testUrl;
  let mockStore;

  beforeEach(() => {
    testUrl = 'http://example.com';
    mockStore = {
      actions: { handleFetchComplete: chai.spy() },
    };
    fetchMock.mock(testUrl, {});
  });

  describe('initialState', () => {
    it('sets requestInFlight to false', () => {
      expect(subject.initialState.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaign', () => {
    it('sets requestInFlight to true', () => {
      let state = subject.actions.fetchCampaign({}, testUrl, subject);
      expect(state.requestInFlight).to.equal(true);
    });

    it('fetches the campaign data from tunic', () => {
      subject.actions.fetchCampaign({}, testUrl, subject);
      expect(fetchMock.called(testUrl)).to.equal(true);
    });

    it('includes the credentials when fetching the data', () => {
      subject.actions.fetchCampaign({}, testUrl, subject);
      expect(fetchMock.lastOptions().credentials).to.equal('include');
    });
  });

  describe('fetchCampaignSuccess', () => {
    it('sets requestInFlight to false', () => {
      let state = {};
      subject.actions.fetchCampaignSuccess(state, testUrl, mockStore);
      expect(state.requestInFlight).to.equal(false);
    });

    it('triggers the handleFetchComplete action', () => {
      subject.actions.fetchCampaignSuccess({}, testUrl, mockStore);
      expect(mockStore.actions.handleFetchComplete).to.have.been.called();
    });
  });

  describe('fetchCampaignFailure', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignFailure({}, testUrl, mockStore);
      expect(state.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaignError', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignError({}, testUrl, mockStore);
      expect(state.requestInFlight).to.equal(false);
    });
  });
});
