import React, { PropTypes } from 'react';

export default class ShareButton extends React.Component {
  render () {
    return (
      <a
        className={this.props.className}
        href={this.props.href || '#'}
        data-track-label={this.props.dataTrackLabel}
        onClick={this.props.onClick}
      >
        { this.props.icon && <i className={this.props.iconClassName}/> }
        { this.props.label && <span>{this.props.labelText}</span> }
      </a>
    );
  }
}

ShareButton.propTypes = {
  className: PropTypes.string.isRequired,
  dataTrackLabel: PropTypes.string.isRequired,
  href: PropTypes.string,
  icon: PropTypes.bool,
  iconClassName: PropTypes.string,
  label: PropTypes.bool,
  labelText: PropTypes.string,
  onClick: PropTypes.fn,
};
