import { assert } from 'chai';
import './bulbs-datamap';

describe('<bulbs-datamap>', function () {
  let element;

  beforeEach(function (done) {
    element = document.createElement('bulbs-datamap');
    setImmediate(done);
  });

  it('renders an <bulbs-datamap>', function () {
    assert.equal(element.tagName.toLowerCase(), 'bulbs-datamap');
  });

  it('renders a div inside', function () {
    expect(element.firstChild.matches('div.bulbs-datamap')).to.be.true;
  });

  it('instantiates a datamap object', function () {
    expect(element.map.options.element).to.eql(element.firstChild);
  });

  describe('#resizeMap', () => {
    beforeEach(function () {
      sinon.stub(element.map, 'resize');
      element.resizeMap();
    });

    it('resizes the map', function () {
      expect(element.map.resize.called).to.be.true;
    });
  });

  describe('#stateClicked', function () {
    let path;
    let path2;
    let stateObj;

    beforeEach(() => {
      path = $(element).find('svg path')[0];
      path2 = $(element).find('svg path')[1];
      stateObj = {
        id: 'AL',
        properties: {
          name: 'Alabama',
        },
        type: 'Feature',
      };

      window.d3.select(path2).classed('selected', true);
    });

    it('sets selected class to true for selected path', function () {
      element.stateClicked(path, stateObj, element);
      expect(window.d3.select(path2).classed('selected')).to.be.false;
      expect(window.d3.select(path2).classed('selected')).to.be.false;
    });

    it('dispatches a custom event with the state info', (done) => {
      element.addEventListener('bulbs-datamap:selected', function (event) {
        expect(event.detail.id).to.equal('AL');
        done();
      });
      element.stateClicked(path, stateObj, element);
    });
  });
});
