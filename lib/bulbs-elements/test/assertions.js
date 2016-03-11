import TestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import { diffLines } from 'diff';
import flatten from 'array-flatten';

function color (string, _color) {
  return {
    string: `%c${string}%c`,
    styles: [
      `color:${_color}`,
      `color:auto`,
    ],
  };
}

function printElAttrs (el) {
  let attrs = [];
  Object.keys(el.props).forEach((key) => {
    if (key !== 'children' && typeof el.props[key] === 'string') {
      attrs.push(`${key}="${el.props[key]}"`);
    }
  });
  if (attrs.length > 0) {
    return ` ${attrs.join(' ')}`;
  }
  else {
    return ``;
  }
}

function printElChildren (el, depth) {
  let indent = '\n';
  let i = depth;
  while (i--) {
    indent += '  ';
  }

  if (el.props.children && el.props.children.constructor === Array) {
    let children = [];
    flatten(el.props.children).map((child) => {
      if (child) {
        children.push(printEl(child, depth));
      }
    });
    return indent + children.join(indent) + '\n';
  }
  else if (el.props.children) {
    return indent + printEl(el.props.children, depth) + '\n';
  }
  else {
    return ``;
  }
}

function printEl (el, depth = 0) {
  let indent = '';
  let i = depth;
  while (i--) {
    indent = indent + '  ';
  }

  if (el === null || typeof el === 'undefined') {
    return ``;
  }
  if (el.type && el.type.constructor === Function) {
    return `<${el.type.name}${printElAttrs(el)}>${printElChildren(el, depth + 1)}${indent}</${el.type.name}>`;
  }
  else if (el.type) {
    return `<${el.type}${printElAttrs(el)}>${printElChildren(el, depth + 1)}${indent}</${el.type}>`;
  }
  else if (el.constructor === String) {
    return el;
  }
  else {
    return `Unknown Element: ${el}`;
  }
}

function printElDiff(title, actual, expected) {
  let diff = diffLines(printEl(actual), printEl(expected));
  let log = [];
  let colors = [];
  diff.forEach((part) => {
    let colored;
    if (part.added) {
      colored = color(part.value, 'red');
      log.push(colored.string);
      colors = colors.concat(colored.styles);
    }
    else if (part.removed) {
      colored = color(part.value, 'green');
      log.push(colored.string);
      colors = colors.concat(colored.styles);
    }
    else {
      log.push(part.value);
    }
  });

  console.log(`JSX Not Matched: ${title}`);
  console.log(
    '%c(extra in component)%c %c(missing from component)%c',
    'color:green', 'color:auto', 'color:red', 'color:auto'
  );
  console.log(log.join(''), ...colors);
}

function assertJSXElementEqual (actual, expected) {
  if (!(actual || expected)) {
    // sometimes nodes are null and undefined, this is okay
    return;
  }
  else if (expected.constructor === String) {
    assert.equal(actual, expected);
  }
  else if (actual && expected) {
    assert.equal(actual.type, expected.type);
    Object.keys(expected.props || {}).forEach(function (key) {
      if (key !== 'children') {
        assert.deepEqual(actual.props[key], expected.props[key]);
      }
    });

    if (expected.props.children && expected.props.children.forEach) {
      flatten(expected.props.children).forEach(function (child, index) {
        if (actual.props.children) {
          assertJSXElementEqual(flatten(actual.props.children)[index], child);
        }
        else {
          assertJSXElementEqual(null, child);
        }
      });
    }
    else if (expected.props.children) {
      assert.equal(actual.props.children, expected.props.children);
    }
  }
  else {
    throw Error('Mismatch between actual and expected nodes', actual, expected);
  }
}

export function assertJSXEqual (title, actual, expected) {
  let renderer = TestUtils.createRenderer();
  renderer.render(actual);
  let result = renderer.getRenderOutput();
  try {
    assertJSXElementEqual(result, expected);
  }
  catch (error) {
    printElDiff(title, result, expected);
    throw error;
  }
}
