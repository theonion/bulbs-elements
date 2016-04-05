import { assert } from 'chai';
import CampaignField from './campaign';

describe('<campaign-display> CampaignField', function () {
  let { actions } = CampaignField;

  xit('initialState', function () {
    assert.deepEqual(CampaignField.initialState, {});
  });

  describe('initialAction', function () {
    xit('passes state through untouched', function () {
      let nextState = actions.initialAction.invoke({}, {});
      assert.deepEqual(nextState, {});
    });
  });
});
