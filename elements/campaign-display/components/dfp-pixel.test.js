import React from 'react';
import ReactDOM from 'react-dom';
import DfpPixel from './dfp-pixel';

describe('<campaign-display> <DfpPixel>', () => {
  let reactContainer;
  let renderSubject;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    ['warn', 'log', 'error'].forEach(function (method) {
      sinon.stub(window.console, method);
    });
    reactContainer = document.createElement('react-container');
    document.body.appendChild(reactContainer);

    renderSubject = function (props) {
      let componentProps = {
        placement: 'test',
        campaignId: 1,
      };
      // Destructive merge of given properties
      // (otherwise defaults cannot be removed via undefined)
      for (let key in props) {
        componentProps[key] = props[key];
      }

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
    beforeEach(() => {
      window.BULBS_ELEMENTS_ADS_MANAGER = {
        loadAds: sandbox.spy(),
      };
    });

    it('should include ad unit placement', () => {
      let placement = 'top';
      let subject = renderSubject({ placement });
      let targeting = JSON.parse(subject.refs.container.dataset.targeting);
      expect(targeting.dfp_placement).to.equal(placement);
    });

    it('should require ad unit placement', () => {
      window.BULBS_ELEMENTS_ADS_MANAGER = undefined; // eslint-disable-line no-undefined
      renderSubject({ placement: window.undefined });
      let expectedMessage = '<campaign-display> pixel will not trigger since `window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an AdsManager instance.';
      expect(console.warn).to.have.been.calledWith(expectedMessage);
    });

    it('should include campaign id', () => {
      let id = 1;
      let subject = renderSubject({ campaignId: id });
      let targeting = JSON.parse(subject.refs.container.dataset.targeting);
      expect(targeting.dfp_campaign_id).to.equal(id);
    });

    it('should require campaign id', () => {
      renderSubject({ campaignId: undefined }); // eslint-disable-line no-undefined
      let errorMessagePattern = /prop `campaignId` is marked as required/;
      expect(console.error).to.have.been.calledWithMatch(errorMessagePattern);
    });
  });
});
