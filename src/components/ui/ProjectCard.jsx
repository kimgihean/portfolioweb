import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card allow-scroll">
      <div className="project-image">
        {/* Placeholder if image not found */}
        <div className="image-placeholder">
          <span className="placeholder-text">{project.title} Image</span>
        </div>
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-role">{project.role} | {project.period}</p>
        <p className="project-summary">{project.summary}</p>
        
        <div className="project-details">
          <div className="detail-section">
            <h4 className="detail-heading">Problem</h4>
            <p className="detail-text">{project.problem}</p>
          </div>
          <div className="detail-section">
            <h4 className="detail-heading">Solution & Architecture</h4>
            <p className="detail-text">{project.solution.architecture}</p>
          </div>
          <div className="detail-section impact">
            <h4 className="detail-heading">Impact</h4>
            <ul className="impact-list">
              {project.impact.map((item, idx) => (
                <li key={idx} className="impact-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tech-stack">
          {project.techStack.map(tech => (
            <span key={tech} className="skill-badge">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
