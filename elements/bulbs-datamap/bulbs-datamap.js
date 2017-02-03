/* global Datamap */
import * as d3 from 'd3';
import topojson from 'topojson'
import Datamap from 'datamaps'

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

    d3.select(mapContainer).selectAll('svg .datamaps-subunit').on('click', function (stateObj) {
      that.stateClicked(this, stateObj, mapContainer);
    });
  }

  stateClicked (path, stateObj, mapContainer) {
    d3.select(mapContainer)
      .selectAll('svg .datamaps-subunit')
      .classed('selected', false);
    d3.select(path).classed('selected', true);

    let event = new CustomEvent('bulbs-datamap:selected', { 'detail': stateObj });
    mapContainer.dispatchEvent(event);
  }

  resizeMap () {
    this.map.resize();
  }
}

registerElement('bulbs-datamap', BulbsDatamap);

export default BulbsDatamap;
