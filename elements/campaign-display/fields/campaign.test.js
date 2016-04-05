import CampaignField from './campaign';
import CampaignSchema from '../campaign-display-schema';

describe('<campaign-display> CampaignField', () => {
  let subject = CampaignField;
  let store;

  beforeEach(() => {
    store = CampaignSchema;
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
      let state = subject.actions.fetchCampaign({}, 'some url', subject);
      expect(state.requestInFlight).to.equal(true);
    });

    xit('fetches the campaign data from tunic', () => {
      subject.actions.fetchCampaign({}, 'campaign url', subject);
      expect(spy).to.have.been.called.with('campaign url');
    });
  });

  describe('fetchCampaignSuccess', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignSuccess({}, 'some url', subject);
      expect(state.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaignFailure', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignFailure({}, 'some url');
      expect(state.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaignError', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignError({}, 'some url');
      expect(state.requestInFlight).to.equal(false);
    });
  });
});
