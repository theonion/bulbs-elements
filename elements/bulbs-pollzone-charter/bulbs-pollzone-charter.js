import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';
import * as d3 from 'd3';

class BulbsPollzoneCharter extends BulbsHTMLElement {
  attachedCallback (selector, data) {
    this.data = data.values;
    this.totalAnswers = data.totalAnswers;
    this.selector = selector;
    this.calculatePercentages(data.values);
    this.initChart();
  }

  calculatePercentages (values) {
    let _this = this;

    values.forEach(function (obj) {
      obj.percent = Math.round(obj.value / _this.totalAnswers * 100);
    });
  }

  initChart () {
    let width = 500;
    let height = 40 * this.data.length;
    let barHeight = 40;

    let x = d3.scale.linear()
      .domain([0, 100]) // min/max values of the bar
      .range([0, width - 40]); // in pixels, the range of bar lengths
     // let y = d3.scale.ordinal()
     //  .domain(percents) // number of bars
     //  .rangeBands([0, height], .5, .5); // width of bars and spacing between them

    let chart = d3.select(this.selector).append('svg')
      .attr('class', 'chart')
      .attr('width', width)
      .attr('height', height);

    let bar = chart.selectAll('g')
      .data(this.data)
      .enter().append('g')
      .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')'; });

    bar.append('rect')
      .attr('width', function (question) {
        return x(question.percent);
      })
      .attr('height', barHeight / 2)
      .attr('class', function (question, index) {
        return 'result' + (index + 1);
      });

    bar.append('text')
      .attr('x', function (question) { return x(question.percent) + 3; })
      .attr('class', 'values')
      .attr('y', barHeight / 2)
      .text(function (question) { return question.percent + '%'; });

    bar.append('text')
      .attr('x', 2)
      .attr('class', 'answers')
      .attr('dy', -4)
      .text(function (question) { return question.answer; });
  }
}

registerElement('bulbs-pollzone-charter', BulbsPollzoneCharter);
