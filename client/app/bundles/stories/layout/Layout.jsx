import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export default class Layout extends Component {
  /* eslint-disable react/no-unescaped-entities */
  render() {
    const { children } = this.props;
    return (
      <section>
        {children}
      </section>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
