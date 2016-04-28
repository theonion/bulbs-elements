import { assert } from 'chai';
import ControllerField from './controller';

describe('<bulbs-video> ControllerField', () => {
  let { actions } = ControllerField;

  it('initialState', () => {
    assert.deepEqual(ControllerField.initialState, {
      revealed: false,
    });
  });

  describe('action: revealPlayer', () => {
    it('reveals player', () => {
      expect(
        actions.revealPlayer({ revealed: false }).revealed
      ).to.be.true;
    });
  });

  describe('action: resetController', () => {
    it('resets controller', () => {
      expect(
        actions.resetController({ revealed: true }).revealed
      ).to.be.false;
    });
  });
});
