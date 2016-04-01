import { Store } from 'bulbs-elements/store';

export default class CampaignDisplayStore extends Store {}

Store.defineFields(Store, {
  campaign: CampaignDisplayStore,
});
