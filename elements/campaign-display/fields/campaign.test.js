import CampaignField from './campaign';
import CampaignStore from '../campaign-display-store';

describe('<campaign-display> CampaignField', () => {
  let subject = CampaignField;
  let store;

  beforeEach(() => {
    store = new CampaignStore();
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
      let state = subject.actions.fetchCampaign.invoke({}, 'some url', store);
      expect(state.requestInFlight).to.equal(true);
    });

    it('fetches the campaign data from tunic', () => {
      let spy = chai.spy.on(subject.actions.fetchCampaign, 'request');
      subject.actions.fetchCampaign.invoke({}, 'campaign url', store);
      expect(spy).to.have.been.called.with('campaign url', {
        success: store.actions.fetchCampaignSuccess,
        failure: store.actions.fetchCampaignFailure,
        error: store.actions.fetchCampaignError,
      });
    });
  });

  describe('fetchCampaignSuccess', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignSuccess.invoke({}, 'some url', store);
      expect(state.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaignFailure', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignFailure.invoke({}, 'some url', store);
      expect(state.requestInFlight).to.equal(false);
    });
  });

  describe('fetchCampaignError', () => {
    it('sets requestInFlight to false', () => {
      let state = subject.actions.fetchCampaignError.invoke({}, 'some url', store);
      expect(state.requestInFlight).to.equal(false);
    });
  });
});
