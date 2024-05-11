import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import RouterStoriesContainer from '../containers/RouterStoriesContainer.jsx';
import NavigationBarContainer from '../containers/NavigationBarContainer.jsx';

export default (
  <Layout>
    <NavigationBarContainer />
    <Routes>
      <Route path="/" element={<RouterStoriesContainer category="All" />} />
      <Route path="/trending" element={<RouterStoriesContainer category="Trending" />} />
      <Route path="/sports" element={<RouterStoriesContainer category="Sports" />} />
      <Route path="/entertainment" element={<RouterStoriesContainer category="Entertainment" />} />
    </Routes>
    
  </Layout>
);
