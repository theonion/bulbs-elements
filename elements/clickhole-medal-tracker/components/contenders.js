/* eslint react/prop-types: 0 */
import React, { PropTypes, Component } from 'react';
import Contender from './contender';
import { take } from 'lodash';

export default class Contenders extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  contenderComponents () {
    return take(this.props.contenders, 5).map((contender, i) => <Contender {...contender} key={i} />);
  }

  render () {
    return (
      <div className='contenders'>
        <header>
          <div className='contender-name'>Country</div>
          <div className='gold-medal-totals'>G</div>
          <div className='silver-medal-totals'>S</div>
          <div className='bronze-medal-totals'>B</div>
          <div className='all-medal-totals'>Total</div>
        </header>
        {this.contenderComponents()}
      </div>);
  }
}

Object.assign(Contenders, {
  displayName: 'Contenders',
  defaultProps: {
    contenders: [],
  },
  propTypes: {
    contenders: PropTypes.array,
  },
});
