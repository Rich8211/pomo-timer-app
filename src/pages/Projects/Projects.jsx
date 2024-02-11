import React, { useContext } from 'react';
import { TaskContext } from '../../providers/TaskProvider';
import Card from '../../components/Card/Card';

import './Projects.css';

const Projects = () => {
  const { projects } = useContext(TaskContext);

  if (projects.length === 0) {
    return (
      <h1>
        You currently have no projects. Projects are created by adding tasks.
      </h1>
    );
  }
  return (
    <div className="projects-container">
      {projects.map((project) => (
        <Card key={project.id} title={project.project_name} id={project.id} />
      ))}
    </div>
  );
};

export default Projects;
