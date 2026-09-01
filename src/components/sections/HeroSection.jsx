import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroSection.css';
import ParticleBackground from '../ui/ParticleBackground';

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
      const tl = gsap.timeline({ delay: 0.2 });

      // Collect all .char spans in order
      const allChars = [];
      textRefs.current.forEach(ref => {
        if (ref) {
          allChars.push(...ref.querySelectorAll('.char'));
        }
      });

      // Typewriter animation: pop in characters one by one
      tl.to(allChars, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.04, // speed of typing
        ease: "none"
      }).to(heroRef.current.querySelectorAll('.hero-subtitle, .hero-buttons'), {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.2");
    }, heroRef);

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <ParticleBackground />
      <div className="hero-content">
        <h1 className="hero-title">
          <div className="line-wrapper">
            <span ref={addToRefs} className="line-text"><TypewriterText text="Architecting Intelligent" /></span>
          </div>
          <div className="line-wrapper">
            <span ref={addToRefs} className="line-text"><TypewriterText text="Backends" /></span>
          </div>
        </h1>
        <p className="hero-subtitle">
          Spring Framework &nbsp;&nbsp;|&nbsp;&nbsp; Node.js &nbsp;&nbsp;|&nbsp;&nbsp; AI Server Engineer. <br />빠른 PoC 를 통한 실행 가능성 검증과 실제 운영 경험으로 비즈니스 문제를 해결합니다.
        </p>
        <div className="hero-buttons">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hero-btn notion-btn">
            Notion Resume
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hero-btn google-btn">
            Google Docs
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
