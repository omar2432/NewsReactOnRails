import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../../../../assets/styles/application.css'; // Import CSS file for styling

const Story = ({ title, description, image_url }) => {
  const [showModal, setShowModal] = useState(false);

  const handleStoryClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="story">
      <h2 onClick={handleStoryClick}>{title}</h2>
      <img src={image_url} alt="Story" onClick={handleStoryClick} />
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{title}</h2>
            <img src={image_url} alt="Story" />
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

Story.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
};

export default Story;
