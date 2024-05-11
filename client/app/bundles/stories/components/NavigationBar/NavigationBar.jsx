// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StoriesCount from './StoriesCount.jsx';
import * as paths from '../../constants/paths';
import { NavLink as Link } from 'react-router-dom';

function NavigationBar(props) {
  const { storiesCount, pathname } = props;

  const [isOpen, setIsOpen] = useState(false);

  const menuWrapperClasses = 'flex flex-col lg:flex-row flex-wrap lg:items-center lg:visible';

  return (
    <nav className="bg-yellow-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex justify-between items-center align-middle">
            <a className="p-3 text-2xl" href="http://www.shakacode.com">
              ShakaNews
            </a>

            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="p-4 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </button>
          </div>

          <ul className={`${menuWrapperClasses} ${isOpen ? '' : ' collapse'}`}>

            <li className={classNames({ 'bg-yellow-100': pathname === paths.TRENDING_PATH })}>
              <Link to="/" className={({ isActive }) => ( isActive ? 'activated ' : '' ) + 'px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700'}>
              Todays News
              </Link>
            </li>

            <li className={classNames({ 'bg-yellow-100': pathname === paths.TRENDING_PATH })}>
            <Link  to="/trending"  className={({ isActive }) => ( isActive ? 'activated ' : '' ) + 'px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700'}>
              Trending
              </Link>
            </li>

            <li className={classNames({ 'bg-yellow-100': pathname === paths.SPORTS_PATH })}>
              <Link to="/sports" className={({ isActive }) => ( isActive ? 'activated ' : '' ) + 'px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700'}>
              Sports
              </Link>
            </li>

            <li className={classNames({ 'bg-yellow-100': pathname === paths.ENTERTAINMENT_PATH })}>
              <Link to="/entertainment" className={({ isActive }) => ( isActive ? 'activated ' : '' ) + 'px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700'}>
              Entertainment
              </Link>
            </li>
            

            {storiesCount !== null && _.isNumber(storiesCount) && <StoriesCount storiesCount={storiesCount} />}
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavigationBar.propTypes = {
    storiesCount: PropTypes.number,
  pathname: PropTypes.string.isRequired,
};

export default NavigationBar;
