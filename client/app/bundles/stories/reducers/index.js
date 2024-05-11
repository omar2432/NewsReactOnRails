import storiesReducer, { $$initialState as $$storiesState } from './storiesReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$storiesStore: storiesReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$storiesState,
  railsContextState,
};
