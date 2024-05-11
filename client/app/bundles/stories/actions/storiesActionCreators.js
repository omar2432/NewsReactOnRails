import requestsManager from '../../../libs/requestsManager';
import * as actionTypes from '../constants/storiesConstants';

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING,
  };
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING,
  };
}

export function setFilteredStoriesCount(count) {
  return {
    type: actionTypes.SET_FILTERED_STORIES_COUNT,
    count,
  };
}

export function fetchStoriesSuccess(data) {
  console.log("***** fetchStoriesSuccess action DATA "+data);
  //console.log("***** fetchStoriesSuccess action DATA.stories "+data.stories);
  console.log("***** fetchStoriesSuccess action DATA "+JSON.stringify(data));
  return {
    type: actionTypes.FETCH_STORIES_SUCCESS,
    stories: data,
  };
}

export function fetchStoriesFailure(error) {
  return {
    type: actionTypes.FETCH_STORIES_FAILURE,
    error,
  };
}

export function messageReceived(story) {
  return {
    type: actionTypes.MESSAGE_RECEIVED,
    story,
  };
}

export function submitStorySuccess(story) {
  return {
    type: actionTypes.SUBMIT_STORY_SUCCESS,
    story,
  };
}

export function submitStoryFailure(error) {
  return {
    type: actionTypes.SUBMIT_STORY_FAILURE,
    error,
  };
}

export function fetchStories() {
  return (dispatch) => {
    dispatch(setIsFetching());
    return requestsManager
      .fetchEntities()
      .then((res) => dispatch(fetchStoriesSuccess(res.data)))
      .catch((error) => dispatch(fetchStoriesFailure(error)));
  };
}

export function submitStory(story) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return requestsManager
      .submitEntity({ story })
      .then((res) => dispatch(submitStorySuccess(res.data)))
      .catch((error) => dispatch(submitStoryFailure(error)));
  };
}

export function setLocale(locale) {
  return {
    type: actionTypes.SET_LOCALE,
    locale,
  };
}
