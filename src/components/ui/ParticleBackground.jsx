import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    // Number of particles for the sphere
    const numParticles = 600;

    // Generate particles scattered in a wide field/cloud (denser near center)
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      // use power to make it slightly denser in the center
      const r = Math.pow(Math.random(), 0.6) * 2.5; 
      
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      // Shallow Z depth so it's not a sphere, just a flat-ish cloud
      const z = (Math.random() - 0.5) * 0.5; 

      particles.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        theta: theta, // Store angle for clockwise rainbow color
        length: Math.random() * 0.04 + 0.01,
        weight: Math.pow(Math.random(), 2) * 4 + 0.5, // Most particles thin, some very thick
        phase: Math.random() * Math.PI * 2, // Random phase for breathing
        breathSpeed: Math.random() * 1.5 + 0.5 // Random speed for breathing
      });
    }

    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    let targetMouseOffsetX = 0;
    let targetMouseOffsetY = 0;
    
    let parallaxX = 0;
    let parallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const nx = (mouseX / window.innerWidth) * 2 - 1;
      const ny = (mouseY / window.innerHeight) * 2 - 1;
      
      // Adjust multiplier for more or less mouse influence on rotation
      targetMouseOffsetY = nx * 0.4; 
      targetMouseOffsetX = ny * 0.4; 
      
      // Target translation shift based on mouse
      targetParallaxX = nx * 50;
      targetParallaxY = ny * 50;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smoothly interpolate mouse offset (parallax tilt)
      mouseOffsetX += (targetMouseOffsetX - mouseOffsetX) * 0.05;
      mouseOffsetY += (targetMouseOffsetY - mouseOffsetY) * 0.05;

      // Only tilt slightly based on mouse, no continuous tumbling
      const currentAngleX = mouseOffsetX * 0.5;
      const currentAngleY = mouseOffsetY * 0.5;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      // Smoothly interpolate parallax translation
      parallaxX += (targetParallaxX - parallaxX) * 0.05;
      parallaxY += (targetParallaxY - parallaxY) * 0.05;

      // Floating effect
      const time = Date.now() * 0.001;
      const floatX = Math.cos(time * 0.8) * 15;
      const floatY = Math.sin(time * 1.2) * 20;

      const centerX = width / 2 + parallaxX + floatX;
      const centerY = height / 2 + parallaxY + floatY;

      // Perspective field of view
      const fov = 1000;
      // Adjust sphere size relative to screen
      const radius = Math.min(width, height) * 0.45;
      
      const nx = (mouseX / width) * 2 - 1;
      const ny = (mouseY / height) * 2 - 1;

      particles.forEach(p => {
        // Rotate around X axis
        const y1 = p.baseY * cosX - p.baseZ * sinX;
        const z1 = p.baseY * sinX + p.baseZ * cosX;
        
        // Rotate around Y axis
        const x2 = p.baseX * cosY + z1 * sinY;
        const z2 = -p.baseX * sinY + z1 * cosY;
        const y2 = y1;

        // Calculate distance to mouse for wave effect
        const mX = nx * 2.0; // scale mouse to cover the wider cloud
        const mY = ny * 2.0;
        const dx = x2 - mX;
        const dy = y2 - mY;
        const dz = z2 - 0.2; // Mouse slightly in front of the flat cloud
        
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        let mouseBulge = 0;
        if (dist < 1.5) {
           // Create a ripple (up and down) that fades out
           mouseBulge = Math.cos(dist * Math.PI) * 0.15;
           mouseBulge *= (1.5 - dist) / 1.5; 
        }

        // Natural self-undulation
        const wave = Math.sin(p.baseX * 5 + time * 2) * Math.sin(p.baseY * 5 + time * 2) * 0.05;
        
        // Total displacement applied to the base coordinates
        const dMult = 1 + wave + mouseBulge;

        // Scale by radius and apply displacement
        const innerX = x2 * radius * dMult;
        const innerY = y2 * radius * dMult;
        // Apply extra Z pop out for the mouse bulge so it looks like a 3D wave
        const innerZ = (z2 + mouseBulge * 2.0) * radius * dMult;

        // The outer point of the dash
        const outerX = x2 * radius * (dMult + p.length);
        const outerY = y2 * radius * (dMult + p.length);
        const outerZ = (z2 + mouseBulge * 2.0) * radius * (dMult + p.length);

        // Project to 2D
        const scaleInner = fov / (fov + innerZ);
        const scaleOuter = fov / (fov + outerZ);

        const pxInner = innerX * scaleInner + centerX;
        const pyInner = innerY * scaleInner + centerY;

        const pxOuter = outerX * scaleOuter + centerX;
        const pyOuter = outerY * scaleOuter + centerY;

        // Draw only if in front of camera
        if (innerZ > -fov) {
          // Fade opacity based on Z depth
          const opacity = Math.max(0.1, Math.min(0.9, (innerZ + radius) / (radius * 2)));
          
          // Calculate dynamic rainbow color
          // Map theta to 0-360 hue, and slowly rotate it over time
          let hue = (p.theta * 180 / Math.PI) - (time * 45);
          hue = (hue % 360 + 360) % 360; // ensure positive hue
          
          ctx.beginPath();
          ctx.moveTo(pxInner, pyInner);
          ctx.lineTo(pxOuter, pyOuter);
          
          ctx.strokeStyle = `hsl(${hue}, 85%, 55%)`;
          ctx.globalAlpha = opacity;
          
          // Breathing effect for thickness (oscillates between 0.4 and 1.6)
          const breath = 1 + Math.sin(time * p.breathSpeed + p.phase) * 0.6;
          
          // Vary line width by scale, perspective, individual weight, and breathing
          ctx.lineWidth = Math.max(0.2, 1.5 * scaleInner * p.weight * breath);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleBackground;
