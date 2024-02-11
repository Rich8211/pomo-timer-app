import { supabase } from '../client';
import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectDescription, setProjectDescription] = useState('');

  useEffect(() => {
    if (user?.id) {
      getTasks(user.id);
      getProjects(user.id);
    } else setTasks([]);
  }, [user]);

  const getTasks = async (user_id) => {
    let { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user_id);
    if (tasks) setTasks(tasks.reverse());
  };

  const getProjects = async (user_id) => {
    let { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user_id);
    if (projects.length > 0) setProjects(projects);
  };

  const getTasksByProject = async (project_id) => {
    let { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', project_id);
    return tasks;
  };
  const getCompletedTasksByProject = async (project_id) => {
    let { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', project_id)
      .eq('is_completed', 'TRUE');
    return tasks;
  };

  const editDescription = async (user_id, project_id, description) => {
    const { data, error } = await supabase
      .from('projects')
      .eq('user_id', user_id)
      .eq('project_id', project_id)
      .update({ description: description })
      .select();
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
      is_selected: false,
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select();

    // setTasks([newTask, ...tasks]);
    getTasks(user_id);
  };

  const selectTask = (id) => {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) return { ...task, is_selected: !task.is_selected };
      return { ...task, is_selected: false };
    });
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
        selectTask,
        completeTask,
        getTasksByProject,
        getCompletedTasksByProject,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
