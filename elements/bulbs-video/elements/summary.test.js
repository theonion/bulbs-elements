/* eslint-disable no-return-assign */
import './summary';

xdescribe('<bulbs-video-summary>', () => {
  let subject;

  beforeEach(() => {
    subject = document.createElement('bulbs-video-summary');
    subject.setAttribute('src', '//example.com/video.json');
    sinon.spy(subject, 'fetchVideo');
  });

  describe('componentDidUpdate', () => {
    context('src does not change', () => {
      it('does not invoke fetchVideo action', () => {
        subject.setAttribute('src', '//example.com/video.json');
        expect(subject.fetchVideo).not.to.have.been.called;
      });
    });

    context('src changes', () => {
      it('invokes fetchVideo action', () => {
        subject.setAttribute('src', '//example.com/video-2.json');
        expect(subject.fetchVideo).to.have.been.called;
      });
    });
  });

  describe('render', () => {
    context('no video data', () => {
      it('renders a blank div', () => {
        subject.render();
        expect(subject.innerHTML).to.eql('<div></div>');
      });
    });
  });

  //describe('<VideoSummaryView>', () => {
  //  context('no video prop', () => {
  //    beforeEach(() => {
  //      subject = shallow(<VideoSummaryView/>);
  //    });
  //    it('renders blank div', () => {
  //      expect(subject.equals(<div/>)).to.be.true;
  //    });
  //  });

  //  context('with video prop', () => {
  //    beforeEach(() => {
  //      subject = shallow(<VideoSummaryView video={video}/>);
  //    });

  //    it('renders a video-summary element', () => {
  //      expect(subject).to.have.descendants('.bulbs-video-summary');
  //    });

  //    it('renders a video-poster element', () => {
  //      expect(subject).to.have.descendants('.bulbs-video-poster');
  //    });

  //    it('renders a poster image', () => {
  //      expect(subject.find('.bulbs-video-poster')).to.contain(
  //        <img src={video.poster_url}/>
  //      );
  //    });

  //    it('renders a <VideoPlayButton>', () => {
  //      expect(subject.find('.bulbs-video-poster')).to.contain(
  //        <VideoPlayButton/>
  //      );
  //    });

  //    it('does not render a now playing indicator', () => {
  //      expect(subject).not.to.have.descendants('.bulbs-video-summary-playing');
  //    });

  //    it('renders a summary title', () => {
  //      expect(subject).to.contain(
  //        <bulbs-ellipsize class='bulbs-video-summary-title' line-count='3'>
  //          {video.title}
  //        </bulbs-ellipsize>
  //      );
  //    });
  //  });

  //  context('with nowPlaying prop', () => {
  //    beforeEach(() => {
  //      subject = shallow(<VideoSummaryView video={video} nowPlaying={true}/>);
  //    });

  //    it('renders a now playing indicator', () => {
  //      expect(subject.find('.bulbs-video-poster')).to.contain(
  //        <div className='bulbs-video-summary-playing'>
  //          Now Playing
  //        </div>
  //      );
  //    });
  //  });
  //});
});
