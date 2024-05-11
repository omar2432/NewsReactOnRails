// Example of React + Redux
import ReactOnRails from 'react-on-rails';
import RouterApp from './ServerRouterApp';
import NavigationBarApp from './NavigationBarApp';
import routerStoriesStore from '../store/routerStoriesStore';
import storiesStore from '../store/storiesStore';
import Footer from '../components/Footer/Footer';

ReactOnRails.register({
  RouterApp,
  NavigationBarApp,
  Footer,
});

ReactOnRails.registerStore({
    routerStoriesStore,
    storiesStore
});

