import { Store } from 'bulbs-elements/store';

import SampleField from './fields/sample';

export default class SampleElementStore extends Store {}

Store.defineFields(Store, {
  sample: SampleField,
});
