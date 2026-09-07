import React, { useState, useEffect, useRef } from 'react';
import HeroSection from './components/sections/HeroSection';
import CareerSection from './components/sections/CareerSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectList from './components/sections/ProjectList';
import Footer from './components/ui/Footer';
import GNB from './components/ui/GNB';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 5; // Hero, Career, Skills, Projects, Footer
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (document.body.classList.contains('modal-open')) return;
      const el = e.target.closest('.allow-scroll');
      if (el) {
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;
        
        // Check if the element can scroll in the requested direction
        if (isScrollingDown && Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight) {
          return; // Allow native scroll down
        }
        if (isScrollingUp && el.scrollTop > 0) {
          return; // Allow native scroll up
        }
      }
      
      e.preventDefault(); // Prevent default only if we are taking over the scroll
      if (isScrolling.current) return;
      
      if (e.deltaY > 10) {
        if (currentSection < totalSections - 1) {
          isScrolling.current = true;
          setCurrentSection(prev => prev + 1);
          setTimeout(() => { isScrolling.current = false }, 1000);
        }
      } else if (e.deltaY < -10) {
        if (currentSection > 0) {
          isScrolling.current = true;
          setCurrentSection(prev => prev - 1);
          setTimeout(() => { isScrolling.current = false }, 1000);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMoveCustom = (e) => {
      if (document.body.classList.contains('modal-open')) return;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY; // Positive = swiping UP (scrolling down)
      
      const el = e.target.closest('.allow-scroll');
      if (el) {
        const isScrollingDown = deltaY > 0;
        const isScrollingUp = deltaY < 0;
        
        if (isScrollingDown && Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight) {
          return; // Allow native scroll down
        }
        if (isScrollingUp && el.scrollTop > 0) {
          return; // Allow native scroll up
        }
      }

      e.preventDefault(); // Prevent default only if we are taking over the scroll
      if (isScrolling.current) return;

      if (deltaY > 30) {
        if (currentSection < totalSections - 1) {
          isScrolling.current = true;
          setCurrentSection(prev => prev + 1);
          setTimeout(() => { isScrolling.current = false }, 1000);
        }
      } else if (deltaY < -30) {
        if (currentSection > 0) {
          isScrolling.current = true;
          setCurrentSection(prev => prev - 1);
          setTimeout(() => { isScrolling.current = false }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMoveCustom, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMoveCustom);
    };
  }, [currentSection]);

  return (
    <div className="app-container" style={{ overflow: 'hidden', height: '100vh', width: '100vw', position: 'relative' }}>
      
      {/* Ambient Glow Background */}
      <div className="ambient-background">
        <div className="ambient-blob primary"></div>
        <div className="ambient-blob secondary"></div>
        <div className="ambient-blob tertiary"></div>
      </div>

      {/* Dynamic GNB */}
      <GNB currentSection={currentSection} onNavigate={(index) => setCurrentSection(index)} />

      <main 
        style={{ 
          transform: `translateY(${currentSection === 4 ? 'calc(-300vh - 350px)' : `-${currentSection * 100}vh`})`, 
          transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
          height: 'calc(400vh + 350px)', // total height of all sections + footer
          width: '100%'
        }}
      >
        <div style={{ height: '100vh', width: '100%' }}>
          <HeroSection />
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
          <CareerSection />
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
          <SkillsSection />
        </div>
        <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ProjectList />
        </div>
        <div style={{ height: '350px', width: '100%' }}>
          <Footer />
        </div>
      </main>

      {/* Scroll Indicator */}
      {currentSection < totalSections - 1 && (
        <div className={`scroll-indicator ${currentSection === 1 ? 'light-mode' : 'dark-mode'}`}>
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      )}
    </div>
  );
}

export default App;
