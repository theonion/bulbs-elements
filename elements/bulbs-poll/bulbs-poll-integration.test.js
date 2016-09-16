// import { assert } from 'chai';
// import fetchMock from 'fetch-mock';
// import testElement from 'bulbs-elements/test/element';
// testElement('BulbsPoll', function () {
//   beforeEach(function (done) {
//     let pollEndpoint = 'http://example.tld/api/polls/1';
//     fetchMock.mock(pollEndpoint, {
//       body: {
//         id: 1,
//         sodahead_id: 293829,
//         question_text: 'this dope question',
//         answers: [{
//           id: 1,
//           sodahead_id: 'answer_01',
//           answer_text: 'answer A',
//         },{
//           id: 2,
//           sodahead_id: 'answer_03',
//           answer_text: 'answer B',
//         }]
//       },
//     });
//     this.element = this.renderElement({
//       done,
//       tag: 'bulbs-poll',
//       props: {
//         src: pollEndpoint,
//       },
//     });
//     this.actions = this.element.reactInstance.store.actions;
//   });

//   it('renders a poll', function () {
//     let answers = this.element.querySelectorAll('.bulbs-poll-answer');
//     assert.equal(answers[0].textContent, 'answer A');
//     assert.equal(answers[1].textContent, 'answer B');
//   });

//   it('selects an answer', function () {
//     let answer = this.element.querySelector('.bulbs-poll-answer');
//     answer.click();
//     assert.isTrue(answer.classList.contains('selected'));
//   });

//   it('toggles an answer if clicked twice', function () {
//     let answer = this.element.querySelector('.bulbs-poll-answer');
//     answer.click();
//     answer.click();
//     assert.isFalse(answer.classList.contains('selected'));
//   });

//   it('deselects an answer if a different anwser is selected', function () {
//     let answers = this.element.querySelectorAll('.bulbs-poll-answer');
//     answers[0].click();
//     answers[1].click();
//     assert.isFalse(answers[0].classList.contains('selected'));
//     assert.isTrue(answers[1].classList.contains('selected'));
//   });

//   context('VoteButton', function () {
//     it('will not vote when no answer is selected', function () {
//       let actionSpy = sinon.stub(this.actions, 'invoke');
//       this.element.querySelector('.bulbs-poll-vote').click();
//       expect(actionSpy).not.to.have.been.called;
//     });

//     it('will make a vote request if an answer is selected', function () {
//       let actionSpy = sinon.stub(this.actions, 'makeVoteRequest');
//       this.element.querySelector('.bulbs-poll-answer').click();
//       this.element.querySelector('.bulbs-poll-vote').click();
//       expect(actionSpy).to.have.been.called;
//     });
//   });

//   context('voteRequestError', function () {
//   });

//   context('voteRequestSuccess', function () {
//     beforeEach(function () {
//       let { voteRequestSuccess } = this.actions;
//       this.voteRequestSuccess({
//         "vote":{
//           "answer":{
//             "id":12058768
//           },
//         },
//         "poll":{
//           "id":4857066,
//           "answers":[
//             {
//               "id":12058768
//             },
//             {
//               "id":12058770
//             },
//           ],
//         },
//       });
//     });

//     it('does not render a vote button', function () {
//       let voteButton = this.element.querySelector('button');
//       assert.isNull(voteButton);
//     });
//   });

//   context('voteRequestFailure', function () {
//     beforeEach(function () {
//       let { voteRequestFailure } = this.actions;
//       voteRequestFailure
//     });
//   });
//   context('voteRequestSuccess FAILURE', function () {
//     beforeEach(function () {
//       let { voteRequestSuccess } = this.actions;
//       voteRequestSuccess({
//         status: 400,
//         json: () => {
//           return {

//           };
//         },
//       });
//     });
//   });

//   context('voteRequestError', function () {
//     it('displays an error message', function () {
//       let { voteRequestError } = this.actions;
//       voteRequestError({
//         message: 'This is the error!',
//       });
//     });
//   });
// });

