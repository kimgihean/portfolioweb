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

  const aiProjects = projectsData.projects.filter(p => p.type === 'AI');
  const webProjects = projectsData.projects.filter(p => p.type === 'WEB');
  const infraProjects = projectsData.projects.filter(p => p.type === 'INFRA');

  return (
    <>
      <section className="projects-section allow-scroll" id="projects">
        <div className="projects-container">
          <h2 className="section-title">Projects</h2>
          
          <div className="projects-categories">
            {aiProjects.length > 0 && (
              <div className="project-category">
                <h3 className="category-title">AI Service</h3>
                <div className="project-grid">
                  {aiProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleCardClick(project)}
                    />
                  ))}
                </div>
              </div>
            )}

            {webProjects.length > 0 && (
              <div className="project-category">
                <h3 className="category-title">Web Service & Backend</h3>
                <div className="project-grid">
                  {webProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleCardClick(project)}
                    />
                  ))}
                </div>
              </div>
            )}

            {infraProjects.length > 0 && (
              <div className="project-category">
                <h3 className="category-title">Infrastructure & DevOps</h3>
                <div className="project-grid">
                  {infraProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleCardClick(project)}
                    />
                  ))}
                </div>
              </div>
            )}
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
