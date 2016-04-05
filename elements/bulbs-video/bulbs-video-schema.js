import VideoField from './fields/video';
import SourcesField from './fields/sources';
import ControllerField from './fields/controller';

const VideoSchema = {
  video: VideoField,
  sources: SourcesField,
  controller: ControllerField,
};

export default VideoSchema;
