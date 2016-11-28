/* eslint-disable no-warning-comments */
// The load-on-demand utility attaches global event listeners for
// * resize
// * scroll
//
// These handlers add a callback to requestAnimationFrame. The callback will be
// queued no more than once per frame.
//
// Wrap your component like this:
//
// import { loadOnDemand } from 'bulbs-elements/util'
//
// class ComponentToLoadOnDemand extends React.Component {
//   render () {
//     return <h1> Hoopla </h1>
//   }
// }
//
// export default loadOnDemand(ComponentToLoadOnDemand)
import React, { PropTypes } from 'react';

addEventListener('resize', maybeLoadComponents);
addEventListener('scroll', maybeLoadComponents, true);

const pendingComponents = [];
let animationFrameRequested = false;

function maybeLoadComponents () {
  if (animationFrameRequested === false) {
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
  let distanceFromTop = 200;
  let distanceFromBottom = 200;
  // TODO: Make the distance from the bottom and top of the viewport configurable.
  //       Maybe something like this:
  //
  // let {
  //   distanceFromTop,
  //   distanceFromBottom,
  // } = component.props.config;
  //
  // if (typoof distanceFromTop === 'undefined') {
  //   distanceFromTop = 200;
  // }
  //
  // if (typoof distanceFromBottom === 'undefined') {
  //   distanceFromBottom = 200;
  // }
  //
  // This would require altering the function exported at the bottom this file
  // to take a second argument:
  //
  // function (component, config = {}) {}
  //
  // And updating it's render function to pass config into the wrapped component.
  //
  // Something like this:
  //
  // return (
  //   <WrappedComponent
  //     config={config}
  //     component={component}
  //     componentProps={props}
  //   />;
  // );

  let rect = component.refs.sentinel.getBoundingClientRect();
  return rect.bottom > -distanceFromTop && rect.top < window.innerHeight + distanceFromBottom;
}

function loadComponent (component) {
  component.setState({ load: true });
}

function enqueue (component) {
  pendingComponents.push(component);
}

function dequeue (component) {
  let index = pendingComponents.indexOf(component);
  if (index > -1) {
    pendingComponents.splice(index, 1);
  }
}

export class LoadOnDemand extends React.Component {
  constructor (props) {
    super(props);
    this.state = { load: false };
  }

  componentDidMount () {
    enqueue(this);
    maybeLoadComponent(this);
  }

  componentWillUnmount () {
    dequeue(this);
  }

  render () {
    let WrappedComponent = this.props.component; // eslint-disable-line react/prop-types
    if (this.state.load) {
      return <WrappedComponent {...this.props.componentProps}/>; // eslint-disable-line react/prop-types
    }

    return <div ref="sentinel"/>;
  }
}

export default function loadOnDemand (Component) {

  const wrapped = (props) => { // eslint-disable-line react/no-multi-comp
    if (typeof props.disableLazyLoading !== 'undefined') {
      return <Component {...props} />;
    }

    return (
      <LoadOnDemand
        component={Component}
        componentProps={props}
      />
    );
  };

  wrapped.displayName = `LoadOnDemand(${Component.displayName})`;
  wrapped.propTypes = {
    disableLazyLoading: PropTypes.string,
  };

  return wrapped;
}
