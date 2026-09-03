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

          <div className="modal-title-area">
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-role">{project.role} | {project.period}</p>
            <p className="modal-summary">{project.summary}</p>
            
            <div className="modal-links" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {project.websiteLink && (
                <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  🌐 Visit Website
                </a>
              )}
              {project.notionLink && (
                <a href={project.notionLink} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  📝 View Notion
                </a>
              )}
            </div>

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
              <p className="modal-text" dangerouslySetInnerHTML={{ __html: project.problem }} />
            </div>
          )}

          {project.keyTasks && project.keyTasks.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">주요 업무</h3>
              <ul className="modal-list">
                {project.keyTasks.map((task, idx) => (
                  <li key={idx} className="modal-list-item" dangerouslySetInnerHTML={{ __html: task }} />
                ))}
              </ul>
            </div>
          )}

          {project.keyTechs && project.keyTechs.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">주요 기술</h3>
              <ul className="modal-list">
                {project.keyTechs.map((tech, idx) => (
                  <li key={idx} className="modal-list-item" dangerouslySetInnerHTML={{ __html: tech }} />
                ))}
              </ul>
            </div>
          )}
          
          {project.solution && project.solution.architecture && project.solution.architecture !== "..." && (
            <div className="modal-section">
              <h3 className="modal-section-title">Solution & Architecture</h3>
              <p className="modal-text" dangerouslySetInnerHTML={{ __html: project.solution.architecture }} />
              {project.solution.implementation && project.solution.implementation !== "..." && (
                <p className="modal-text" style={{ marginTop: '0.5rem' }} dangerouslySetInnerHTML={{ __html: project.solution.implementation }} />
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
