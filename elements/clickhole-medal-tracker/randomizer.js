import {
  clone,
  includes,
  maxBy,
  minBy,
  merge,
  random,
  sortBy,
  take,
} from 'lodash';

export function createRandomStats (contender) {
  let goldTotal = random(1, 300);
  let silverTotal = random(1, 300);
  let bronzeTotal = random(1, 300);

  merge(contender, {
    goldTotal,
    silverTotal,
    bronzeTotal,
    allTotal: goldTotal + silverTotal + bronzeTotal,
  });

  return contender;
}

export function createRandomStatsFromRange (contender, min, max) {
  let maxCeiling = random(max, max + 100);
  let randomTotal = random(min, maxCeiling);
  let goldTotal = random(1, randomTotal);
  let silverTotal = random(1, randomTotal - goldTotal);
  let bronzeTotal = randomTotal - silverTotal - goldTotal;

  merge(contender, {
    goldTotal,
    silverTotal,
    bronzeTotal,
    allTotal: randomTotal
  });

  return contender;
}

export function minTotal (contenders) {
  return minBy(contenders, 'allTotal').allTotal;
}

export function maxTotal (contenders) {
  return maxBy(contenders, 'allTotal').allTotal;
}

export function sortByTotal (contenders) {
  return sortBy(contenders, (c) => -c.allTotal);
}

export function sortedRandomizedContenders (contenders) {
  return sortByTotal(randomizeContenders(contenders));
}

export function randomizeContenders (contenders) {
  return contenders.map((contender) => createRandomStats(contender));
}

export function shuffleContenders (contenders) {
  let newContender = boostNewContender(contenders);
  swapRandomLeaders(contenders, newContender);

  let top5 = topFiveContenders(contenders);
  let min = minTotal(top5);
  let max = maxTotal(top5);

  top5.map((contender) => createRandomStatsFromRange(contender, min, max));

  return sortByTotal(contenders);
}

export function topFiveContenders (contenders) {
  return take(sortByTotal(contenders), 5);
}

export function boostNewContender (contenders) {
  let randomLoser = getRandomContender(getLosers(contenders));
  let randomLeader = getRandomContender(topFiveContenders(contenders));
  swapStats(randomLeader, randomLoser);

  return randomLoser;
}

export function getLosers (contenders) {
  return sortByTotal(contenders).slice(5);
}

export function getRandomContender (contenders) {
  let lastIndex = contenders.length - 1;
  let randomIndex = random(0, lastIndex);
  let randomContender = contenders[randomIndex];

  return randomContender;
}

export function getRandomContenderWithout (contenders, ...excludeContenders) {
  let randomContender = getRandomContender(contenders);

  while (chosenContenderIsInExclusions(randomContender, excludeContenders)) {
    randomContender = getRandomContender(contenders);
  }

  return randomContender;
}

export function chosenContenderIsInExclusions (contender, exclusions) {
  return includes(exclusions.map((exclusion) => exclusion.name), contender.name);
}

export function swapStats (contenderA, contenderB) {
  let newAStats = clone(contenderB);
  let newBStats = clone(contenderA);

  ['gold', 'sliver', 'bronze', 'all'].forEach((stat) => {
    contenderA[`${stat}Total`] = newAStats[`${stat}Total`];
    contenderB[`${stat}Total`] = newBStats[`${stat}Total`];
  });

  return [contenderB, contenderA];
}

export function swapRandomLeaders (contenders, newContender) {
  let top5 = topFiveContenders(contenders);
  let leaderA = getRandomContenderWithout(top5, newContender);
  let leaderB = getRandomContenderWithout(top5, leaderA, newContender);

  return swapStats(leaderA, leaderB);
}
