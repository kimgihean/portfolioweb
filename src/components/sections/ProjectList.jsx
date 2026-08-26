import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import ProjectCard from '../ui/ProjectCard';
import projectsData from '../../data/projects.json';
import './ProjectList.css';

const MarqueeText = ({ direction = 'left' }) => {
  const textContent = "BACKEND ENGINEER &bull; AI ARCHITECT &bull; NODE.JS &bull; RAG PIPELINE &bull; DISTRIBUTED SYSTEMS &bull; ";
  return (
    <div className={`marquee-container ${direction}`}>
      <div className="marquee-content" dangerouslySetInnerHTML={{ __html: textContent.repeat(6) }}></div>
    </div>
  );
};

const ProjectList = () => {

  return (
    <section className="projects-section" id="projects">
      {/* <MarqueeText direction="left" /> */}
      <div className="projects-container">
        <Swiper
          modules={[Pagination, EffectCoverflow, A11y]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: -50,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          className="projects-swiper"
        >
          {projectsData.projects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <MarqueeText direction="right" /> */}
    </section>
  );
};

export default ProjectList;
