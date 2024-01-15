import React, { useContext, useState } from 'react';
import './TasksModal.css';
import { TaskContext } from '../../providers/TaskProvider';
import { AuthContext } from '../../providers/AuthProvider';

const TasksModal = ({ handleClose }) => {
  const { user } = useContext(AuthContext);

  const { addTask } = useContext(TaskContext);

  const POMO_VALUES = [1, 2, 3, 4, 5];

  const [taskName, setTaskName] = useState('');
  const [project, setProject] = useState('');
  const [pomodoros, setPomodoros] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(user.id, taskName, project, pomodoros);
    handleClose();
  };

  return (
    <div className="modal">
      <button onClick={handleClose} className="close">
        &times;
      </button>

      <form className="pomo-form" onSubmit={handleSubmit}>
        <h2>Add A Task</h2>
        <div>
          <label htmlFor="task-name">Task Name</label>
          <input
            className="task-modal-input"
            id="task-name"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="project">Project</label>
          <input
            className="task-modal-input"
            id="project"
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pomodoros">Pomodoros</label>
          <select
            className="select-pomos"
            id="pomodoros"
            value={pomodoros}
            onChange={(e) => setPomodoros(e.target.value)}
          >
            {POMO_VALUES.map((num, i) => (
              <option key={i} value={num}>
                {' '}
                {num}
              </option>
            ))}
          </select>
        </div>
        <button className="modal-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TasksModal;
