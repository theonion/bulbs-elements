export function createElement (nodeType, attributes = {}) {
  let element = document.createElement(nodeType);
  setDataOnElement(element, attributes);
  setStylesOnElement(element, attributes);
  Object.assign(element, attributes);
  return element;
}

export function setDataOnElement (element, attributes) {
  attributes.data = attributes.data || {};
  Object.keys(attributes.data).forEach((key) => {
    element.dataset[key] = attributes.data[key];
  });
  delete attributes.data;
}

export function setStylesOnElement (element, attributes) {
  attributes.style = attributes.style || {};
  Object.keys(attributes.style).forEach((key) => {
    element.style[key] = attributes.style[key];
  });
  delete attributes.style;
}

export function appendFixtureContainer () {
  removeFixtures();
  let fixtures = createElement('div', {
    id: 'fixtures',
    style: {
      display: 'none',
    },
  });
  document.body.appendChild(fixtures);
  return fixtures;
}

export function removeFixtures () {
  let fixtures = document.getElementById('fixtures');
  fixtures && document.body.removeChild(fixtures);
}
