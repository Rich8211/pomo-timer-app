import React, { useContext, useState, useEffect } from 'react';
import SelectMode from '../../components/SelectMode/SelectMode';
import Timer from '../../components/Timer/Timer';
import NavBar from '../../components/NavBar/NavBar';
import TasksModal from '../../components/TasksModal/TasksModal';
import { TaskContext } from '../../providers/TaskProvider';
import TasksBanner from '../../components/TasksBanner/TasksBanner';
import Task from '../../components/Task/Task';
import './Home.css';
import { useAnimate, stagger, motion } from 'framer-motion';

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

const Home = () => {
  const { tasks } = useContext(TaskContext);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (tasks.length > 0) {
      animate(
        'ul',
        {
          clipPath: 'inset(0% 0% 0% 0% round 10px)',
        },
        {
          type: 'spring',
          bounce: 0,
          duration: 0.5,
        }
      );

      animate(
        'li',
        { opacity: 1, scale: 1, filter: 'blur(0px)' },

        {
          duration: 0.2,
          delay: staggerMenuItems,
        }
      );
    }
  }, [animate, tasks]);

  return (
    <main className="home-main">
      <div className="container">
        <div className="container-left">
          <div className="container-left-inner">
            <SelectMode />
            <Timer />
          </div>
        </div>
        <div className="container-right">
          {tasks.length > 0 && (
            // <TasksBanner>
            <ul ref={scope}>
              {tasks.map((task) => (
                <Task name={task.name} pomodoros={task.pomodoros_assigned} />
              ))}
            </ul>

            // </TasksBanner>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
