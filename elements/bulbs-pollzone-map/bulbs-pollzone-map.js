import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

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
    [
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
    ].forEach(function (color, i) {
      this.fillKey(i + 1, color);
    }, this);
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
    for (let i = 0; i < legendItems.length; i++) {
      legendItems[i].style.backgroundColor = this.fillKey(i + 1);
    }
  }

  showTooltip (geo, stateResults) {
    let { totalVotes, votes } = stateResults;
    let html = `<div class='hoverinfo'><div class='state-name'>
        ${geo.properties.name}
      </div>`;

    if (typeof this.questionsData === 'undefined' || Object.keys(votes).length < 1) {
      html += 'No votes';
    }
    else {
      html += `<ul class='results'>`;

      // order by winner then print out html
      html += Object.keys(votes).map(function (key) {
        return { 'id': key, 'numVotes': votes[key] };
      })
      .sort(function (q1, q2) {
        return q1.numVotes < q2.numVotes;
      })
      .map(function (question) {
        let { numVotes } = question;
        let percent = Math.round(numVotes / totalVotes * 100);

        return `<li class='result'>
          <div class='bar' style='background-color: ${this.fillKey(question.id)}; width: ${percent}%;'></div>
          <div class='percent'>${percent}</div>
        </li>`;
      }, this).join('');

      html += `</ul>`;
    }

    return html + `</div>`;
  }
}

registerElement('bulbs-pollzone-map', BulbsPollzoneMap);
