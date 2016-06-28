export const OUTCOME_REVEAL_DURATION = 500;
export const OUTCOME_SCROLLTO_OFFSET_TOP = -20;

export function sendResultAnalytics (outcome) {
  let resultText = window.$('h3.quiz-outcome', outcome).text();
  let gaEvent = {
    'eventCategory': 'Quiz result: ' + resultText,
    'eventAction': 'Quiz result',
    'eventLabel': 'None',
    'dimension1': window.targeting.dfp_pagetype,
  };

  if (window.clickTest) {
    console.log(gaEvent);
    // e.preventDefault();
  }
  else {
    window.ga('send', 'event', gaEvent);
  }
}
