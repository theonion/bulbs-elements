import { uniq, times } from 'lodash';
import {
  boostNewContender,
  createRandomStats,
  getLosers,
  getRandomContender,
  getRandomContenderWithout,
  randomizeContenders,
  shuffleContenders,
  sortByTotal,
  swapRandomLeaders,
  swapStats,
  topFive,
} from './randomizer';
describe('randomizeContenders', () => {
  let contenders;
  beforeEach(() => {
    contenders = [
      {
        name: 'One',
        goldTotal: 1,
        silverTotal: 0,
        bronzeTotal: 0,
        allTotal: 1,
      },
      {
        name: 'Two',
        goldTotal: 1,
        silverTotal: 1,
        bronzeTotal: 0,
        allTotal: 2,
      },
      {
        name: 'Three',
        goldTotal: 1,
        silverTotal: 1,
        bronzeTotal: 1,
        allTotal: 3,
      },
      {
        name: 'Four',
        goldTotal: 1,
        silverTotal: 1,
        bronzeTotal: 2,
        allTotal: 4,
      },
      {
        name: 'Five',
        goldTotal: 1,
        silverTotal: 2,
        bronzeTotal: 2,
        allTotal: 5,
      },
      {
        name: 'Six',
        goldTotal: 2,
        silverTotal: 2,
        bronzeTotal: 2,
        allTotal: 6,
      },
    ];
  });

  describe('sortByTotal', () => {
    it('sorts the contenders by their total', () => {
      let sorted = sortByTotal(contenders);
      expect(sorted[0].name).to.equal('Six');
      expect(sorted[1].name).to.equal('Five');
      expect(sorted[2].name).to.equal('Four');
      expect(sorted[3].name).to.equal('Three');
      expect(sorted[4].name).to.equal('Two');
      expect(sorted[5].name).to.equal('One');
    });
  });

  describe('createRandomStats', () => {
    it('creates random stat values', () => {
      let contender = createRandomStats({});
      let gold = contender.goldTotal;
      let silver = contender.silverTotal;
      let bronze = contender.bronzeTotal;
      let total = contender.allTotal;

      expect(gold).to.be.a('number');
      expect(silver).to.be.a('number');
      expect(bronze).to.be.a('number');
      expect(total).to.equal(gold + silver + bronze);
    });
  });

  describe('randomizeContenders', () => {
    it('randomizes a list of contenders', () => {
      let randomContenders = randomizeContenders([{}, {}]);

      expect(randomContenders[0].goldTotal).to.be.a('number');
      expect(randomContenders[0].silverTotal).to.be.a('number');
      expect(randomContenders[0].bronzeTotal).to.be.a('number');

      expect(randomContenders[1].goldTotal).to.be.a('number');
      expect(randomContenders[1].silverTotal).to.be.a('number');
      expect(randomContenders[1].bronzeTotal).to.be.a('number');
    });
  });

  describe('topFive', () => {
    it('returns the top 5 contenders', () => {
      let top5 = topFive(contenders);

      expect(top5[0].name).to.equal('Six');
      expect(top5[1].name).to.equal('Five');
      expect(top5[2].name).to.equal('Four');
      expect(top5[3].name).to.equal('Three');
      expect(top5[4].name).to.equal('Two');
    });
  });

  describe('boostNewContender', () => {
    it('modifies a contender out of the top 5 to be in the top 5', () => {
      let originalTopFive = topFive(contenders);
      boostNewContender(contenders);
      let newTopFive = topFive(contenders);
      expect(newTopFive).to.not.eql(originalTopFive);
    });
  });

  describe('getLosers', () => {
    it('returns all but the top 5', () => {
      let losers = getLosers(contenders);
      expect(losers.length).to.equal(1);
      expect(losers[0].name).to.equal('One');
    });
  });

  describe('getRandomContender', () => {
    it('returns a random contender from the list', () => {
      let randomContenders = [
        getRandomContender(contenders),
        getRandomContender(contenders),
        getRandomContender(contenders),
      ];
      let uniqueCount = uniq(randomContenders.map((c) => c.name)).length;
      expect(uniqueCount).to.be.greaterThan(1);
    });
  });

  describe('getRandomContenderWithout', () => {
    it('allows you to exclude a given contender from the result', () => {
      let newContenders = [contenders[0], contenders[1]];
      times(5, () => {
        let randomContender = getRandomContenderWithout(newContenders, contenders[0]);
        expect(randomContender).to.equal(contenders[1]);
      });
    });
  });

  describe('swapStats', () => {
    it('swaps the stats of two contenders', () => {
      swapStats(contenders[0], contenders[1]);
      expect(contenders[0].allTotal).to.equal(2);
      expect(contenders[1].allTotal).to.equal(1);
    });
  });

  describe('swapRandomLeaders', () => {
    it('swaps the stats of two random leaders', () => {
      let originalTopFive = topFive(contenders);
      swapRandomLeaders(contenders, contenders[5]);
      let newTopFive = topFive(contenders);
      expect(newTopFive).to.not.eql(originalTopFive);
    });
  });

  describe('shuffleContenders', () => {
    it('shuffles contenders', () => {
      shuffleContenders(contenders);
      shuffleContenders(contenders);
      shuffleContenders(contenders);
      shuffleContenders(contenders);
    });
  });
});
