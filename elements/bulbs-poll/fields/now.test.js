import { assert } from 'chai';
import NowField from './now';

describe('<bulbs-poll> NowField', function() {

  it('initialState', function() {
    assert.isTrue(NowField.initialState instanceof Date);
  });

});
