import { Store } from 'bulbs-elements/store';
import CampaignField from './fields/campaign';

export default class CampaignDisplayStore extends Store {}

Store.defineFields(CampaignDisplayStore, {
  campaign: CampaignField,
});
