import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { IntlProvider } from 'react-intl';
import Intl from 'intl';
import { defaultLocale } from '../../../libs/i18n/default';
import { translations } from '../../../libs/i18n/translations';

import StoryScreen from '../components/StoryScreen/StoryScreen.jsx';
import * as storiesActionCreators from '../actions/storiesActionCreators';

global.Intl = Intl;

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$storiesStore };
}

function RouterStoriesContainer(props) {
  const { dispatch, data, category } = props;
  const actions = bindActionCreators(storiesActionCreators, dispatch);
  const location = useLocation();
  const locationState = location.state;
  const locale = data.get('locale') || defaultLocale;
  const messages = translations[locale];

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <div style={{ padding: '20px' }}>
        <StoryScreen {...{ actions, data, locationState, category }} />
      </div>
    </IntlProvider>
  );
}

RouterStoriesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

// Don't forget to actually use connect!
export default React.memo(connect(select)(RouterStoriesContainer));
