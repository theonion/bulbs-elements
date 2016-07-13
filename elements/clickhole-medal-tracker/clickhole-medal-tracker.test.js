import React from 'react';
import ClickholeMedalTracker from './clickhole-medal-tracker';
import { shallow } from 'enzyme';
import { clone } from 'lodash';
import fetchMock from 'fetch-mock';

describe('<clickhole-medal-tracker>', () => {
  let subject;
  let props;
  let src;
  let contenders;
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    src = 'http://example.com';
    contenders = [
      {
        'name': 'United States',
        'flagImage': 'http://localhost:8080/fixtures/clickhole-medal-tracker/flag.png',
        'abbreviation': 'USA',
        'jokeEntry': false,
      },
      {
        'name': 'Russia',
        'flagImage': 'http://localhost:8080/fixtures/clickhole-medal-tracker/flag.png',
        'abbreviation': 'RUS',
        'jokeEntry': false,
      },
      {
        'name': 'Germany',
        'flagImage': 'http://localhost:8080/fixtures/clickhole-medal-tracker/flag.png',
        'abbreviation': 'GER',
        'jokeEntry': false,
      },
      {
        'name': 'Great Britain',
        'flagImage': 'http://localhost:8080/fixtures/clickhole-medal-tracker/flag.png',
        'abbreviation': 'GBK',
        'jokeEntry': false,
      },
      {
        'name': 'Frace',
        'flagImage': 'http://localhost:8080/fixtures/clickhole-medal-tracker/flag.png',
        'abbreviation': 'FRA',
        'jokeEntry': false,
      },
      {
        'name': 'Italy',
        'flagImage': 'http://localhost:8080/fixtures/clickhole-medal-tracker/flag.png',
        'abbreviation': 'ITA',
        'jokeEntry': false,
      },
      {
        'name': 'Australia',
        'flagImage': 'http://localhost:8080/fixtures/clickhole-medal-tracker/flag.png',
        'abbreviation': 'AUS',
        'jokeEntry': false,
      },
    ];
    props = { src };
    fetchMock.mock(src, contenders);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('requires a src', function () {
    expect(() => {
      new ClickholeMedalTracker({}); // eslint-disable-line
    }).to.throw('clickhole-medal-tracker component requires a src');
  });

  it('fetches the medal list', () => {
    subject = shallow(<ClickholeMedalTracker {...props} />);
    expect(fetchMock.called(src)).to.equal(true);
  });

  describe('handleRequestSuccess', () => {
    it('sets the contenders on the state', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      subject.handleRequestSuccess(contenders);
      expect(subject.state.contenders.length).to.equal(contenders.length);
    });

    it('creates random data for the contenders', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      subject.handleRequestSuccess(contenders);
      subject.state.contenders.forEach((contender) => {
        expect(contender.goldTotal).to.be.a('number');
        expect(contender.goldTotal).to.not.equal(0);

        expect(contender.silverTotal).to.be.a('number');
        expect(contender.silverTotal).to.not.equal(0);

        expect(contender.bronzeTotal).to.be.a('number');
        expect(contender.bronzeTotal).to.not.equal(0);

        expect(contender.allTotal).to.be.a('number');
        expect(contender.allTotal).to.not.equal(0);
      });
    });

    it('schedules the contender updates', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      sandbox.stub(subject, 'scheduleContenderUpdates');
      subject.handleRequestSuccess(contenders);

      expect(subject.scheduleContenderUpdates).to.have.been.called;
    });
  });

  describe('selectNewContender', () => {
    it('returns nothing when there is no contenders', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      let newContender = subject.selectNewContender();

      expect(newContender).to.be.undefined;
    });

    it('returns a contender not in the top 5', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      subject.setState({ contenders });
      let top5 = subject.state.contenders.slice(0, 5);
      let newContender = subject.selectNewContender();

      expect(top5).not.to.contain(newContender);
    });
  });

  describe('selectRandomLeader', () => {
    it('returns nothing when there is no contenders', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      let randomLeader = subject.selectRandomLeader();

      expect(randomLeader).to.be.undefined;
    });

    it('returns a random leader in the top 5', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      subject.setState({ contenders });
      let top5 = subject.state.contenders.slice(0, 5);
      let randomLeader = subject.selectRandomLeader();

      expect(top5).to.contain(randomLeader);
    });
  });

  describe('swapContenders', () => {
    it('swaps the stats of 2 contenders', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      subject.randomizeContenderStats(contenders);
      subject.swapContenders(subject.state.contenders[0], subject.state.contenders[1]);

      expect(subject.state.contenders[0].allTotal).to.be.lessThan(subject.state.contenders[1].allTotal);
      expect(subject.state.contenders[1].allTotal).to.be.greaterThan(subject.state.contenders[0].allTotal);
    });
  });

  describe('createStatsFromTotal', () => {
    it('creates stats from a total number', () => {
      subject = shallow(<ClickholeMedalTracker {...props} />).instance();
      let stats = subject.createStatsFromTotal(100);
      expect(stats.goldTotal).to.be.a('number');
      expect(stats.silverTotal).to.be.a('number');
      expect(stats.bronzeTotal).to.be.a('number');
      expect(stats.allTotal).to.equal(stats.goldTotal + stats.silverTotal + stats.bronzeTotal);
    });
  });
});
