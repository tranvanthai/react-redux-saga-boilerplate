import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { showMenu } from 'actions';

import config from 'config';

const Logo = ({ file, dispatch }) => (
  <div className="app__logo" onClick={() => dispatch(showMenu())}>
    <SVG src={require(`assets/media/brand/${file}.svg`)}>
      <img src={require(`assets/media/brand/${file}.png`)} alt={config.title} />
    </SVG>
  </div>
);

Logo.propTypes = {
  file: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

Logo.defaultProps = {
  file: 'icon',
};

export default Logo;
