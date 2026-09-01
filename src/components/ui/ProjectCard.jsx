import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-role">{project.role} | {project.period}</p>
        <p className="project-summary">{project.summary}</p>
        {project.hashTag && project.hashTag.length > 0 && (
          <div className="project-hashtags">
            {project.hashTag.slice(0, 4).map(tag => (
              <span key={tag} className="hashtag">#{tag}</span>
            ))}
            {project.hashTag.length > 4 && (
              <span className="hashtag-more">+{project.hashTag.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
