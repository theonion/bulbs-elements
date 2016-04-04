import { Store } from 'bulbs-elements/store';

export default class CampaignDisplayStore extends Store {}

import CampaignField from './fields/campaign';

Store.defineFields(Store, {
  campaign: CampaignField,
});
