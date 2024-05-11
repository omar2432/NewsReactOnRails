// import React from 'react';
import Immutable from 'immutable';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../../../libs/middlewares/loggerMiddleware';
import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialStories = props.stories;
  const { $$storiesState } = initialStates;

  const initialState = {
    $$storiesStore: $$storiesState.merge({
      $$stories: Immutable.fromJS(initialStories),
    }),
    railsContext,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));

  return composedStore(createStore)(reducer, initialState);
};

