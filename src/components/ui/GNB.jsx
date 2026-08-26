import React from 'react';
import './GNB.css';

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ResumeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h20v14H2z" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const SkillsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const GNB = ({ currentSection, onNavigate }) => {
  const isDarkBg = currentSection === 1 || currentSection === 2; // Career and Skills are dark

  const navItems = [
    { name: 'HOME', icon: <HomeIcon />, index: 0 },
    { name: 'RESUME', icon: <ResumeIcon />, index: 1 },
    { name: 'SKILLS', icon: <SkillsIcon />, index: 2 },
    { name: 'PROJECTS', icon: <ProjectsIcon />, index: 3 },
  ];

  return (
    <nav className={`gnb gnb-side ${isDarkBg ? 'on-dark-bg' : 'on-light-bg'}`}>
      <ul className="gnb-menu">
        {navItems.map((item) => (
          <li 
            key={item.name} 
            className={`gnb-item ${currentSection === item.index ? 'active' : ''}`}
            onClick={() => onNavigate(item.index)}
          >
            <span className="gnb-icon">{item.icon}</span>
            <span className="gnb-tooltip">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GNB;
