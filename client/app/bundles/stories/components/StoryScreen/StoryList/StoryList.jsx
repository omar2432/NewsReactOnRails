import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import BaseComponent from 'libs/components/BaseComponent';
import SelectLanguage from 'libs/i18n/selectLanguage';
import { defaultMessages, defaultLocale } from 'libs/i18n/default';
import Story from './Story/Story.jsx';
import css from './StoryList.module.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { setFilteredStoriesCount } from '../../../actions/storiesActionCreators';


const storyPropTypes = {
  $$stories: PropTypes.instanceOf(Immutable.List).isRequired,
  error: PropTypes.string,
  cssTransitionGroupClassNames: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

class StoryList extends BaseComponent {
  
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchStories: PropTypes.func,
    }),
    data: PropTypes.shape({
      isFetching: PropTypes.func,
      isSaving: PropTypes.bool,
      $$stories: PropTypes.arrayOf(storyPropTypes),
      fetchStoryError: PropTypes.string, // Add fetchStoryError to data prop types
    }).isRequired,
    intl: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor() {
    super();
    console.log('********************constructor');
    _.bindAll(this, ['refreshStories']);
    this.cable = null;
  }

  subscribeChannel() {
    const { messageReceived } = this.props.actions;
    console.log('********************Subscribing to channel...');
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const cableUrl = `${protocol}${window.location.hostname}:${window.location.port}/cable`;
    this.cable = ActionCable.createConsumer(cableUrl);

    this.cable.subscriptions.create(
      { channel: 'StoriesChannel' },
      {
        connected: () => {
          console.log('********************connected');
        },
        disconnected: () => {
          console.log('********************disconnected');
        },
        received: (story) => {
          messageReceived(Immutable.fromJS(story));
        },
      },
    );
  }

  componentDidMount() {
    const { fetchStories } = this.props.actions;
    console.log('********************Component mounted, fetching stories...');
    fetchStories();
    this.subscribeChannel();
  }

  componentWillUnmount() {
    console.log('********************Component UNmounted, removing stories...');
    this.cable.subscriptions.remove({ channel: 'StoriesChannel' });
  }

  refreshStories() {
    console.log('********************refreshStories ...');
    console.log('********************refreshStories ...'+this.props.actions);
    const { fetchStories } = this.props.actions;
    fetchStories();
  }

  errorWarning() {
    const { data, cssTransitionGroupClassNames } = this.props;
    const { fetchStoryError } = data;
    console.log('********************Checking for fetch error ***** '+ fetchStoryError);

    // If there is no error, there is nothing to add to the DOM
    if (!fetchStoryError) return null;
    console.log('******************** WHYYYYY *********** ');
    const nodeRef = React.createRef(null);

    return (
      <CSSTransition
        key="storyFetchError"
        nodeRef={nodeRef}
        timeout={1500}
        classNames={cssTransitionGroupClassNames}
      >
        <div
          ref={nodeRef}
          className="bg-red-100 p-4 mb-4 border border-red-200 rounded text-red-800"
        >
          <strong>Error:</strong> {fetchStoryError}
        </div>
      </CSSTransition>
    );
  }

  render() {
    const { actions, data, intl, category } = this.props;
    const { formatMessage } = intl;
    console.log('Rendering StoryList component with data:', data.toJS());
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      exit: css.elementLeave,
      exitActive: css.elementLeaveActive,
    };
    const locale = data.get('locale') || defaultLocale;

    const $$stories = data.get('$$stories');
    const error = data.get('fetchStoryError');

    let storyNodes = null;

    let filteredStories = $$stories;
  console.log("************filteredStories BEFORE************ "+filteredStories);

  if (category) {
    console.log("************category************ "+category);
    filteredStories = $$stories.filter(story => {
      console.log("************story************ "+story);
      
      if (category === "All") {
        return true;
      }else if (category === "Trending" && story.get("category_id") === 1) {
        console.log("*Trending* "+story.get("category_id"));
        return true;
      } else if (category === "Sports" && story.get("category_id") === 2) {
        console.log("*Sports* "+story.get("category_id"));
        return true;
      } else if (category === "Entertainment" && story.get("category_id") === 3) {
        console.log("*Entertainment* "+story.get("category_id"));
        return true;
      } else {
        return false;
      }
    });
  }

  if (filteredStories) {
    const { setFilteredStoriesCount } = actions;
    setFilteredStoriesCount(filteredStories.size);
    console.log("************filteredStories AFTER************ "+filteredStories);
    storyNodes = filteredStories.map(($$story, index) => {
      console.log("************$$story************ "+$$story);
      console.log("************$$story.get('id')************ "+$$story.get('id'));
      console.log("************$$story.get('title')************ "+$$story.get('title'));
      console.log("************$$story.get('image_url')************ "+$$story.get('image_url'));
      const nodeRef = React.createRef(null);
      return (
        <CSSTransition
          key={$$story.get('id') || index}
          nodeRef={nodeRef}
          timeout={500}
          classNames={cssTransitionGroupClassNames}
        >
          <Story
            key={$$story.get('id') || index}
            title={$$story.get('title')}
            description={$$story.get('description')}
            category_id={$$story.get('category_id')}
            image_url={$$story.get('image_url')}
            ref={nodeRef}
          />
        </CSSTransition>
      );
    });
  }


    return (
      <div className="storyList prose max-w-none prose-a:text-sky-700 prose-li:my-0">
        <h2>
          {data.get('isFetching') && formatMessage(defaultMessages.loading)}
        </h2>
        <div>
          {this.errorWarning()}
          <TransitionGroup className="storyList" component="div">
            {storyNodes}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default injectIntl(StoryList);
