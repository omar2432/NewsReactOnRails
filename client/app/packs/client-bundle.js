import ReactOnRails from 'react-on-rails';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'expose-loader?exposes=$,jQuery!jquery';
import 'jquery-ujs';
import RouterApp from '../bundles/stories/startup/ClientRouterApp';
import routerStoriesStore from '../bundles/stories/store/routerStoriesStore';
import storiesStore from '../bundles/stories/store/storiesStore';
import NavigationBarApp from '../bundles/stories/startup/NavigationBarApp';
import Footer from '../bundles/stories/components/Footer/Footer';
import '../assets/styles/application';

ReactOnRails.setOptions({
  traceTurbolinks: true,
});

ReactOnRails.register({
  RouterApp,
  NavigationBarApp,
  Footer,
});

ReactOnRails.registerStore({
  routerStoriesStore,
  storiesStore,
});

