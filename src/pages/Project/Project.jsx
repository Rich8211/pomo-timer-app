import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../client';
import { AuthContext } from '../../providers/AuthProvider';
import { TaskContext } from '../../providers/TaskProvider';

const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const { user } = useContext(AuthContext);
  const { getTasksByProject, getCompletedTasksByProject } =
    useContext(TaskContext);

  const { id } = useParams();

  const getProjectData = async (id) => {
    let { data: projectData, error } = await supabase
      .from('projects')
      .eq('id', id)
      .select('project_name', 'description');
    setProjectData(projectData);
  };

  useEffect(() => {
    getTasksByProject(id);
    getCompletedTasksByProject(id);
    getProjectData(id);
  }, [id, getTasksByProject, getCompletedTasksByProject, projectData]);

  return <div>Project</div>;
};

export default Project;
