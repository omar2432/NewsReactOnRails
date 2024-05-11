// Example of React + Redux
import ReactOnRails from 'react-on-rails';
import RouterApp from '../bundles/stories/startup/ServerRouterApp';
import NavigationBarApp from '../bundles/stories/startup/NavigationBarApp';
import routerStoriesStore from '../bundles/stories/store/routerStoriesStore';
import storiesStore from '../bundles/stories/store/storiesStore';
import Footer from '../bundles/stories/components/Footer/Footer';

ReactOnRails.register({
  RouterApp,
  NavigationBarApp,
  Footer,
});

ReactOnRails.registerStore({
  routerStoriesStore,
  storiesStore,
});
