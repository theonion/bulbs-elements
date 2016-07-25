// The load-on-demand utility attaches global event listeners for
// * resize
// * scroll
//
// These handlers add a callback to requestAnimationFrame. The callback will be
// queued no more than once per frame.

import React from 'react';

addEventListener('resize', maybeLoadComponents);
addEventListener('scroll', maybeLoadComponents);

const pendingComponents = [];
let animationFrameRequested = false;

function maybeLoadComponents () {
  if (!animationFrameRequested) {
    requestAnimationFrame(() => {
      animationFrameRequested = false;
      pendingComponents.forEach(maybeLoadComponent);
    });
    animationFrameRequested = true;
  }
}

function maybeLoadComponent (component) {
  if (shouldComponentLoad(component)) {
    loadComponent(component);
    dequeue(component);
  }
}

function shouldComponentLoad (component) {
  let rect = component.refs.sentinel.getBoundingClientRect;
  return rect.bottom > -200 && rect.top < window.innerHeight + 200;
}

function loadComponent (component) {
  component.setState({ load: true });
}

export function enqueue (component) {
  pendingComponents.push(component);
}

export function dequeue (component) {
  let index = pendingComponents.indexOf(component);
  if (index > -1) {
    pendingComponents.splice(index, 1);
  }
}

export default class LoadOnDemand extends React.Component {
  componentDidMount () {
    enqueue(this);
    maybeLoadComponent(this);
  }

  componentWillUnmount () {
    dequeue(this);
  }

  render () {
    let WrappedComponent = this.props.component;
    if (this.state.load) {
      return <WrappedComponent {...this.props}/>;
    }

    return <div ref="sentinel" {...this.props}/>;
  }
}
