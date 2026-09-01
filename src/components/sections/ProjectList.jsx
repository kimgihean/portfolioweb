import React, { useState } from 'react';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import projectsData from '../../data/projects.json';
import './ProjectList.css';

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section className="projects-section allow-scroll" id="projects">
        <div className="projects-container">
          <h2 className="section-title">Projects</h2>
          <div className="bento-grid">
            {projectsData.projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleCardClick(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Render the modal outside the main layout flow but inside this component */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ProjectList;
