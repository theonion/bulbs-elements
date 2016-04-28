import { createRenderer } from 'react-addons-test-utils';

export function shallow (element) {
  let shallowRenderer = createRenderer();
  shallowRenderer.render(element);
  return shallowRenderer.getRenderOutput();
}
