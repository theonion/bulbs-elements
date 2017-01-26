const Map = function (mapElement, legendElement, data) {
  this.mapContainer = mapElement;
  this.legendContainer = legendElement;
  this.statesData = data.votes;
  this.data = data;
  this.setFills();
  this.initMap();
};

Map.prototype.setFills = function () {
  this.fills = {
    defaultFill: '#006B3A',
  };

  // add colors to keyed fills list
  _.each([
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
};

Map.prototype.fillKey = function (i, value) {
  let key = 'result' + i;
  if (value) {
    this.fills[key] = value;
  }
  return this.fills[key];
};

Map.prototype.initMap = function () {
  this.showTooltip = this.showTooltip.bind(this);

  let map = this.map = new Datamap({
    element: this.mapContainer,
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
};

Map.prototype.colorLegend = function () {
  // color legend, assumes legend has been ordered by sequence
  let legendItems = this.legendContainer.querySelectorAll('.legend-color');
  for (let i = 0; i < legendItems.length; i++) {
    legendItems[i].style.backgroundColor = this.fillKey(i + 1);
  }
};

Map.prototype.showTooltip = function (geo, stateResults) {
  let html = '<div class="hoverinfo"><div class="state-name">' +
    geo.properties.name + '</div>';

  if (_.isEmpty(this.data.questions)) {
    html += 'No votes</div>';
  } else {
    html += '<ul class="results">';

    // order by winner then print out html
    _.chain(stateResults.votes)
      .pairs()
      .sortBy(function (question) {
        return -question[1];
      })
      .each((function (question) {
        let votes = question[1];
        let percent = Math.round(votes / stateResults.totalVotes * 100);

        let i = this.data.questions[question[0]].sequence;
        html += '<li class="result">' +
          '<div class="bar" style="background-color:' + this.fillKey(i) + ';width: ' +
          percent + '%;">' + '</div><div class="percent">' +
          percent + '%</div></li>';
      }).bind(this))
      .value();

    html += '</ul>';
  }

  return html;
};

module.exports = Map;
