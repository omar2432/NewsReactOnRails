/* eslint new-cap: 0 */

import React from 'react';
import Immutable from 'immutable';

import * as actionTypes from '../constants/storiesConstants';

export const $$initialState = Immutable.fromJS({
  $$stories: [],
  fetchStoryError: null,
  submitStoryError: null,
  isFetching: false,
  isSaving: false,
  locale: null,
  filteredStoriesCount: 0,
});

export default function storiesReducer($$state = $$initialState, action = null) {
  const { type, story, stories, error, locale } = action;

  switch (type) {
    case actionTypes.FETCH_STORIES_SUCCESS: {
      return $$state.merge({
        $$stories: Immutable.fromJS(stories),
        fetchStoryError: null,
        isFetching: false,
      });
    }

    case actionTypes.FETCH_STORIES_FAILURE: {
      return $$state.merge({
        fetchStoryError: error,
        isFetching: false,
      });
    }
/*
    case actionTypes.MESSAGE_RECEIVED: {
      story.nodeRef = React.createRef(null);
      return $$state.withMutations((state) =>
        state.updateIn(['$$stories'], ($$stories) =>
          $$stories.findIndex((com) => com.get('id') === story.get('id')) === -1
            ? $$stories.unshift(Immutable.fromJS(story))
            : $$stories,
        ),
      );
    }
*/

    case actionTypes.MESSAGE_RECEIVED: {
      const { story } = action;
      // Check if the story already exists in the state
      const existingIndex = $$state.get('$$stories').findIndex(
        (existingStory) => existingStory.get('id') === story.get('id')
      );

      // If the story doesn't exist, add it to the beginning of the list
      if (existingIndex === -1) {
        return $$state.update('$$stories', ($$stories) =>
          $$stories.unshift(story)
        );
      } else {
        // If the story exists, replace it with the new one
        return $$state.setIn(['$$stories', existingIndex], story);
      }
    }


    case actionTypes.SUBMIT_STORY_SUCCESS: {
      story.nodeRef = React.createRef(null);
      return $$state.withMutations((state) =>
        state
          .updateIn(['$$stories'], ($$stories) => {
            const index = $$stories.findIndex((com) => com.get('id') === story.id);
            return index === -1
              ? $$stories.unshift(Immutable.fromJS(story))
              : $$stories.set({ index, value: Immutable.fromJS(story) });
          })
          .merge({
            submitStoryError: null,
            isSaving: false,
          }),
      );
    }

    case actionTypes.SUBMIT_STORY_FAILURE: {
      return $$state.merge({
        submitStoryError: error,
        isSaving: false,
      });
    }

    case actionTypes.SET_IS_FETCHING: {
      return $$state.merge({
        isFetching: true,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return $$state.merge({
        isSaving: true,
      });
    }

    case actionTypes.SET_LOCALE: {
      return $$state.merge({
        locale,
      });
    }

    case actionTypes.SET_FILTERED_STORIES_COUNT: {
      return $$state.set('filteredStoriesCount', action.count);
    }

    default: {
      return $$state;
    }
  }
}
