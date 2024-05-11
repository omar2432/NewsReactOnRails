import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../../libs/components/BaseComponent.jsx';

import NavigationBar from '../components/NavigationBar/NavigationBar.jsx';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  if (state.$$storiesStore) {
    return {
      storiesCount: state.$$storiesStore.get('filteredStoriesCount') ?? 0,
      pathname: state.railsContext.pathname,
    };
  }
  return {};
}

class NavigationBarContainer extends BaseComponent {
  static propTypes = {
    storiesCount: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    const { storiesCount, pathname } = this.props;

    return <NavigationBar {...{ storiesCount, pathname }} />;
  }
}

// Don't forget to actually use connect!
export default connect(stateToProps)(NavigationBarContainer);
