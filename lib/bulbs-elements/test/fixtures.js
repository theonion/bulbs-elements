import { each } from 'lodash';
import invariant from 'invariant';
const FIXTURE_CLASSNAME = 'fixtures';

export function createElement (nodeType, attributes = {}) {
  invariant(nodeType, 'createElement(nodeType, attributes): nodeType is undefined');

  let element = document.createElement(nodeType);

  if (attributes.data) {
    setDataOnElement(element, attributes.data);
    delete attributes.data;
  }

  if (attributes.style) {
    setStylesOnElement(element, attributes.style);
    delete attributes.style;
  }

  setAttributesOnElement(element, attributes);

  return element;
}

export function setAttributesOnElement (element, attributes) {
  invariant(element, 'setAttributesOnElement(element, attributes): element is undefined');
  invariant(attributes, 'setAttributesOnElement(element, attributes): attributes is undefined');

  each(attributes, (value, attribute) => element.setAttribute(attribute, value));
}

export function setDataOnElement (element, data) {
  invariant(element, 'setDataOnElement(element, data): element is undefined');
  invariant(data, 'setDataOnElement(element, data): data is undefined');

  Object.keys(data).forEach(key => element.dataset[key] = data[key]);
}

export function setStylesOnElement (element, styles) {
  invariant(element, 'setStylesOnElement(element, styles): element is undefined');
  invariant(styles, 'setStylesOnElement(element, styles): styles is undefined');

  Object.keys(styles).forEach(key => element.style[key] = styles[key]);
}

export function appendFixtureContainer () {
  removeFixtures();
  let fixtures = createElement('div', {
    id: 'fixtures',
    style: { display: 'none' },
  });
  document.body.appendChild(fixtures);

  return fixtures;
}

export function clearElement (element) {
  invariant(element, 'clearElement(element): element is undefined');

  element.innerHTML = '';
}

export function clearFixtures () {
  let fixtures = document.getElementById(FIXTURE_CLASSNAME);
  fixtures && clearElement(fixtures);
}

export function removeElement (element) {
  invariant(element, 'removeElement(element): element is undefined');

  document.body.removeChild(element);
}

export function removeFixtures () {
  let fixtures = document.getElementById(FIXTURE_CLASSNAME);
  fixtures && removeElement(fixtures);
}
