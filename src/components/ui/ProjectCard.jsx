import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-image">
        {project.image ? (
          <img src={project.image} alt={project.title} className="image-content" />
        ) : (
          <div className="image-placeholder">
            <span className="placeholder-text">{project.title} Image</span>
          </div>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-role">{project.role} | {project.period}</p>
        <p className="project-summary">{project.summary}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
