import React from 'react';
import './SkillsSection.css';

const SkillsSection = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <h2 className="section-title">Architecture & Skills</h2>
        <p className="section-subtitle">A high-level view of my technical ecosystem</p>
      </div>
      
      <div className="architecture-container allow-scroll">
        
        {/* Client & Frontend */}
        <div className="arch-group client-group">
          <div className="aws-group-header">
            <div className="aws-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <span className="aws-group-title">Client / Frontend</span>
          </div>
          
          <div className="arch-nodes">
            <div className="node">Bootstrap</div>
            <div className="node">jQuery</div>
            <div className="node">AJAX</div>
            <div className="node">Javascript</div>
          </div>
          <div className="aws-group-header mt-inner">
            <span className="aws-group-title">Template Engines</span>
          </div>
          <div className="arch-nodes">
            <div className="node">JSP</div>
            <div className="node">Freemarker</div>
            <div className="node">Thymeleaf</div>
            <div className="node">EJS</div>
          </div>
        </div>

        {/* Edge / Proxy */}
        <div className="arch-group edge-group">
          <div className="aws-group-header">
            <div className="aws-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path></svg>
            </div>
            <span className="aws-group-title">Edge & Proxy</span>
          </div>
          <div className="arch-nodes">
            <div className="node highlight">Cloudfront</div>
            <div className="node highlight">Nginx</div>
          </div>
        </div>

        {/* Application Servers */}
        <div className="arch-group app-group">
          <div className="aws-group-header">
            <div className="aws-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
            </div>
            <span className="aws-group-title">Application Servers</span>
          </div>
          <div className="arch-nodes">
            <div className="node primary">Spring Boot</div>
            <div className="node primary">Node.js</div>
            <div className="node">Tomcat</div>
            <div className="node">PM2</div>
            <div className="node">Docker</div>
          </div>
          <div className="aws-group-header mt-inner">
            <span className="aws-group-title">Backend Ecosystem</span>
          </div>
          <div className="arch-nodes">
            <div className="node">Java</div>
            <div className="node">TypeScript</div>
            <div className="node">TSOA</div>
            <div className="node">JPA</div>
            <div className="node">QueryDSL</div>
          </div>
        </div>

        {/* Database */}
        <div className="arch-group db-group">
          <div className="aws-group-header">
            <div className="aws-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </div>
            <span className="aws-group-title">Databases & Cache</span>
          </div>
          <div className="arch-nodes">
            <div className="node db">MySQL</div>
            <div className="node db">MSSQL</div>
            <div className="node cache">Redis</div>
          </div>
        </div>

        {/* CI/CD */}
        <div className="arch-group cicd-group">
          <div className="aws-group-header">
            <div className="aws-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <span className="aws-group-title">CI / CD</span>
          </div>
          <div className="arch-nodes">
            <div className="node tools">Jenkins Pipeline</div>
            <div className="node tools">GitHub</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
