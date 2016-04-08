import CampaignField from './campaign';
import fetchMock from 'fetch-mock';

describe('<campaign-display> CampaignField', () => {
  let subject = CampaignField;
  let testUrl;

  beforeEach(() => {
    testUrl = 'http://example.com';
    fetchMock.mock(testUrl, {});
  });

  describe('initialState', () => {
    it('sets data to an empty array', () => {
      expect(subject.initialState.data).to.eql([]);
    });

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
      let state = subject.actions.fetchCampaignSuccess({}, testUrl, subject);
      expect(state.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaignFailure', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignFailure({}, testUrl);
      expect(state.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaignError', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignError({}, testUrl);
      expect(state.requestInFlight).to.equal(false);
    });
  });
});
