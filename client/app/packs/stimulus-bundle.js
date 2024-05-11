import ReactOnRails from 'react-on-rails';
import 'jquery-ujs';
import { Turbo } from '@hotwired/turbo-rails';

// eslint-disable-next-line no-unused-vars
import controllers from '../controllers';

import NavigationBarApp from '../bundles/stories/startup/NavigationBarApp';
import Footer from '../bundles/stories/components/Footer/Footer';

import '../assets/styles/application';

Turbo.session.drive = false;

ReactOnRails.setOptions({
  traceTurbolinks: true,
});

ReactOnRails.register({
  NavigationBarApp,
  Footer,
});
