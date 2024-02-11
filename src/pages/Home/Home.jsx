import React, { useContext, useState } from 'react';
import SelectMode from '../../components/SelectMode/SelectMode';
import Timer from '../../components/Timer/Timer';
import NavBar from '../../components/NavBar/NavBar';
import TasksModal from '../../components/TasksModal/TasksModal';
import { TaskContext } from '../../providers/TaskProvider';
import TasksBanner from '../../components/TasksBanner/TasksBanner';
import Task from '../../components/Task/Task';
import './Home.css';

const Home = () => {
  const [taskModalActive, setTaskModalActive] = useState(false);

  const setModalActive = () => {
    setTaskModalActive(true);
  };

  const setModalInactive = () => {
    setTaskModalActive(false);
  };

  const { tasks, selectTask } = useContext(TaskContext);

  return (
    <main className="home-main">
      <NavBar handleModalOpen={setModalActive} />
      {taskModalActive && <TasksModal handleClose={setModalInactive} />}
      <div className="container">
        <div className="container-left">
          <div className="container-left-inner">
            <SelectMode />
            <Timer />
          </div>
        </div>
        <div className="container-right">
          {tasks.length > 0 && (
            <TasksBanner>
              {tasks.map((task) => (
                <Task
                  onClick={() => selectTask(task.id)}
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  pomodoros={task.pomodoros_assigned}
                  isSelected={task.isSelected}
                />
              ))}
            </TasksBanner>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
