import {
  Store,
  Field,
  PromiseField,
  Action,
} from '../store';

export default class PollStore extends Store { }
Store.defineFields(PollStore, {
  poll: new Field({
    initialState: {
      answers: [],
    },
    // accepts a JSON payload of poll data
    setPollData: new Action(function (state, payload) {
      return JSON.parse(payload);
    }),
  }),
  selectedAnswer: new Field({
    initialState: null,
    // payload should be an answer object
    // If same answer is selected twice, the selection will be toggled
    //    to null.
    selectAnswer: new Action(function (state, payload) {
      return state === payload ? null : payload;
    }),
  }),
  vote: new PromiseField({
    generate: function (state, payload) {
      return fetch('http://onion.sodahead/api/polls/:id', payload);
    },
    success: new Action(function (state, payload) {
      if (payload.status < 300) {
        state.data = payload.json();
      }
      else if (payload.status >= 400) {
        state.failure = payload.json();
      }
      return state;
    }),
    error: new Action(function (state, payload) {
      state.error = error;
      return state;
    }),
  })
});

