import { Store } from 'bulbs-elements/store';

import VideoField from './fields/video';
import SourcesField from './fields/sources';
import ControllerField from './fields/controller';

export default class VideoStore extends Store { }

Store.defineFields(VideoStore, {
  video: VideoField,
  sources: SourcesField,
	controller: ControllerField,
});
