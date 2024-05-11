import React from 'react';
import PropTypes from 'prop-types';

const href =
  'https://github.com/shakacode/react_on_rails/blob/master/README.md#multiple-react-' +
  'components-on-a-page-with-one-store';
function StoriesCount(props) {
  const { storiesCount } = props;
  return (
    <li className="border-t border-gray-300 lg:border-t-0 lg:border-l">
      <a id="js-story-count" href={href} className="px-2 py-4 inline-block">
        Stories: {storiesCount}
      </a>
    </li>
  );
}

StoriesCount.propTypes = {
    storiesCount : PropTypes.number.isRequired,
};

export default StoriesCount;
