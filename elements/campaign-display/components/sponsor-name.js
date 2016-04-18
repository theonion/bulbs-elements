import React, { PropTypes } from 'react';

export default function SponsorName (props) {
  let hasUrl = !!props.clickthrough_url;
  let name = <span className='campaign-display-name'>{props.name}</span>;
  let link = <a href={props.clickthrough_url}>{name}</a>;
  return hasUrl ? link : name;
}

SponsorName.propTypes = {
  name: PropTypes.string.isRequired,
};
