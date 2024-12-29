import React from 'react';
import PropTypes from 'prop-types';
import { Video } from './components';

const Stories = ({ course }) => {

  return (
    <>
      <Video video={course.video}/>
    </>
  );
};

Stories.propTypes = {
  course: PropTypes.any
};

export default Stories;
