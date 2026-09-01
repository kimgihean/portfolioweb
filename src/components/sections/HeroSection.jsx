import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroSection.css';

const TypewriterText = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span key={index} className="char" style={{ opacity: 0 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Collect all .char spans in order
      const allChars = [];
      textRefs.current.forEach(ref => {
        if (ref) {
          allChars.push(...ref.querySelectorAll('.char'));
        }
      });

      // Show terminal window first
      tl.to('.terminal-window', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      // Typewriter animation
      .to(allChars, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.05, // speed of typing
        ease: "none"
      })
      // Show logs and buttons
      .to(heroRef.current.querySelectorAll('.hero-title, .terminal-log, .active-prompt, .terminal-buttons'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "+=0.2");
    }, heroRef);

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">gihyun@portfolio:~</div>
        </div>
        
        <div className="terminal-body">
          <div className="terminal-prompt-line">
            <span className="prompt-user">gihyun@server</span>
            <span className="prompt-colon">:</span>
            <span className="prompt-dir">~/portfolio</span>
            <span className="prompt-symbol">$</span>
            <span className="prompt-command">
              <span ref={addToRefs} className="line-text">
                <TypewriterText text="./start_backend.sh" />
              </span>
            </span>
          </div>
          
          <div className="terminal-output">
            <h1 className="hero-title">
              <span className="title-highlight">Architecting Intelligent</span> <br />
              Backends
            </h1>
            
            <div className="terminal-log">
              <span className="log-info">[INFO]</span> Initializing Spring Framework...
            </div>
            <div className="terminal-log">
              <span className="log-info">[INFO]</span> Connecting to Node.js backend...
            </div>
            <div className="terminal-log">
              <span className="log-success">[SUCCESS]</span> AI Server Engineer loaded.
            </div>
            <div className="terminal-log log-highlight">
              {">"} 빠른 PoC 를 통한 실행 가능성 검증과 실제 운영 경험으로 비즈니스 문제를 해결합니다.
            </div>
            
            <div className="terminal-prompt-line active-prompt">
              <span className="prompt-user">gihyun@server</span>
              <span className="prompt-colon">:</span>
              <span className="prompt-dir">~/portfolio</span>
              <span className="prompt-symbol">$</span>
              <span className="cursor-blink">_</span>
            </div>
          </div>
          
          <div className="terminal-buttons">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hero-btn neon-blue">
              Notion Resume
            </a>
            <a href="https://github.com/kimgihean" target="_blank" rel="noopener noreferrer" className="hero-btn neon-green">
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
