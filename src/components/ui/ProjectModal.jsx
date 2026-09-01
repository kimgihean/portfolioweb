import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger CSS transition
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    // Prevent background scrolling and fullpage navigation
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for transition before unmounting
    setTimeout(onClose, 300);
  };

  if (!project) return null;

  const modalContent = (
    <div className={`modal-backdrop ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`modal-content allow-scroll ${isVisible ? 'visible' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="modal-header">
          {project.image && (
            <div className="modal-image-wrapper">
              <img src={project.image} alt={project.title} className="modal-image" />
            </div>
          )}
          <div className="modal-title-area">
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-role">{project.role} | {project.period}</p>
            <p className="modal-summary">{project.summary}</p>
            
            {project.hashTag && project.hashTag.length > 0 && (
              <div className="modal-hashtags">
                {project.hashTag.map(tag => (
                  <span key={tag} className="modal-hashtag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-body">
          {project.techStack && project.techStack.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Tech Stack</h3>
              <div className="modal-tech-stack">
                {project.techStack.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          )}
          
          {project.problem && project.problem !== "..." && (
            <div className="modal-section">
              <h3 className="modal-section-title">Problem</h3>
              <p className="modal-text">{project.problem}</p>
            </div>
          )}
          
          {project.solution && project.solution.architecture && project.solution.architecture !== "..." && (
            <div className="modal-section">
              <h3 className="modal-section-title">Solution & Architecture</h3>
              <p className="modal-text">{project.solution.architecture}</p>
              {project.solution.implementation && project.solution.implementation !== "..." && (
                <p className="modal-text" style={{ marginTop: '0.5rem' }}>
                  {project.solution.implementation}
                </p>
              )}
            </div>
          )}
          
          {project.impact && project.impact.length > 0 && project.impact[0] !== "..." && (
            <div className="modal-section">
              <h3 className="modal-section-title">Impact</h3>
              <ul className="modal-list">
                {project.impact.map((item, idx) => (
                  <li key={idx} className="modal-list-item">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render to document.body to escape the transform stacking context of the main app container
  return createPortal(modalContent, document.body);
};

export default ProjectModal;
