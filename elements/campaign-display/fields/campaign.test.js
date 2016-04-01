import { assert } from 'chai';
import CampaignField from './campaign';

describe('<campaign-display> CampaignField', function () {
  let { actions } = CampaignField;

  it('initialState', function () {
    assert.deepEqual(CampaignField.initialState, {});
  });

  describe('initialAction', function () {
    it('passes state through untouched', function () {
      // write actual tests
      let nextState = actions.initialAction.invoke({}, {});
      assert.deepEqual(nextState, {});
    });
  });
});
