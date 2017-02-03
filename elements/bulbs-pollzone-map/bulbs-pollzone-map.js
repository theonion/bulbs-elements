import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

import _ from 'lodash';
import * as d3 from 'd3';
import Datamap from 'datamaps';

import './bulbs-pollzone-map.scss';

class BulbsPollzoneMap extends BulbsHTMLElement {
  attachedCallback () {
    let map = this.querySelector('.map');
    let mapData = JSON.parse(map.getAttribute('data-map-data'));

    this.mapElement = map;
    this.legendContainer = this.querySelector('.legend');
    this.statesData = mapData.votes;
    this.questionsData = mapData.questions;

    this.setFills();
    this.initMap();
  }

  setFills () {
    this.fills = {
      defaultFill: '#006B3A',
    };

    // add colors to keyed fills list
    _.forEach([
      '#37273a',
      '#942026',
      '#46778a',
      '#cfa05b',
      '#375845',
      '#314577',
      '#a05a1e',
      '#654c75',
      '#738e54',
      '#686868',
    ], (function (color, i) {
      this.fillKey(i + 1, color);
    }).bind(this));
  }

  fillKey (i, value) {
    let key = 'result' + i;
    if (value) {
      this.fills[key] = value;
    }
    return this.fills[key];
  }

  initMap () {
    this.showTooltip = this.showTooltip.bind(this);

    const map = this.map = new Datamap({
      element: this.mapElement,
      scope: 'usa',
      fills: this.fills,
      data: this.statesData,
      geographyConfig: {
        popupTemplate: this.showTooltip,
      },
      responsive: true,
    });

    this.colorLegend();

    // d3 requires namespaced events
    d3.select(window).on('resize.' + map.options.element.id, function () {
      map.resize();
    });
  }

  colorLegend () {
    // color legend, assumes legend has been ordered by sequence
    let legendItems = this.querySelectorAll('.legend-color');
    console.log(legendItems);
    for (let i = 0; i < legendItems.length; i++) {
      legendItems[i].style.backgroundColor = this.fillKey(i + 1);
    }
  }

  showTooltip (geo, stateResults) {
    let html = `<div class="hoverinfo"><div class="state-name">
        ${geo.properties.name}
      </div>`;

    if (_.isEmpty(this.questionsData)) {
      html += 'No votes';
    }
    else {
      html += '<ul class="results">';

      // order by winner then print out html
      _.chain(stateResults.votes)
        .toPairs()
        .sortBy(function (question) {
          return -question[1];
        })
        .each((function (question) {
          let votes = question[1];
          let percent = Math.round(votes / stateResults.totalVotes * 100);

          let i = this.questionsData[question[0]].sequence;
          html += `<li class="result">
            <div class="bar" style="background-color: ${this.fillKey(i)}; width: ${percent}%;"></div>
            <div class="percent">${percent}</div>
          </li>`;
        }).bind(this))
        .value();

      html += '</ul>';
    }

    return html + '</div>';
  }
}

registerElement('bulbs-pollzone-map', BulbsPollzoneMap);
