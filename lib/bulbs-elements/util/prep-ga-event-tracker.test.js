import prepGaEventTracker from './prep-ga-event-tracker';

describe('prepGaEventTracker', () => {
  let dimensions = {
    'dimension1': 17,
    'dimension2': 'frogger',
    'dimension3': true,
  };
  let gaPrefix = 'reading-list-item-';
  let gaId = '11-ua-googleid';
  let response;

  beforeEach(() => {
    global.ga = sinon.spy();
    sinon.stub(Math, 'floor').returns(6);
    response = prepGaEventTracker(gaPrefix, gaId, dimensions);
    gaPrefix += 6;
  });

  afterEach(() => {
    Math.floor.restore();
  });

  it('creates a prefixed ga tracker', () => {
    expect(global.ga).to.have.been.calledWithMatch(
    'create', gaId, 'auto', { name: gaPrefix }
   );
  });

  it('sets appropriate dimensions', () => {
    expect(global.ga).to.have.been.calledWithMatch(
      `${gaPrefix}.set`, 'dimension1', 17
    );
    expect(global.ga).to.have.been.calledWithMatch(
      `${gaPrefix}.set`, 'dimension2', 'frogger'
    );
    expect(global.ga).to.have.been.calledWithMatch(
      `${gaPrefix}.set`, 'dimension3', true
    );
  });

  it('returns sendEvent function ', () => {
    expect(response).to.be.a('function');
  });
});
