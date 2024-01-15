import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../client';
import { AuthContext } from '../../providers/AuthProvider';

const Project = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const getTasksByProject = async (project_id) => {
    let { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', project_id);
    console.log(tasks);
  };

  useEffect(() => {
    getTasksByProject(id);
  }, [id]);

  return <div>Project</div>;
};

export default Project;
