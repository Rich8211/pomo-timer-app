import React from 'react';
import './TasksBanner.css';

const TasksBanner = ({ children }) => {
  return <div className="task-banner">{children}</div>;
};

export default TasksBanner;
