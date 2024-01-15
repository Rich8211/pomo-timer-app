import React from 'react';
import './TasksBanner.css';

const TasksBanner = ({ children }) => {
  return <ul className="task-banner">{children}</ul>;
};

export default TasksBanner;
