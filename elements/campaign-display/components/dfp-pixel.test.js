import React from 'react';
import ReactDOM from 'react-dom';
import DfpPixel from './dfp-pixel';

describe('<campaign-display> <DfpPixel>', () => {
  let reactContainer;
  let renderSubject;

  beforeEach(() => {
    ['warn', 'log', 'error'].forEach(function (method) {
      sinon.stub(window.console, method);
    });
    reactContainer = document.createElement('react-container');
    document.body.appendChild(reactContainer);

    renderSubject = function (props) {
      let componentProps = Object.assign({
        placement: 'junk',
        campaignId: 1,
      }, props);

      return ReactDOM.render(<DfpPixel {...componentProps} />, reactContainer);
    };
  });

  afterEach(() => {
    reactContainer.remove();
    ['warn', 'log', 'error'].forEach(function (method) {
      window.console[method].restore();
    });
  });

  context('on render', () => {

    it('should render an element with the class "dfp"', function () {

      let subject = renderSubject();

      expect(subject.refs.container.className).to.contain('dfp');
    });

    it('should call AdsManager.loadAds', () => {
      let loadAds = sinon.spy();
      window.BULBS_ELEMENTS_ADS_MANAGER = { loadAds };

      let subject = renderSubject();

      delete window.BULBS_ELEMENTS_ADS_MANAGER;

      expect(loadAds).to.have.been.calledWith(subject.refs.container);
    });

    it('should error out if AdsManager is not available', function () {
      renderSubject();

      expect(console.warn).to.have.been.calledWith(
        '<campaign-display> pixel will not trigger since ' +
        '`window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an ' +
        'AdsManager instance.'
      );
    });

    it('should error out of AdsManager.loadAds is not available', function () {
      window.BULBS_ELEMENTS_ADS_MANAGER = {};

      renderSubject();

      expect(console.warn).to.have.been.calledWith(
        '<campaign-display> pixel will not trigger since ' +
        '`window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an ' +
        'AdsManager instance.'
      );
    });
  });

  context('ad unit name', () => {
    it('should always be "campaign-pixel"', () => {
      let subject = renderSubject();
      expect(subject.refs.container.dataset.adUnit).to.equal('campaign-pixel');
    });
  });

  context('targeting parameters', () => {

    it('should include ad unit placement', () => {
      let placement = 'top';
      let subject = renderSubject({ placement });
      let targeting = JSON.parse(subject.refs.container.dataset.targeting);
      expect(targeting.dfp_placement).to.equal(placement);
    });

    it('should require ad unit placement', () => {
      renderSubject({ placement: window.undefined });

      expect(console.error).to.have.been.calledWith(
        'Warning: Failed propType: Required prop `placement` was not specified in `DfpPixel`.'
      );
    });

    it('should include campaign id', () => {
      let id = 1;
      let subject = renderSubject({ campaignId: id });
      let targeting = JSON.parse(subject.refs.container.dataset.targeting);
      expect(targeting.dfp_campaign_id).to.equal(id);
    });

    it('should require campaign id', () => {
      renderSubject({ campaignId: window.undefined });
      expect(console.error).to.have.been.calledWith(
        'Warning: Failed propType: Required prop `campaignId` was not specified in `DfpPixel`.'
      );
    });
  });
});
