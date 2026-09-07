import React, { useState } from 'react';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import ProjectDashboard from './ProjectDashboard';
import projectsData from '../../data/projects.json';
import './ProjectList.css';

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({
    AI: false,
    WEB: false,
    INFRA: false
  });

  const toggleCategory = (type) => {
    setExpandedCategories(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

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
          
          <ProjectDashboard />

          <div className="projects-categories">
            {aiProjects.length > 0 && (
              <div className="project-category">
                <h3 className="category-title">AI Service</h3>
                <div className="project-grid">
                  {(expandedCategories.AI ? aiProjects : aiProjects.slice(0, 2)).map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleCardClick(project)}
                    />
                  ))}
                </div>
                {aiProjects.length > 2 && (
                  <button 
                    className={`load-more-btn ${expandedCategories.AI ? 'expanded' : ''}`} 
                    onClick={() => toggleCategory('AI')}
                  >
                    <span>{expandedCategories.AI ? '접기' : '더보기'}</span>
                    <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {webProjects.length > 0 && (
              <div className="project-category">
                <h3 className="category-title">Web Service & Backend</h3>
                <div className="project-grid">
                  {(expandedCategories.WEB ? webProjects : webProjects.slice(0, 2)).map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleCardClick(project)}
                    />
                  ))}
                </div>
                {webProjects.length > 2 && (
                  <button 
                    className={`load-more-btn ${expandedCategories.WEB ? 'expanded' : ''}`} 
                    onClick={() => toggleCategory('WEB')}
                  >
                    <span>{expandedCategories.WEB ? '접기' : '더보기'}</span>
                    <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {infraProjects.length > 0 && (
              <div className="project-category">
                <h3 className="category-title">Infrastructure & DevOps</h3>
                <div className="project-grid">
                  {(expandedCategories.INFRA ? infraProjects : infraProjects.slice(0, 2)).map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleCardClick(project)}
                    />
                  ))}
                </div>
                {infraProjects.length > 2 && (
                  <button 
                    className={`load-more-btn ${expandedCategories.INFRA ? 'expanded' : ''}`} 
                    onClick={() => toggleCategory('INFRA')}
                  >
                    <span>{expandedCategories.INFRA ? '접기' : '더보기'}</span>
                    <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
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
