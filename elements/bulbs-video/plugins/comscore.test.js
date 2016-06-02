import Comscore from './comscore';

describe('Comscore', () => {
  let player;

  beforeEach(() => {
    player = {
      on: sinon.spy(),
    };
  });

  describe('adStarted', () => {
    let comscore;

    beforeEach(() => {
      comscore = Comscore.init(player, '12345');
      sinon.stub(comscore.streamingTag, 'playVideoAdvertisement');
      comscore.adStarted();
    });

    it('calls "playVideoAdvertisement" in streaming tag lib', function() {
      expect(comscore.streamingTag.playVideoAdvertisement.called).to.be.true;
    });
  });

  describe('adEnded', () => {
    let comscore;

    beforeEach(() => {
      comscore = Comscore.init(player, '12345');
      sinon.stub(comscore.streamingTag, 'stop');
      comscore.adEnded();
    });

    it('calls "stop" in streaming tag lib', function() {
      expect(comscore.streamingTag.stop.called).to.be.true;
    });
  });

  describe('contentPlayed', () => {
    let comscore;

    beforeEach(() => {
      comscore = Comscore.init(player, '12345');
      sinon.stub(comscore.streamingTag, 'playVideoContentPart');
      comscore.contentPlayed();
    });

    it('calls "playVideoContentPart" in streaming tag lib', function() {
      expect(comscore.streamingTag.playVideoContentPart.called).to.be.true;
    });
  });

  describe('contentPaused', () => {
    let comscore;

    beforeEach(() => {
      comscore = Comscore.init(player, '12345');
      sinon.stub(comscore.streamingTag, 'stop');
      comscore.contentPaused();
    });

    it('calls "stop" in streaming tag lib', function() {
      expect(comscore.streamingTag.stop.called).to.be.true;
    });
  });

  describe('contentEnded', () => {
    let comscore;

    beforeEach(() => {
      comscore = Comscore.init(player, '12345');
      sinon.stub(comscore.streamingTag, 'stop');
      comscore.contentEnded();
    });

    it('calls "stop" in streaming tag lib', function() {
      expect(comscore.streamingTag.stop.called).to.be.true;
    });
  });
});
