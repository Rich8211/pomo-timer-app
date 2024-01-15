import React from 'react';
import { motion } from 'framer-motion';
import './Task.css';

const Task = ({ name, pomodoros }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <li className="task-container">
        <div className="task-body">
          <div className="task-body-name">{name}</div>
          <div className="task-body-pomos">Pomodoros: {pomodoros}</div>
        </div>
      </li>
    </motion.div>
  );
};

export default Task;
