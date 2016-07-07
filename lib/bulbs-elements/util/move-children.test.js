import moveChildren from './move-children';

describe('moveChildren', () => {
  it('moves children from one element to another', () => {
    let one = document.createElement('div');
    let another = document.createElement('div');

    one.appendChild(document.createElement('span'));
    one.appendChild(document.createTextNode('yes'));

    moveChildren(one, another);

    expect(one.childNodes.length).to.eq(0);
    expect(another.childNodes.length).to.eq(2);
  });
});
