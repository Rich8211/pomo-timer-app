import { supabase } from '../client';
import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user?.id) {
      getTasks(user.id);
      getProjects(user.id);
    }
  }, [user]);

  const getTasks = async (user_id) => {
    let { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user_id);
    if (tasks) setTasks(tasks.reverse());
  };

  const getProjects = async (user_id) => {
    let { data: projects, error } = await supabase.from('projects').select('*');
    if (projects.length > 0) setProjects(projects);
  };

  const addTask = async (user_id, name, project, pomodoros) => {
    let project_id;

    if (project) {
      let { data: existingProject, error: existingProjectErr } = await supabase
        .from('projects')
        .select('id')
        .eq('project_name', project);

      if (existingProject[0]) {
        project_id = existingProject[0].id;
      } else {
        const newProjectObj = {
          user_id,
          project_name: project,
        };

        const { data: newProject, error: newProjectErr } = await supabase
          .from('projects')
          .insert([newProjectObj])
          .select('id');
        project_id = newProject[0].id;
      }
    }

    const newTask = {
      user_id,
      name,
      project_id,
      pomodoros_assigned: pomodoros,
      is_complete: false,
      pomodoros_consumed: 0,
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select();

    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    const tempTasks = [...tasks];
    setTasks(tempTasks.filter((task) => task.id !== id));
  };

  const completeTask = (id, pomodorosConsumed) => {
    const editedTasks = tasks.map((task) => {
      if (task.id === id)
        return { ...task, completed: !task.completed, pomodorosConsumed };
      return task;
    });
    setTasks(editedTasks);
    deleteTask(id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        projects,
        addTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
