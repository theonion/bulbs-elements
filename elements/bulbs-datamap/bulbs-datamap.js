/* global Datamap */
require('!imports?this=>window!d3/build/d3.js');
require('expose?topojson!topojson/topojson.js');
require('expose?Datamap!datamaps/dist/datamaps.usa.js');

import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-datamap.scss';

class BulbsDatamap extends BulbsHTMLElement {
  createdCallback () {
    this.innerHTML = '<div class="bulbs-datamap"></div>';
    let mapContainer = this.firstChild;
    let that = this;

    this.map = new Datamap({
      element: mapContainer,
      scope: 'usa',
      responsive: true,
      fills: {
        defaultFill: '',
      },
      geographyConfig: {
        highlightOnHover: false,
      },
    });

    window.addEventListener('resize', this.resizeMap.bind(this));

    window.d3.select(mapContainer).selectAll('svg .datamaps-subunit').on('click', function (stateObj) {
      that.stateClicked(this, stateObj, mapContainer);
    });
  }

  stateClicked (path, stateObj, mapContainer) {
    window.d3.select(mapContainer)
      .selectAll('svg .datamaps-subunit')
      .classed('selected', false);
    window.d3.select(path).classed('selected', true);

    let event = new CustomEvent('bulbs-datamap:selected', { 'detail': stateObj });
    mapContainer.dispatchEvent(event);
  }

  resizeMap () {
    this.map.resize();
  }
}

registerElement('bulbs-datamap', BulbsDatamap);

export default BulbsDatamap;
