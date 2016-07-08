import copyAttribute from './copy-attribute';

describe('copyAttribute', () => {
  it('copies an attribute from one element to another', () => {
    let one = document.createElement('div');
    let another = document.createElement('div');

    one.setAttribute('an-attribute', 'yes');

    copyAttribute('an-attribute', one, another);

    expect(another.getAttribute('an-attribute')).to.eql('yes');
  });
});
