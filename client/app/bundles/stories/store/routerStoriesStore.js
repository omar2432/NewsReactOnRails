// import React from 'react';
import Immutable from 'immutable';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from '../../../libs/middlewares/loggerMiddleware';

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialStories = props.stories;
  console.log('****************');
  console.log('Initial stories:', initialStories);
  console.log('props:', props);
  console.log('****************');
  const { $$storiesState } = initialStates;

  const initialState = {
    $$storiesStore: $$storiesState.merge({
      $$stories: Immutable.fromJS(initialStories),
    }),
    railsContext,
  };

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  // Sync dispatched route actions to the history
  const finalCreateStore = compose(applyMiddleware(thunkMiddleware, loggerMiddleware))(createStore);

  return finalCreateStore(reducer, initialState);
};
