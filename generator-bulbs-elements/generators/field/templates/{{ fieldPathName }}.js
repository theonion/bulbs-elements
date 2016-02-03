import { Field, Actions } from 'bulbs-elements/store';

const <%= fieldClassName %>Field = new Field({
	initialState: {},
	initialAction: new Action(function (state, answer, store) {
		// write actual actions
		return state;
	});
});

export default <%= fieldClassName %>Field;
